"use client";

import { useState, useEffect, useCallback } from "react";
import { api } from "@/lib/api";
import type { KycApplication } from "@/types";

export function useKyc() {
  const [application, setApplication] = useState<KycApplication | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchStatus = useCallback(async () => {
    try {
      setLoading(true);
      const { data } = await api.get("/kyc/status");
      if (data.success && data.data._id) {
        setApplication(data.data);
      }
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to fetch KYC status");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchStatus();
  }, [fetchStatus]);

  const submitKyc = async (payload: {
    personalInfo: {
      fullName: string;
      dateOfBirth: string;
      country: string;
      phone: string;
    };
    walletAddress?: string;
  }) => {
    const { data } = await api.post("/kyc/submit", payload);
    if (data.success) {
      setApplication(data.data);
    }
    return data;
  };

  const uploadDocument = async (file: File, documentType: string) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("documentType", documentType);

    const { data } = await api.post("/upload/document", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return data;
  };

  const getGameUrl = async (): Promise<string | null> => {
    try {
      const { data } = await api.get("/game/url");
      return data.success ? data.data.url : null;
    } catch {
      return null;
    }
  };

  return {
    application,
    loading,
    error,
    submitKyc,
    uploadDocument,
    getGameUrl,
    refetch: fetchStatus,
  };
}
