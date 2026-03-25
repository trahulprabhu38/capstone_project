"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Tesseract from "tesseract.js";
import {
  Loader2,
  FileCheck,
  CheckCircle2,
  AlertTriangle,
  User,
  Hash,
  Calendar,
  Clock,
  Building2,
  ScanLine,
  Eye,
  CreditCard,
  Info,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

interface DocumentDetailsData {
  nameOnDocument: string;
  documentNumber: string;
  dateOfBirth: string;
  expiryDate: string;
  issuingAuthority: string;
}

interface DocDetailsStepProps {
  idFrontFile: File | null;
  idBackFile: File | null;
  data: DocumentDetailsData;
  onChange: (data: DocumentDetailsData) => void;
  onNext: () => void;
  onBack: () => void;
}

/* ─── MRZ Parser ─── */

function parseMrz(text: string): Partial<DocumentDetailsData> | null {
  const lines = text
    .replace(/[^A-Z0-9<\n]/gi, (ch) => (ch === "\n" ? "\n" : "<"))
    .split("\n")
    .map((l) => l.trim())
    .filter((l) => l.length >= 30 && /^[A-Z0-9<]+$/.test(l));

  if (lines.length < 2) return null;

  const line1 = lines[lines.length - 2];
  const line2 = lines[lines.length - 1];

  if (!line1 || !line2) return null;

  const result: Partial<DocumentDetailsData> = {};

  // Line 1: P<ISSUING<SURNAME<<GIVEN<NAMES
  const nameMatch = line1.match(/^P[A-Z<]([A-Z]{3})([A-Z]+)<<([A-Z<]+)/);
  if (nameMatch) {
    const surname = nameMatch[2].replace(/<+/g, " ").trim();
    const given = nameMatch[3].replace(/<+/g, " ").trim();
    result.nameOnDocument = `${given} ${surname}`.trim();

    const countryCode = nameMatch[1];
    const countryMap: Record<string, string> = {
      IND: "Republic of India",
      USA: "United States of America",
      GBR: "United Kingdom",
      CAN: "Canada",
      AUS: "Australia",
      DEU: "Germany",
      FRA: "France",
      JPN: "Japan",
      KOR: "South Korea",
      BRA: "Brazil",
      SGP: "Singapore",
      ARE: "United Arab Emirates",
      NLD: "Netherlands",
      CHE: "Switzerland",
      SWE: "Sweden",
    };
    result.issuingAuthority = countryMap[countryCode] || countryCode;
  }

  // Line 2: PASSPORT_NO<CHECK ... DOB(YYMMDD) CHECK SEX EXPIRY(YYMMDD) ...
  const docMatch = line2.match(/^([A-Z0-9]{6,9})/);
  if (docMatch) {
    result.documentNumber = docMatch[1].replace(/<+$/, "");
  }

  const mrzDobMatch = line2.match(
    /[A-Z]{3}(\d{2})(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01])\d[MF<]/
  );
  if (mrzDobMatch) {
    const [, yy, mm, dd] = mrzDobMatch;
    const yearNum = parseInt(yy, 10);
    const year = yearNum > 50 ? `19${yy}` : `20${yy}`;
    result.dateOfBirth = `${dd}/${mm}/${year}`;
  }

  const mrzExpMatch = line2.match(
    /[MF<](\d{2})(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01])\d/
  );
  if (mrzExpMatch) {
    const [, yy, mm, dd] = mrzExpMatch;
    const year = `20${yy}`;
    result.expiryDate = `${dd}/${mm}/${year}`;
  }

  return Object.keys(result).length > 0 ? result : null;
}

/* ─── Date Helpers ─── */

function findAllDates(text: string): string[] {
  const dateRegex = /\b(\d{1,2})[\/\-\.](\d{1,2})[\/\-\.](\d{4})\b/g;
  const dates: string[] = [];
  let m;
  while ((m = dateRegex.exec(text)) !== null) {
    dates.push(m[0]);
  }
  return dates;
}

function normalizeDateDDMMYYYY(raw: string): string {
  const m = raw.match(/(\d{1,2})[\/\-\.](\d{1,2})[\/\-\.](\d{4})/);
  if (m) return `${m[1].padStart(2, "0")}/${m[2].padStart(2, "0")}/${m[3]}`;
  return raw;
}

