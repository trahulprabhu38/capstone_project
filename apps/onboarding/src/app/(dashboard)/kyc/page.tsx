"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import StepIndicator from "@/components/kyc/StepIndicator";
import PersonalInfoStep from "@/components/kyc/PersonalInfoStep";
import DocumentUploadStep from "@/components/kyc/DocumentUploadStep";
import WalletConnectStep from "@/components/kyc/WalletConnectStep";
import ReviewStep from "@/components/kyc/ReviewStep";
import { useKyc } from "@/hooks/useKyc";

const STEP_LABELS = ["Personal Info", "Documents", "Wallet", "Review"];

interface UploadedDoc {
  type: string;
  s3Key?: string;
  uploading?: boolean;
  error?: string;
}

export default function KycPage() {
  const router = useRouter();
  const { submitKyc, uploadDocument } = useKyc();
  const [step, setStep] = useState(1);
  const [submitting, setSubmitting] = useState(false);

  const [personalInfo, setPersonalInfo] = useState({
    fullName: "",
    dateOfBirth: "",
    country: "",
    phone: "",
  });

  const [documents, setDocuments] = useState<UploadedDoc[]>([]);
  const [walletAddress, setWalletAddress] = useState("");

  const handleUpload = async (file: File, type: string) => {
    setDocuments((prev) => {
      const filtered = prev.filter((d) => d.type !== type);
      return [...filtered, { type, uploading: true }];
    });

    try {
      const result = await uploadDocument(file, type);
      setDocuments((prev) =>
        prev.map((d) =>
          d.type === type
            ? { type, s3Key: result.data.s3Key, uploading: false }
            : d
        )
      );
    } catch (err: any) {
      setDocuments((prev) =>
        prev.map((d) =>
          d.type === type
            ? { type, uploading: false, error: "Upload failed" }
            : d
        )
      );
    }
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    try {
      await submitKyc({
        personalInfo,
        walletAddress: walletAddress || undefined,
      });
      router.push("/status");
    } catch (err: any) {
      alert(err.response?.data?.message || "Submission failed");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-10">
      <StepIndicator
        currentStep={step}
        totalSteps={4}
        stepLabels={STEP_LABELS}
      />

      {step === 1 && (
        <PersonalInfoStep
          data={personalInfo}
          onChange={setPersonalInfo}
          onNext={() => setStep(2)}
        />
      )}

      {step === 2 && (
        <DocumentUploadStep
          documents={documents}
          onUpload={handleUpload}
          onNext={() => setStep(3)}
          onBack={() => setStep(1)}
        />
      )}

      {step === 3 && (
        <WalletConnectStep
          walletAddress={walletAddress}
          onConnect={setWalletAddress}
          onNext={() => setStep(4)}
          onBack={() => setStep(2)}
        />
      )}

      {step === 4 && (
        <ReviewStep
          personalInfo={personalInfo}
          walletAddress={walletAddress}
          documentsUploaded={documents.filter((d) => d.s3Key).length}
          onSubmit={handleSubmit}
          onBack={() => setStep(3)}
          submitting={submitting}
        />
      )}
    </div>
  );
}
