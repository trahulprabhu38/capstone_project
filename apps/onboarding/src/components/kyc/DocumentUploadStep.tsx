"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import {
  Upload,
  Check,
  Loader2,
  AlertCircle,
  Camera,
  ImageUp,
  CreditCard,
  ScanFace,
  X,
  RotateCcw,
} from "lucide-react";
import OcrVerification from "./OcrVerification";

interface UploadedDoc {
  type: string;
  s3Key?: string;
  file?: File;
  preview?: string;
  uploading?: boolean;
  error?: string;
}

interface DocumentUploadStepProps {
  documents: UploadedDoc[];
  onUpload: (file: File, type: string) => Promise<void>;
  onNext: () => void;
  onBack: () => void;
}

function DocDropzone({
  label,
  type,
  doc,
  onDrop,
  hint,
}: {
  label: string;
  type: string;
  doc?: UploadedDoc;
  onDrop: (file: File, type: string) => void;
  hint: string;
}) {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: (files) => {
      if (files[0]) onDrop(files[0], type);
    },
    accept: {
      "image/jpeg": [".jpg", ".jpeg"],
      "image/png": [".png"],
      "application/pdf": [".pdf"],
    },
    maxSize: 5 * 1024 * 1024,
    multiple: false,
  });

  const isUploaded = doc?.s3Key;
  const isUploading = doc?.uploading;

  return (
    <div
      {...getRootProps()}
      className={`card cursor-pointer text-center transition-all hover:border-primary/40 ${
        isDragActive
          ? "border-primary bg-primary/5"
          : isUploaded
          ? "border-primary/30 bg-primary/5"
          : "border-dashed border-dark-border hover:bg-dark-card/80"
      }`}
    >
      <input {...getInputProps()} />

      {isUploading ? (
        <div className="py-8">
          <Loader2 className="h-8 w-8 animate-spin text-primary mx-auto mb-3" />
          <p className="text-sm text-offwhite/50">Uploading...</p>
        </div>
      ) : isUploaded ? (
        <div className="py-8">
          <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-3">
            <Check className="h-6 w-6 text-primary" />
          </div>
          <p className="text-sm font-semibold text-primary">{label}</p>
          <p className="text-xs text-offwhite/40 mt-1">
            Uploaded successfully
          </p>
          <button className="mt-3 text-xs text-offwhite/30 hover:text-offwhite/60 underline underline-offset-2 transition-colors">
            Click to replace
          </button>
        </div>
      ) : doc?.error ? (
        <div className="py-8">
          <div className="w-12 h-12 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-3">
            <AlertCircle className="h-6 w-6 text-red-400" />
          </div>
          <p className="text-sm font-semibold text-red-400">{label}</p>
          <p className="text-xs text-red-400/70 mt-1">{doc.error}</p>
          <p className="text-xs text-offwhite/30 mt-2">Click to retry</p>
        </div>
      ) : (
        <div className="py-8">
          <div className="w-12 h-12 bg-dark-border/50 rounded-full flex items-center justify-center mx-auto mb-3">
            <Upload className="h-5 w-5 text-offwhite/40" />
          </div>
          <p className="text-sm font-semibold text-offwhite/80">{label}</p>
          <p className="text-xs text-offwhite/40 mt-1">
            {isDragActive ? "Drop file here" : hint}
          </p>
          <div className="flex items-center justify-center gap-2 mt-3">
            <span className="text-[10px] px-2 py-0.5 rounded bg-dark-border/50 text-offwhite/30">
              JPG
            </span>
            <span className="text-[10px] px-2 py-0.5 rounded bg-dark-border/50 text-offwhite/30">
              PNG
            </span>
            <span className="text-[10px] px-2 py-0.5 rounded bg-dark-border/50 text-offwhite/30">
              PDF
            </span>
            <span className="text-[10px] text-offwhite/20">Max 5MB</span>
          </div>
        </div>
      )}
    </div>
  );
}