/* ─── Text-based Parser (fallback) ─── */

function parseFromText(text: string): Partial<DocumentDetailsData> {
  const result: Partial<DocumentDetailsData> = {};
  const lines = text.split("\n");
  const fullText = lines.join(" ");

  // Name: look for Surname + Given Name fields
  const surnameMatch = fullText.match(
    /(?:surname|sur\s*name|fu\s*\/?\s*sur\s*name)[^a-zA-Z]*?([A-Z][A-Za-z\s.'-]{1,40})/i
  );
  const givenMatch = fullText.match(
    /(?:given\s*name|first\s*name|given\s*name\s*\(?s?\)?)[^a-zA-Z]*?([A-Z][A-Za-z\s.'-]{1,50})/i
  );

  if (surnameMatch || givenMatch) {
    const surname = surnameMatch?.[1]?.trim() || "";
    const given = givenMatch?.[1]?.trim() || "";
    result.nameOnDocument = `${given} ${surname}`.trim();
  } else {
    const nameMatch = fullText.match(
      /(?:name|naam)[^a-zA-Z]*?[:\s]+([A-Z][A-Za-z\s.'-]{2,50})/i
    );
    if (nameMatch) result.nameOnDocument = nameMatch[1].trim();
  }

  // Document number
  const docPatterns = [
    /(?:passport\s*no|id\s*no|card\s*no|document\s*no|dl\s*no|license\s*no|number)[.:\s]*([A-Z0-9]{4,20})/i,
    /(?:aadhaar|aadhar|uid)[^a-zA-Z]*?(\d{4}\s?\d{4}\s?\d{4})/i,
  ];
  for (const pat of docPatterns) {
    const m = fullText.match(pat);
    if (m?.[1]) {
      result.documentNumber = m[1].trim();
      break;
    }
  }
  if (!result.documentNumber) {
    const alphaNum = fullText.match(/\b([A-Z]{1,2}\d{6,9})\b/);
    if (alphaNum) result.documentNumber = alphaNum[1];
  }

  // Dates: look for labeled dates first
  const dobMatch = fullText.match(
    /(?:date\s*of\s*birth|d\.?o\.?b\.?|birth\s*date|dob|Ffafer\s*\/?\s*Date\s*of\s*Birth)[^0-9]*(\d{1,2}[\/\-\.]\d{1,2}[\/\-\.]\d{4})/i
  );
  if (dobMatch) result.dateOfBirth = normalizeDateDDMMYYYY(dobMatch[1]);

  const expiryMatch = fullText.match(
    /(?:date\s*of\s*expiry|expiry|expiration|valid\s*(?:till|until|thru|upto))[^0-9]*(\d{1,2}[\/\-\.]\d{1,2}[\/\-\.]\d{4})/i
  );
  if (expiryMatch) result.expiryDate = normalizeDateDDMMYYYY(expiryMatch[1]);

  // If DOB not found, use positional: first date in document is often DOB
  if (!result.dateOfBirth) {
    const allDates = findAllDates(fullText);
    if (allDates.length >= 1) result.dateOfBirth = normalizeDateDDMMYYYY(allDates[0]);
    if (allDates.length >= 3 && !result.expiryDate)
      result.expiryDate = normalizeDateDDMMYYYY(allDates[2]);
  }

  // Authority
  const authMatch = fullText.match(
    /(?:republic\s*of|government\s*of)\s+([A-Za-z\s]{2,40})/i
  );
  if (authMatch) result.issuingAuthority = authMatch[0].trim();

  if (!result.issuingAuthority) {
    if (/india|bharat/i.test(fullText)) result.issuingAuthority = "Republic of India";
    else if (/united\s*states|usa/i.test(fullText))
      result.issuingAuthority = "United States of America";
    else if (/united\s*kingdom|britain/i.test(fullText))
      result.issuingAuthority = "United Kingdom";
  }

  return result;
}

/* ─── Additional Fields Extractor ─── */

interface ExtraField {
  label: string;
  value: string;
}

const EXTRA_FIELD_PATTERNS: { label: string; patterns: RegExp[] }[] = [
  {
    label: "Father's Name",
    patterns: [
      /(?:father|father'?s?\s*name|name\s*of\s*father)[^a-zA-Z]*?(?:legal\s*guard[a-z]*)?[^a-zA-Z]*?([A-Z][A-Za-z\s.'-]{2,50})/i,
    ],
  },
  {
    label: "Mother's Name",
    patterns: [
      /(?:mother|mother'?s?\s*name|name\s*of\s*mother)[^a-zA-Z]*?([A-Z][A-Za-z\s.'-]{2,50})/i,
    ],
  },
  {
    label: "Spouse's Name",
    patterns: [
      /(?:spouse|spouse'?s?\s*name|name\s*of\s*spouse|husband|wife)[^a-zA-Z]*?([A-Z][A-Za-z\s.'-]{2,50})/i,
    ],
  },
  {
    label: "Place of Birth",
    patterns: [
      /(?:place\s*of\s*birth)[^a-zA-Z]*?([A-Za-z][A-Za-z\s,.-]{2,60})/i,
      /(?:PATNA|DELHI|MUMBAI|KOLKATA|CHENNAI|BANGALORE|HYDERABAD)[,\s]*([A-Z]{2,20})/i,
    ],
  },
  {
    label: "Place of Issue",
    patterns: [
      /(?:place\s*of\s*issue)[^a-zA-Z]*?([A-Za-z][A-Za-z\s,.-]{2,60})/i,
    ],
  },
  {
    label: "Date of Issue",
    patterns: [
      /(?:date\s*of\s*issue|issued?\s*(?:on|date))[^0-9]*(\d{1,2}[\/\-\.]\d{1,2}[\/\-\.]\d{4})/i,
    ],
  },
  {
    label: "Address",
    patterns: [
      /(?:address)[^a-zA-Z]*?([A-Za-z0-9][A-Za-z0-9\s,.\-:\/()]{10,150})/i,
    ],
  },
  {
    label: "PIN Code",
    patterns: [
      /(?:pin)[:\s]*(\d{6})/i,
      /\b(\d{6})\s*,?\s*(?:bihar|india|delhi|maharashtra|karnataka|tamil\s*nadu|uttar\s*pradesh|rajasthan|gujarat|west\s*bengal|andhra|telangana|kerala|madhya\s*pradesh|punjab|haryana|odisha|assam|jharkhand|chhattisgarh|uttarakhand|goa|manipur|meghalaya|mizoram|nagaland|sikkim|tripura|arunachal)/i,
    ],
  },
  {
    label: "Gender",
    patterns: [
      /(?:sex|gender)[^a-zA-Z]*?(male|female|m|f)\b/i,
    ],
  },
  {
    label: "File Number",
    patterns: [
      /(?:file\s*no|file\s*number)[.:\s]*([A-Z0-9]{6,25})/i,
    ],
  },
  {
    label: "Old Passport No.",
    patterns: [
      /(?:old\s*passport\s*no)[^a-zA-Z0-9]*([A-Z0-9]{4,20})/i,
    ],
  },
  {
    label: "Nationality",
    patterns: [
      /(?:nationality)[^a-zA-Z]*?([A-Z][a-zA-Z]{2,20})/i,
    ],
  },
];

function extractAdditionalFields(
  text: string,
  mainData: DocumentDetailsData
): ExtraField[] {
  const fields: ExtraField[] = [];
  const mainValues = new Set(
    Object.values(mainData)
      .filter(Boolean)
      .map((v) => v.toLowerCase().trim())
  );

  for (const { label, patterns } of EXTRA_FIELD_PATTERNS) {
    for (const pattern of patterns) {
      const match = text.match(pattern);
      if (match?.[1]) {
        let value = match[1].trim().replace(/\s+/g, " ");

        if (value.length < 2) continue;
        if (mainValues.has(value.toLowerCase())) continue;
        if (fields.some((f) => f.label === label)) continue;

        if (label === "Gender") {
          value = value.toLowerCase() === "m" ? "Male"
            : value.toLowerCase() === "f" ? "Female"
            : value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
        }

        fields.push({ label, value });
        break;
      }
    }
  }

  // Also grab any dates we found that aren't already in main fields
  const allDatesInText = text.match(/\b\d{1,2}[\/\-\.]\d{1,2}[\/\-\.]\d{4}\b/g) || [];
  const mainDates = new Set([
    mainData.dateOfBirth.toLowerCase(),
    mainData.expiryDate.toLowerCase(),
  ]);
  const dateOfIssue = fields.find((f) => f.label === "Date of Issue");
  if (dateOfIssue) mainDates.add(dateOfIssue.value.toLowerCase());

  for (const d of allDatesInText) {
    if (!mainDates.has(d) && !fields.some((f) => f.value === d)) {
      const contextMatch = text.match(
        new RegExp(`([A-Za-z\\s]{3,30})\\s*[^0-9]*${d.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}`)
      );
      if (contextMatch?.[1]) {
        const ctx = contextMatch[1].trim();
        if (/issue/i.test(ctx) && !dateOfIssue) {
          fields.push({ label: "Date of Issue", value: d });
        }
      }
    }
  }

  return fields;
}

/* ─── Merge helper ─── */

function mergeResults(
  ...partials: (Partial<DocumentDetailsData> | null)[]
): DocumentDetailsData {
  const merged: DocumentDetailsData = {
    nameOnDocument: "",
    documentNumber: "",
    dateOfBirth: "",
    expiryDate: "",
    issuingAuthority: "",
  };

  // MRZ results (earlier in list) take priority over text-based
  for (const p of partials) {
    if (!p) continue;
    for (const key of Object.keys(merged) as (keyof DocumentDetailsData)[]) {
      if (!merged[key] && p[key]) {
        merged[key] = p[key]!;
      }
    }
  }

  return merged;
}

/* ─── Component ─── */

export default function DocDetailsStep({
  idFrontFile,
  idBackFile,
  data,
  onChange,
  onNext,
  onBack,
}: DocDetailsStepProps) {
  const [scanning, setScanning] = useState(false);
  const [scanStage, setScanStage] = useState<"front" | "back" | "done">("front");
  const [progress, setProgress] = useState(0);
  const [ocrDone, setOcrDone] = useState(false);
  const [rawText, setRawText] = useState("");
  const [showRawText, setShowRawText] = useState(false);
  const [frontPreview, setFrontPreview] = useState<string | null>(null);
  const [backPreview, setBackPreview] = useState<string | null>(null);
  const [additionalFields, setAdditionalFields] = useState<ExtraField[]>([]);
  const [showAdditional, setShowAdditional] = useState(true);
  const hasRun = useRef(false);

  const runOcr = useCallback(
    async (front: File, back: File | null) => {
      setScanning(true);
      setProgress(0);
      setScanStage("front");

      let combinedText = "";

      try {
        // Scan front
        const { data: frontData } = await Tesseract.recognize(front, "eng", {
          logger: (m) => {
            if (m.status === "recognizing text") {
              setProgress(Math.round(m.progress * (back ? 50 : 100)));
            }
          },
        });
        combinedText += frontData.text.trim();

        // Scan back
        if (back) {
          setScanStage("back");
          const { data: backData } = await Tesseract.recognize(back, "eng", {
            logger: (m) => {
              if (m.status === "recognizing text") {
                setProgress(50 + Math.round(m.progress * 50));
              }
            },
          });
          combinedText += "\n---BACK---\n" + backData.text.trim();
        }

        setRawText(combinedText);

        const mrzResult = parseMrz(combinedText);
        const textResult = parseFromText(combinedText);
        const merged = mergeResults(mrzResult, textResult);

        onChange(merged);

        const extras = extractAdditionalFields(combinedText, merged);
        setAdditionalFields(extras);
      } catch {
        setRawText(combinedText || "OCR failed");
      } finally {
        setScanStage("done");
        setScanning(false);
        setOcrDone(true);
      }
    },
    [onChange]
  );

  useEffect(() => {
    if (idFrontFile && !hasRun.current) {
      hasRun.current = true;
      const frontUrl = URL.createObjectURL(idFrontFile);
      setFrontPreview(frontUrl);

      let backUrl: string | null = null;
      if (idBackFile) {
        backUrl = URL.createObjectURL(idBackFile);
        setBackPreview(backUrl);
      }

      runOcr(idFrontFile, idBackFile);

      return () => {
        URL.revokeObjectURL(frontUrl);
        if (backUrl) URL.revokeObjectURL(backUrl);
      };
    }
  }, [idFrontFile, idBackFile, runOcr]);

  const fieldsValid =
    data.nameOnDocument.trim() &&
    data.documentNumber.trim() &&
    data.dateOfBirth.trim();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (fieldsValid) onNext();
  };

  const fieldsPopulated = Object.values(data).filter(Boolean).length;

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Header */}
      <div className="card">
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0 w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
            <ScanLine className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h2 className="font-heading text-xl font-semibold mb-1">
              Document Details
            </h2>
            <p className="text-offwhite/50 text-sm leading-relaxed">
              We&apos;re scanning both sides of your ID to extract details.
              Please review and correct any fields if needed, then confirm.
            </p>
          </div>
        </div>
      </div>

      {/* Document Previews */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {frontPreview && (
          <div className="card p-0 overflow-hidden">
            <div className="px-3 py-2 border-b border-dark-border flex items-center gap-2">
              <CreditCard className="h-3.5 w-3.5 text-primary" />
              <span className="text-xs font-semibold text-offwhite/60 uppercase tracking-wider">
                ID Front
              </span>
              {scanning && scanStage === "front" && (
                <Loader2 className="h-3 w-3 animate-spin text-primary ml-auto" />
              )}
              {(ocrDone || scanStage !== "front") && (
                <CheckCircle2 className="h-3 w-3 text-primary ml-auto" />
              )}
            </div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={frontPreview}
              alt="ID Front"
              className="w-full h-32 object-contain bg-black"
            />
          </div>
        )}
        {backPreview && (
          <div className="card p-0 overflow-hidden">
            <div className="px-3 py-2 border-b border-dark-border flex items-center gap-2">
              <CreditCard className="h-3.5 w-3.5 text-primary" />
              <span className="text-xs font-semibold text-offwhite/60 uppercase tracking-wider">
                ID Back
              </span>
              {scanning && scanStage === "back" && (
                <Loader2 className="h-3 w-3 animate-spin text-primary ml-auto" />
              )}
              {(ocrDone || (scanStage !== "front" && scanStage !== "back")) && (
                <CheckCircle2 className="h-3 w-3 text-primary ml-auto" />
              )}
            </div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={backPreview}
              alt="ID Back"
              className="w-full h-32 object-contain bg-black"
            />
          </div>
        )}
      </div>

      {/* Scanning Progress */}
      {scanning && (
        <div className="card text-center py-6">
          <Loader2 className="h-8 w-8 animate-spin text-primary mx-auto mb-3" />
          <p className="text-sm font-medium text-offwhite/80">
            Scanning {scanStage === "front" ? "front side" : "back side"}... {progress}%
          </p>
          <div className="w-64 h-1.5 bg-dark-border rounded-full overflow-hidden mx-auto mt-3">
            <div
              className="h-full bg-primary rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      )}

      {/* Scan Result Summary */}
      {ocrDone && (
        <div className="flex items-center justify-between px-1">
          <div className="flex items-center gap-2">
            {fieldsPopulated >= 3 ? (
              <CheckCircle2 className="h-4 w-4 text-primary" />
            ) : (
              <AlertTriangle className="h-4 w-4 text-yellow-400" />
            )}
            <span className="text-xs text-offwhite/50">
              {fieldsPopulated >= 3
                ? `${fieldsPopulated} fields auto-detected from your document`
                : "Some fields need manual input — please fill below"}
            </span>
          </div>
          {rawText && (
            <button
              type="button"
              onClick={() => setShowRawText(!showRawText)}
              className="text-xs text-offwhite/40 hover:text-offwhite/60 flex items-center gap-1 transition-colors"
            >
              <Eye className="h-3 w-3" />
              {showRawText ? "Hide" : "Show"} raw text
            </button>
          )}
        </div>
      )}

      {showRawText && rawText && (
        <div className="card p-3">
          <p className="text-xs text-offwhite/50 whitespace-pre-wrap font-mono leading-relaxed max-h-40 overflow-y-auto">
            {rawText}
          </p>
        </div>
      )}

      {/* Auto-filled form */}
      {ocrDone && (
        <div className="card space-y-5">
          <h3 className="font-heading text-sm font-semibold text-offwhite/60 uppercase tracking-wider flex items-center gap-2">
            <FileCheck className="h-4 w-4 text-primary" />
            Extracted Document Information
          </h3>

          <div>
            <label className="block text-sm font-medium text-offwhite/70 mb-2">
              Name on Document <span className="text-red-400">*</span>
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-offwhite/30" />
              <input
                type="text"
                value={data.nameOnDocument}
                onChange={(e) =>
                  onChange({ ...data, nameOnDocument: e.target.value })
                }
                className="input-field pl-10"
                placeholder="Full name as on document"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-medium text-offwhite/70 mb-2">
                Document Number / ID <span className="text-red-400">*</span>
              </label>
              <div className="relative">
                <Hash className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-offwhite/30" />
                <input
                  type="text"
                  value={data.documentNumber}
                  onChange={(e) =>
                    onChange({ ...data, documentNumber: e.target.value })
                  }
                  className="input-field pl-10"
                  placeholder="e.g. AG891322"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-offwhite/70 mb-2">
                Date of Birth <span className="text-red-400">*</span>
              </label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-offwhite/30" />
                <input
                  type="text"
                  value={data.dateOfBirth}
                  onChange={(e) =>
                    onChange({ ...data, dateOfBirth: e.target.value })
                  }
                  className="input-field pl-10"
                  placeholder="DD/MM/YYYY"
                  required
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-medium text-offwhite/70 mb-2">
                Expiry Date
                <span className="text-offwhite/30 ml-1">(if available)</span>
              </label>
              <div className="relative">
                <Clock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-offwhite/30" />
                <input
                  type="text"
                  value={data.expiryDate}
                  onChange={(e) =>
                    onChange({ ...data, expiryDate: e.target.value })
                  }
                  className="input-field pl-10"
                  placeholder="DD/MM/YYYY or N/A"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-offwhite/70 mb-2">
                Issuing Authority
                <span className="text-offwhite/30 ml-1">(if available)</span>
              </label>
              <div className="relative">
                <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-offwhite/30" />
                <input
                  type="text"
                  value={data.issuingAuthority}
                  onChange={(e) =>
                    onChange({ ...data, issuingAuthority: e.target.value })
                  }
                  className="input-field pl-10"
                  placeholder="e.g. Republic of India"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Additional Detected Fields */}
      {ocrDone && additionalFields.length > 0 && (
        <div className="card">
          <button
            type="button"
            onClick={() => setShowAdditional(!showAdditional)}
            className="w-full flex items-center justify-between"
          >
            <h3 className="font-heading text-sm font-semibold text-offwhite/60 uppercase tracking-wider flex items-center gap-2">
              <Info className="h-4 w-4 text-blue-400" />
              Additional Details Detected
              <span className="text-xs font-normal normal-case text-offwhite/30">
                ({additionalFields.length} fields)
              </span>
            </h3>
            {showAdditional ? (
              <ChevronUp className="h-4 w-4 text-offwhite/40" />
            ) : (
              <ChevronDown className="h-4 w-4 text-offwhite/40" />
            )}
          </button>

          {showAdditional && (
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
              {additionalFields.map((field, i) => (
                <div
                  key={i}
                  className="p-3 rounded-input bg-dark/50 border border-dark-border"
                >
                  <p className="text-[10px] text-blue-400/70 uppercase tracking-wider font-semibold mb-1">
                    {field.label}
                  </p>
                  <p className="text-sm text-offwhite/70 break-words">
                    {field.value}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Navigation */}
      <div className="flex justify-between pt-2">
        <button type="button" onClick={onBack} className="btn-secondary">
          Back
        </button>
        <button
          type="submit"
          disabled={!ocrDone || !fieldsValid}
          className="btn-primary disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-2"
        >
          <CheckCircle2 className="h-4 w-4" />
          Confirm & Continue
        </button>
      </div>
    </form>
  );
}
