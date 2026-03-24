"use client";

import { useState, useEffect, useCallback } from "react";
import Tesseract from "tesseract.js";
import {
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Loader2,
  X,
  FileCheck,
  Eye,
  RotateCcw,
} from "lucide-react";

type VerificationResult = "valid" | "suspicious" | "invalid" | null;

interface OcrVerificationProps {
  file: File;
  docType: "ID_FRONT" | "ID_BACK" | "SELFIE";
  onConfirm: () => void;
  onReject: () => void;
}

const ID_KEYWORDS = [
  "government",
  "republic",
  "india",
  "name",
  "date of birth",
  "dob",
  "d.o.b",
  "address",
  "father",
  "husband",
  "male",
  "female",
  "signature",
  "voter",
  "election",
  "passport",
  "driving",
  "licence",
  "license",
  "aadhaar",
  "aadhar",
  "uid",
  "unique identification",
  "pan",
  "permanent account",
  "income tax",
  "identity",
  "identification",
  "national",
  "ministry",
  "issued",
  "valid",
  "expiry",
  "birth",
  "nationality",
  "sex",
  "gender",
  "photo",
  "id no",
  "card no",
  "number",
  "enrollment",
  "department",
  "transport",
];

function analyzeOcrText(
  text: string,
  docType: string
): { result: VerificationResult; matchedKeywords: string[]; confidence: number } {
  const lower = text.toLowerCase().replace(/\s+/g, " ");

  const matchedKeywords = ID_KEYWORDS.filter((kw) => lower.includes(kw));

  // Reason: higher threshold for front (should have more visible text), lower for back
  const threshold = docType === "ID_FRONT" ? 3 : 2;

  if (matchedKeywords.length >= threshold) {
    return {
      result: "valid",
      matchedKeywords,
      confidence: Math.min(matchedKeywords.length / 5, 1),
    };
  }

  if (matchedKeywords.length >= 1) {
    return { result: "suspicious", matchedKeywords, confidence: 0.4 };
  }

  return { result: "invalid", matchedKeywords: [], confidence: 0 };
}