function SelfieCapture({
  doc,
  onCapture,
  onUploadFile,
}: {
  doc?: UploadedDoc;
  onCapture: (file: File) => void;
  onUploadFile: (file: File) => void;
}) {
  const [mode, setMode] = useState<"choose" | "camera" | "upload">("choose");
  const [cameraReady, setCameraReady] = useState(false);
  const [cameraError, setCameraError] = useState("");
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const isUploaded = doc?.s3Key;
  const isUploading = doc?.uploading;

  const stopCamera = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((t) => t.stop());
      streamRef.current = null;
    }
    setCameraReady(false);
  }, []);

  const startCamera = useCallback(async () => {
    setCameraError("");
    setCapturedImage(null);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "user", width: 640, height: 480 },
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.onloadedmetadata = () => setCameraReady(true);
      }
    } catch {
      setCameraError(
        "Camera access denied. Please allow camera permissions and try again."
      );
    }
  }, []);

  useEffect(() => {
    return () => stopCamera();
  }, [stopCamera]);

  const handleOpenCamera = () => {
    setMode("camera");
    startCamera();
  };

  const handleTakePhoto = () => {
    if (!videoRef.current || !canvasRef.current) return;
    const video = videoRef.current;
    const canvas = canvasRef.current;
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.drawImage(video, 0, 0);
    const dataUrl = canvas.toDataURL("image/jpeg", 0.9);
    setCapturedImage(dataUrl);
    stopCamera();
  };

  const handleConfirmPhoto = () => {
    if (!capturedImage) return;
    fetch(capturedImage)
      .then((res) => res.blob())
      .then((blob) => {
        const file = new File([blob], `selfie_${Date.now()}.jpg`, {
          type: "image/jpeg",
        });
        onCapture(file);
        setMode("choose");
        setCapturedImage(null);
      });
  };

  const handleRetake = () => {
    setCapturedImage(null);
    startCamera();
  };

  const handleBack = () => {
    stopCamera();
    setCapturedImage(null);
    setMode("choose");
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: (files) => {
      if (files[0]) {
        onUploadFile(files[0]);
        setMode("choose");
      }
    },
    accept: { "image/jpeg": [".jpg", ".jpeg"], "image/png": [".png"] },
    maxSize: 5 * 1024 * 1024,
    multiple: false,
  });

  if (isUploaded) {
    return (
      <div className="card text-center py-8 border-primary/30 bg-primary/5">
        <div className="w-14 h-14 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-3">
          <Check className="h-7 w-7 text-primary" />
        </div>
        <p className="text-sm font-semibold text-primary">
          Selfie Uploaded
        </p>
        <p className="text-xs text-offwhite/40 mt-1">
          Uploaded successfully
        </p>
        <button
          onClick={() => setMode("choose")}
          className="mt-3 text-xs text-offwhite/30 hover:text-offwhite/60 underline underline-offset-2 transition-colors"
        >
          Replace selfie
        </button>
      </div>
    );
  }

  if (isUploading) {
    return (
      <div className="card text-center py-10">
        <Loader2 className="h-8 w-8 animate-spin text-primary mx-auto mb-3" />
        <p className="text-sm text-offwhite/50">Uploading selfie...</p>
      </div>
    );
  }

  if (doc?.error) {
    return (
      <div className="card text-center py-8 border-red-500/20">
        <div className="w-12 h-12 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-3">
          <AlertCircle className="h-6 w-6 text-red-400" />
        </div>
        <p className="text-sm font-semibold text-red-400">Upload Failed</p>
        <p className="text-xs text-red-400/70 mt-1">{doc.error}</p>
        <button
          onClick={() => setMode("choose")}
          className="mt-3 text-xs text-primary hover:text-primary-hover underline underline-offset-2"
        >
          Try again
        </button>
      </div>
    );
  }

  if (mode === "camera") {
    return (
      <div className="card p-0 overflow-hidden">
        <div className="flex items-center justify-between px-4 py-3 border-b border-dark-border">
          <span className="text-sm font-semibold text-offwhite/80">
            Take Selfie
          </span>
          <button
            onClick={handleBack}
            className="text-offwhite/40 hover:text-offwhite/70 transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="relative bg-black aspect-[4/3] flex items-center justify-center">
          {cameraError ? (
            <div className="text-center px-6">
              <AlertCircle className="h-8 w-8 text-red-400 mx-auto mb-2" />
              <p className="text-sm text-red-400">{cameraError}</p>
              <button
                onClick={startCamera}
                className="mt-3 text-xs text-primary underline"
              >
                Retry
              </button>
            </div>
          ) : capturedImage ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={capturedImage}
              alt="Captured selfie"
              className="w-full h-full object-cover"
            />
          ) : (
            <>
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                className="w-full h-full object-cover mirror"
                style={{ transform: "scaleX(-1)" }}
              />
              {!cameraReady && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/60">
                  <Loader2 className="h-8 w-8 animate-spin text-primary" />
                </div>
              )}
              <div className="absolute inset-0 border-[3px] border-primary/20 rounded-lg pointer-events-none m-4" />
            </>
          )}
        </div>
        <canvas ref={canvasRef} className="hidden" />

        <div className="px-4 py-3 flex justify-center gap-3 border-t border-dark-border">
          {capturedImage ? (
            <>
              <button
                onClick={handleRetake}
                className="btn-secondary text-sm py-2 px-5 flex items-center gap-2"
              >
                <RotateCcw className="h-4 w-4" />
                Retake
              </button>
              <button
                onClick={handleConfirmPhoto}
                className="btn-primary text-sm py-2 px-5 flex items-center gap-2"
              >
                <Check className="h-4 w-4" />
                Use This Photo
              </button>
            </>
          ) : (
            <button
              onClick={handleTakePhoto}
              disabled={!cameraReady}
              className="btn-primary text-sm py-2 px-8 flex items-center gap-2 disabled:opacity-40"
            >
              <Camera className="h-4 w-4" />
              Capture
            </button>
          )}
        </div>
      </div>
    );
  }

  if (mode === "upload") {
    return (
      <div className="card p-0 overflow-hidden">
        <div className="flex items-center justify-between px-4 py-3 border-b border-dark-border">
          <span className="text-sm font-semibold text-offwhite/80">
            Upload Selfie
          </span>
          <button
            onClick={handleBack}
            className="text-offwhite/40 hover:text-offwhite/70 transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
        <div
          {...getRootProps()}
          className={`cursor-pointer p-10 text-center transition-all ${
            isDragActive ? "bg-primary/5" : "hover:bg-dark-card/80"
          }`}
        >
          <input {...getInputProps()} />
          <div className="w-14 h-14 bg-dark-border/50 rounded-full flex items-center justify-center mx-auto mb-4">
            <ImageUp className="h-6 w-6 text-offwhite/40" />
          </div>
          <p className="text-sm font-semibold text-offwhite/80">
            {isDragActive ? "Drop your selfie here" : "Drag & drop or click to browse"}
          </p>
          <p className="text-xs text-offwhite/40 mt-2">
            Upload a clear, well-lit photo of your face
          </p>
          <div className="flex items-center justify-center gap-2 mt-3">
            <span className="text-[10px] px-2 py-0.5 rounded bg-dark-border/50 text-offwhite/30">
              JPG
            </span>
            <span className="text-[10px] px-2 py-0.5 rounded bg-dark-border/50 text-offwhite/30">
              PNG
            </span>
            <span className="text-[10px] text-offwhite/20">Max 5MB</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <p className="text-xs text-offwhite/40 text-center mb-1">
        Choose how you&apos;d like to provide your selfie
      </p>
      <div className="grid grid-cols-2 gap-3">
        <button
          onClick={handleOpenCamera}
          className="card text-center py-8 hover:border-primary/40 transition-all group cursor-pointer border-dashed"
        >
          <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:bg-primary/20 transition-colors">
            <Camera className="h-5 w-5 text-primary" />
          </div>
          <p className="text-sm font-semibold text-offwhite/80">Take Photo</p>
          <p className="text-xs text-offwhite/40 mt-1">
            Use your camera to take a live selfie
          </p>
        </button>

        <button
          onClick={() => setMode("upload")}
          className="card text-center py-8 hover:border-primary/40 transition-all group cursor-pointer border-dashed"
        >
          <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:bg-primary/20 transition-colors">
            <ImageUp className="h-5 w-5 text-primary" />
          </div>
          <p className="text-sm font-semibold text-offwhite/80">Upload Photo</p>
          <p className="text-xs text-offwhite/40 mt-1">
            Upload an existing selfie from your device
          </p>
        </button>
      </div>
    </div>
  );
}

