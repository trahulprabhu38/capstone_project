"use client";

import { useState } from "react";
import { connectWallet, isMetaMaskInstalled } from "@/lib/web3";
import { Wallet, Check, AlertCircle, ExternalLink, Loader2 } from "lucide-react";

interface WalletConnectStepProps {
  walletAddress: string;
  onConnect: (address: string) => void;
  onNext: () => void;
  onBack: () => void;
}

export default function WalletConnectStep({
  walletAddress,
  onConnect,
  onNext,
  onBack,
}: WalletConnectStepProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleConnect = async () => {
    setError("");
    setLoading(true);

    try {
      const address = await connectWallet();
      onConnect(address);
    } catch (err: any) {
      setError(err.message || "Failed to connect wallet");
    } finally {
      setLoading(false);
    }
  };

  const handleDisconnect = () => {
    onConnect("");
  };

  return (
    <div className="space-y-6">
      <div className="card">
        <h2 className="font-heading text-xl font-semibold mb-2">Connect Wallet</h2>
        <p className="text-offwhite/50 text-sm">
          Connect your Ethereum wallet to link it with your verified identity.
        </p>
      </div>

      <div className="card text-center py-10">
        {walletAddress ? (
          <div className="space-y-4">
            <div className="flex justify-center">
              <div className="bg-primary/10 rounded-full p-4">
                <Check className="h-10 w-10 text-primary" />
              </div>
            </div>
            <p className="text-sm font-medium text-primary">Wallet Connected</p>
            <div className="bg-dark border border-dark-border rounded-input p-3 mx-auto max-w-md">
              <p className="text-xs font-mono text-offwhite/60 break-all">
                {walletAddress}
              </p>
            </div>
            <button
              onClick={handleDisconnect}
              className="text-sm text-red-400 hover:text-red-300 transition-colors"
            >
              Disconnect & Reconnect
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex justify-center">
              <div className="bg-dark border border-dark-border rounded-full p-4">
                <Wallet className="h-10 w-10 text-offwhite/30" />
              </div>
            </div>

            {!isMetaMaskInstalled() ? (
              <div className="space-y-3">
                <p className="text-offwhite/50 text-sm">MetaMask is not installed</p>
                <a
                  href="https://metamask.io/download/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary inline-flex items-center gap-2 text-sm"
                >
                  Install MetaMask <ExternalLink className="h-4 w-4" />
                </a>
              </div>
            ) : (
              <div className="space-y-3">
                <p className="text-offwhite/50 text-sm">
                  Click below to connect your MetaMask wallet
                </p>
                <button
                  onClick={handleConnect}
                  disabled={loading}
                  className="btn-primary inline-flex items-center gap-2"
                >
                  {loading ? (
                    <Loader2 className="h-5 w-5 animate-spin" />
                  ) : (
                    <>
                      <Wallet className="h-5 w-5" />
                      Connect MetaMask
                    </>
                  )}
                </button>
              </div>
            )}

            {error && (
              <div className="flex items-center justify-center gap-2 text-red-400 text-sm">
                <AlertCircle className="h-4 w-4" />
                {error}
              </div>
            )}
          </div>
        )}
      </div>

      <div className="flex justify-between pt-2">
        <button onClick={onBack} className="btn-secondary">
          Back
        </button>
        <button onClick={onNext} className="btn-primary">
          {walletAddress ? "Continue" : "Skip for Now"}
        </button>
      </div>
    </div>
  );
}