export default function OcrVerification({
  file,
  docType,
  onConfirm,
  onReject,
}: OcrVerificationProps) {
  const [preview, setPreview] = useState<string | null>(null);
  const [scanning, setScanning] = useState(true);
  const [progress, setProgress] = useState(0);
  const [ocrText, setOcrText] = useState("");
  const [result, setResult] = useState<VerificationResult>(null);
  const [matchedKeywords, setMatchedKeywords] = useState<string[]>([]);
  const [showRawText, setShowRawText] = useState(false);

  const runOcr = useCallback(
    async (imageFile: File) => {
      setScanning(true);
      setProgress(0);
      setResult(null);

      try {
        const { data } = await Tesseract.recognize(imageFile, "eng", {
          logger: (m) => {
            if (m.status === "recognizing text") {
              setProgress(Math.round(m.progress * 100));
            }
          },
        });

        const extracted = data.text.trim();
        setOcrText(extracted);

        const analysis = analyzeOcrText(extracted, docType);
        setResult(analysis.result);
        setMatchedKeywords(analysis.matchedKeywords);
      } catch {
        setOcrText("");
        setResult("invalid");
      } finally {
        setScanning(false);
      }
    },
    [docType]
  );

  useEffect(() => {
    const url = URL.createObjectURL(file);
    setPreview(url);
    runOcr(file);
    return () => URL.revokeObjectURL(url);
  }, [file, runOcr]);

  const docLabel = docType === "ID_FRONT" ? "ID Front" : "ID Back";

  const resultConfig = {
    valid: {
      icon: CheckCircle2,
      color: "text-primary",
      bg: "bg-primary/10",
      border: "border-primary/30",
      title: "Document Looks Valid",
      description: `This appears to be a valid government-issued ID (${docLabel}). We detected identity-related information in the document.`,
    },
    suspicious: {
      icon: AlertTriangle,
      color: "text-yellow-400",
      bg: "bg-yellow-400/10",
      border: "border-yellow-400/30",
      title: "Couldn't Fully Verify",
      description:
        "We found some identity-related text but couldn't fully confirm this is a government ID. Please check the image is clear and well-lit.",
    },
    invalid: {
      icon: XCircle,
      color: "text-red-400",
      bg: "bg-red-500/10",
      border: "border-red-500/30",
      title: "This May Not Be a Valid ID",
      description:
        "We couldn't detect identity-related information in this document. Please make sure you've uploaded the correct government-issued ID.",
    },
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-dark-card border border-dark-border rounded-card max-w-lg w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-dark-border">
          <div className="flex items-center gap-2">
            <FileCheck className="h-5 w-5 text-primary" />
            <h3 className="font-heading font-semibold">
              Document Verification — {docLabel}
            </h3>
          </div>
          <button
            onClick={onReject}
            className="text-offwhite/40 hover:text-offwhite/70 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Preview */}
        <div className="px-5 pt-4">
          <div className="relative rounded-lg overflow-hidden border border-dark-border bg-black">
            {preview && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={preview}
                alt={`${docLabel} preview`}
                className="w-full max-h-56 object-contain"
              />
            )}
            {scanning && (
              <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center gap-3">
                <div className="relative w-12 h-12">
                  <Loader2 className="h-12 w-12 animate-spin text-primary" />
                </div>
                <div className="text-center">
                  <p className="text-sm font-medium text-offwhite/80">
                    Scanning Document...
                  </p>
                  <p className="text-xs text-offwhite/40 mt-1">
                    {progress}% complete
                  </p>
                </div>
                <div className="w-48 h-1.5 bg-dark-border rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary rounded-full transition-all duration-300"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Result */}
        {!scanning && result && (
          <div className="px-5 pt-4 space-y-4">
            {(() => {
              const cfg = resultConfig[result];
              const RIcon = cfg.icon;
              return (
                <div
                  className={`flex items-start gap-3 p-4 rounded-input ${cfg.bg} border ${cfg.border}`}
                >
                  <RIcon className={`h-5 w-5 flex-shrink-0 mt-0.5 ${cfg.color}`} />
                  <div>
                    <p className={`font-semibold text-sm ${cfg.color}`}>
                      {cfg.title}
                    </p>
                    <p className="text-xs text-offwhite/50 mt-1 leading-relaxed">
                      {cfg.description}
                    </p>
                  </div>
                </div>
              );
            })()}

            {/* Matched Keywords */}
            {matchedKeywords.length > 0 && (
              <div>
                <p className="text-xs text-offwhite/40 mb-2">
                  Detected keywords:
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {matchedKeywords.map((kw) => (
                    <span
                      key={kw}
                      className="text-[10px] px-2 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20 capitalize"
                    >
                      {kw}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Raw text toggle */}
            {ocrText && (
              <div>
                <button
                  onClick={() => setShowRawText(!showRawText)}
                  className="text-xs text-offwhite/40 hover:text-offwhite/60 transition-colors flex items-center gap-1"
                >
                  <Eye className="h-3 w-3" />
                  {showRawText ? "Hide" : "View"} extracted text
                </button>
                {showRawText && (
                  <div className="mt-2 p-3 rounded-input bg-dark border border-dark-border max-h-32 overflow-y-auto">
                    <p className="text-xs text-offwhite/50 whitespace-pre-wrap font-mono leading-relaxed">
                      {ocrText}
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* Actions */}
        {!scanning && (
          <div className="px-5 py-4 mt-2 border-t border-dark-border flex justify-between">
            <button
              onClick={onReject}
              className="btn-secondary text-sm py-2 px-5 flex items-center gap-2"
            >
              <RotateCcw className="h-4 w-4" />
              Choose Different File
            </button>
            <button
              onClick={onConfirm}
              className={`text-sm py-2 px-5 flex items-center gap-2 ${
                result === "invalid"
                  ? "bg-red-500/20 text-red-400 border border-red-500/30 rounded-input hover:bg-red-500/30 transition-colors"
                  : "btn-primary"
              }`}
            >
              <CheckCircle2 className="h-4 w-4" />
              {result === "invalid" ? "Upload Anyway" : "Confirm & Upload"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