export default function DocumentUploadStep({
  documents,
  onUpload,
  onNext,
  onBack,
}: DocumentUploadStepProps) {
  const getDoc = (type: string) => documents.find((d) => d.type === type);

  const allUploaded =
    getDoc("ID_FRONT")?.s3Key &&
    getDoc("ID_BACK")?.s3Key &&
    getDoc("SELFIE")?.s3Key;

  const [pendingFile, setPendingFile] = useState<{
    file: File;
    type: "ID_FRONT" | "ID_BACK";
  } | null>(null);

  const handleDrop = async (file: File, type: string) => {
    if (type === "ID_FRONT" || type === "ID_BACK") {
      setPendingFile({ file, type });
      return;
    }
    await onUpload(file, type);
  };

  const handleOcrConfirm = async () => {
    if (!pendingFile) return;
    const { file, type } = pendingFile;
    setPendingFile(null);
    await onUpload(file, type);
  };

  const handleOcrReject = () => {
    setPendingFile(null);
  };

  const uploadedCount = ["ID_FRONT", "ID_BACK", "SELFIE"].filter(
    (t) => getDoc(t)?.s3Key
  ).length;

  return (
    <div className="space-y-8">
      {/* OCR Verification Modal */}
      {pendingFile && (
        <OcrVerification
          file={pendingFile.file}
          docType={pendingFile.type}
          onConfirm={handleOcrConfirm}
          onReject={handleOcrReject}
        />
      )}

      {/* Header */}
      <div className="card">
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0 w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
            <CreditCard className="h-5 w-5 text-primary" />
          </div>
          <div className="flex-1">
            <h2 className="font-heading text-xl font-semibold mb-1">
              Document Upload
            </h2>
            <p className="text-offwhite/50 text-sm leading-relaxed">
              Upload clear photos of your government-issued ID (front & back)
              and a selfie for identity verification. ID documents are
              automatically scanned to verify they contain valid identification.
            </p>
          </div>
          <div className="flex-shrink-0 text-right">
            <div className="text-2xl font-bold text-primary font-title">
              {uploadedCount}/3
            </div>
            <div className="text-[10px] text-offwhite/30 uppercase tracking-wider">
              Uploaded
            </div>
          </div>
        </div>
      </div>

      {/* ID Documents */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <CreditCard className="h-4 w-4 text-offwhite/40" />
          <h3 className="text-sm font-semibold text-offwhite/70 uppercase tracking-wider">
            Government ID
          </h3>
        </div>
        <p className="text-xs text-offwhite/40 mb-4">
          Accepted: Passport, Driver&apos;s License, National ID, or Aadhaar
          Card. Ensure all text is legible and the full card is visible.
          Documents are OCR-scanned to confirm they are valid IDs.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <DocDropzone
            label="ID Front"
            type="ID_FRONT"
            doc={getDoc("ID_FRONT")}
            onDrop={handleDrop}
            hint="Drag & drop or click to upload front side"
          />
          <DocDropzone
            label="ID Back"
            type="ID_BACK"
            doc={getDoc("ID_BACK")}
            onDrop={handleDrop}
            hint="Drag & drop or click to upload back side"
          />
        </div>
      </div>

      {/* Selfie Section */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <ScanFace className="h-4 w-4 text-offwhite/40" />
          <h3 className="text-sm font-semibold text-offwhite/70 uppercase tracking-wider">
            Selfie Verification
          </h3>
        </div>
        <p className="text-xs text-offwhite/40 mb-4">
          We need a clear photo of your face to match against your ID. You can
          either take a live photo using your camera or upload an existing one.
        </p>
        <SelfieCapture
          doc={getDoc("SELFIE")}
          onCapture={(file) => onUpload(file, "SELFIE")}
          onUploadFile={(file) => onUpload(file, "SELFIE")}
        />
      </div>

      {/* Navigation */}
      <div className="flex justify-between pt-2">
        <button onClick={onBack} className="btn-secondary">
          Back
        </button>
        <button
          onClick={onNext}
          disabled={!allUploaded}
          className="btn-primary disabled:opacity-40 disabled:cursor-not-allowed"
        >
          Continue
        </button>
      </div>
    </div>
  );
}
