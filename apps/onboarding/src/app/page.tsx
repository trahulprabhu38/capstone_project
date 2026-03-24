import Link from "next/link";
import {
  Shield,
  FileCheck,
  Wallet,
  Gamepad2,
  Lock,
  Eye,
  UserCheck,
  AlertTriangle,
  Baby,
  Scale,
  ShieldCheck,
  Fingerprint,
  ServerCrash,
  Users,
  GraduationCap,
  Github,
} from "lucide-react";

const steps = [
  {
    icon: FileCheck,
    title: "Verify Identity",
    description:
      "Upload your government-issued ID and a live selfie. Our AI-powered system cross-checks documents for authenticity and matches your face to prevent impersonation.",
  },
  {
    icon: Wallet,
    title: "Connect Wallet",
    description:
      "Securely link your MetaMask or any Web3 wallet. Wallet binding ensures every in-game transaction is traceable to a verified, real-world identity.",
  },
  {
    icon: Gamepad2,
    title: "Start Playing",
    description:
      "Once approved, unlock the full Web3 gaming experience — trade assets, earn rewards, and play in a safe, cheat-free environment.",
  },
];

const whyKycMatters = [
  {
    icon: UserCheck,
    title: "Prevents Identity Fraud",
    description:
      "Without KYC, bad actors create hundreds of fake accounts to exploit reward systems, manipulate in-game economies, and launder money through digital assets. KYC ties every account to a verified real-world identity.",
  },
  {
    icon: Baby,
    title: "Child Safety & Age Verification",
    description:
      "Many Web3 games involve real-money transactions and mature content. KYC enforces strict age-gating so minors cannot access gambling mechanics, violent content, or financial instruments unsuitable for their age.",
  },
  {
    icon: AlertTriangle,
    title: "Stops Game Abuse & Exploits",
    description:
      "Multi-accounting, bot farming, and reward exploitation cost gaming platforms millions. When every player is KYC-verified, banned users cannot simply create a new account — their identity is permanently flagged.",
  },
  {
    icon: Scale,
    title: "Regulatory Compliance",
    description:
      "Governments worldwide are tightening regulations around digital assets and online gaming. KYC ensures the platform complies with AML (Anti-Money Laundering) and CFT (Combating the Financing of Terrorism) laws, avoiding hefty fines and legal shutdowns.",
  },
];

const securityFeatures = [
  {
    icon: Lock,
    title: "End-to-End Encryption",
    description:
      "All documents and personal data are encrypted in transit (TLS 1.3) and at rest (AES-256). Even if storage is breached, your data remains unreadable without the decryption keys.",
  },
  {
    icon: Fingerprint,
    title: "JWT-Based Authentication",
    description:
      "Stateless JSON Web Tokens with short-lived access tokens (15 min) and secure refresh rotation prevent session hijacking. No passwords are ever stored in plaintext — only bcrypt hashes.",
  },
  {
    icon: Eye,
    title: "Privacy-First Architecture",
    description:
      "Documents are stored in isolated AWS S3 buckets with time-limited presigned URLs. Admins can view documents only through the platform — no permanent download links are ever generated.",
  },
  {
    icon: ServerCrash,
    title: "Rate Limiting & Brute-Force Protection",
    description:
      "API endpoints are protected with intelligent rate limiting, request sanitization, and helmet security headers. Automated attacks and brute-force login attempts are blocked at the infrastructure level.",
  },
];

const abusePreventionPoints = [
  {
    title: "Multi-Account Detection",
    description:
      "Since each account requires a unique government ID, creating multiple accounts becomes impossible. This eliminates bot farms, smurf accounts, and coordinated market manipulation schemes.",
  },
  {
    title: "Real-Money Transaction Safety",
    description:
      "Web3 games involve NFTs, tokens, and crypto that have real monetary value. KYC creates an audit trail for every financial transaction, deterring fraud, chargebacks, and money laundering.",
  },
  {
    title: "Underage Gambling Prevention",
    description:
      "Loot boxes, token staking, and play-to-earn models can constitute gambling. Age-verified KYC ensures only adults can participate in these financial mechanics, protecting children from addictive spending patterns.",
  },
  {
    title: "Toxic Behavior Accountability",
    description:
      "When players know their real identity is linked, instances of harassment, hate speech, and cheating drop dramatically. Permanent bans actually mean something because re-registration requires a new verified identity.",
  },
  {
    title: "Asset Theft Recovery",
    description:
      "If in-game assets or crypto are stolen, KYC records enable platforms to cooperate with law enforcement for recovery. Anonymous platforms offer zero recourse to victims.",
  },
];

const teamMembers = [
  "Abhishek Gupta",
  "Harsh Raj",
  "Devansh",
  "Utkarsh",
  "Karan Verma",
];

export default function LandingPage() {
  return (
    <div className="relative">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32 relative">
          <div className="text-center max-w-3xl mx-auto">
            <div className="flex justify-center mb-6">
              <div className="bg-primary/10 border border-primary/20 rounded-full p-4 glow-primary">
                <Shield className="h-12 w-12 text-primary" />
              </div>
            </div>
            <h1 className="font-title text-4xl sm:text-6xl font-extrabold tracking-tight mb-6">
              Your Gateway to{" "}
              <span className="text-primary">Web3 Gaming</span>
            </h1>
            <p className="text-lg sm:text-xl text-offwhite/60 mb-4 font-body leading-relaxed">
              Complete a quick identity verification, connect your wallet, and
              unlock access to our immersive Web3 gaming platform. Secure, fast,
              and seamless.
            </p>
            <p className="text-sm text-offwhite/40 mb-10 font-body">
              Trusted identity verification powering safer gaming for thousands
              of players worldwide.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/signup" className="btn-primary text-lg py-4 px-10">
                Get Started
              </Link>
              <Link href="/login" className="btn-secondary text-lg py-4 px-10">
                I Have an Account
              </Link>
            </div>

            <div className="mt-16 grid grid-cols-3 gap-8 max-w-md mx-auto">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary font-title">99.9%</div>
                <div className="text-xs text-offwhite/40 mt-1">Uptime SLA</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary font-title">&lt;2min</div>
                <div className="text-xs text-offwhite/40 mt-1">Avg. Verification</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary font-title">AES-256</div>
                <div className="text-xs text-offwhite/40 mt-1">Encryption</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-dark-card/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-heading text-3xl font-bold text-center mb-4">
            How It Works
          </h2>
          <p className="text-center text-offwhite/50 mb-16 max-w-2xl mx-auto">
            Three simple steps stand between you and a verified, secure gaming
            experience. The entire process takes under two minutes.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((step, i) => (
              <div
                key={i}
                className="card text-center group hover:border-primary/30 transition-colors relative"
              >
                {i < steps.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 -right-4 w-8 h-[2px] bg-primary/20" />
                )}
                <div className="flex justify-center mb-6">
                  <div className="bg-primary/10 rounded-full p-4 group-hover:bg-primary/20 transition-colors">
                    <step.icon className="h-8 w-8 text-primary" />
                  </div>
                </div>
                <div className="text-xs font-semibold text-primary mb-2 uppercase tracking-wider">
                  Step {i + 1}
                </div>
                <h3 className="font-heading text-xl font-semibold mb-3">
                  {step.title}
                </h3>
                <p className="text-offwhite/50 leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why KYC Matters */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-block bg-primary/10 border border-primary/20 rounded-full px-4 py-1 text-xs font-semibold text-primary uppercase tracking-wider mb-4">
              Why It Matters
            </div>
            <h2 className="font-heading text-3xl sm:text-4xl font-bold mb-4">
              Why KYC Is{" "}
              <span className="text-primary">Non-Negotiable</span> in Web3
              Gaming
            </h2>
            <p className="text-offwhite/50 max-w-3xl mx-auto leading-relaxed">
              The Web3 gaming ecosystem handles real money, digital assets, and
              sensitive user data. Without robust identity verification,
              platforms become breeding grounds for fraud, exploitation, and
              abuse. Here&apos;s why every serious platform needs KYC.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {whyKycMatters.map((item, i) => (
              <div
                key={i}
                className="card group hover:border-primary/30 transition-colors flex gap-5"
              >
                <div className="flex-shrink-0">
                  <div className="bg-primary/10 rounded-xl p-3 group-hover:bg-primary/20 transition-colors">
                    <item.icon className="h-6 w-6 text-primary" />
                  </div>
                </div>
                <div>
                  <h3 className="font-heading text-lg font-semibold mb-2">
                    {item.title}
                  </h3>
                  <p className="text-offwhite/50 text-sm leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Security Section */}
      <section className="py-20 bg-dark-card/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-block bg-primary/10 border border-primary/20 rounded-full px-4 py-1 text-xs font-semibold text-primary uppercase tracking-wider mb-4">
              Security
            </div>
            <h2 className="font-heading text-3xl sm:text-4xl font-bold mb-4">
              Enterprise-Grade <span className="text-primary">Security</span>
            </h2>
            <p className="text-offwhite/50 max-w-3xl mx-auto leading-relaxed">
              Your identity documents are the most sensitive data you can share
              online. We treat them with the highest level of security — here is
              exactly how we protect you.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {securityFeatures.map((feature, i) => (
              <div
                key={i}
                className="card group hover:border-primary/30 transition-colors flex gap-5"
              >
                <div className="flex-shrink-0">
                  <div className="bg-primary/10 rounded-xl p-3 group-hover:bg-primary/20 transition-colors">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                </div>
                <div>
                  <h3 className="font-heading text-lg font-semibold mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-offwhite/50 text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Game Abuse & Child Prevention */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
            <div className="lg:col-span-2">
              <div className="sticky top-24">
                <div className="inline-block bg-red-500/10 border border-red-500/20 rounded-full px-4 py-1 text-xs font-semibold text-red-400 uppercase tracking-wider mb-4">
                  Protection
                </div>
                <h2 className="font-heading text-3xl sm:text-4xl font-bold mb-4">
                  Game Abuse &{" "}
                  <span className="text-red-400">Child Prevention</span>
                </h2>
                <p className="text-offwhite/50 leading-relaxed mb-6">
                  Online gaming without identity verification is an open door
                  for exploitation. From financial fraud to underage gambling,
                  the risks are severe and growing. KYCGate addresses every
                  major threat vector.
                </p>
                <div className="card bg-red-500/5 border-red-500/20">
                  <div className="flex items-center gap-3 mb-3">
                    <ShieldCheck className="h-5 w-5 text-red-400" />
                    <span className="font-heading font-semibold text-sm">
                      Did You Know?
                    </span>
                  </div>
                  <p className="text-offwhite/50 text-sm leading-relaxed">
                    According to UNICEF, over 1 in 3 internet users worldwide is
                    a child. In unregulated gaming platforms, minors are routinely
                    exposed to gambling mechanics, predatory microtransactions, and
                    unmoderated interactions with strangers.
                  </p>
                </div>
              </div>
            </div>
            <div className="lg:col-span-3 space-y-4">
              {abusePreventionPoints.map((point, i) => (
                <div
                  key={i}
                  className="card group hover:border-primary/30 transition-colors"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center text-primary font-bold text-sm group-hover:bg-primary/20 transition-colors">
                      {i + 1}
                    </div>
                    <div>
                      <h3 className="font-heading text-lg font-semibold mb-2">
                        {point.title}
                      </h3>
                      <p className="text-offwhite/50 text-sm leading-relaxed">
                        {point.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* About / Team Section */}
      <section className="py-20 bg-dark-card/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-block bg-primary/10 border border-primary/20 rounded-full px-4 py-1 text-xs font-semibold text-primary uppercase tracking-wider mb-4">
              About Us
            </div>
            <h2 className="font-heading text-3xl sm:text-4xl font-bold mb-4">
              Meet the <span className="text-primary">Team</span>
            </h2>
            <p className="text-offwhite/50 max-w-2xl mx-auto leading-relaxed">
              KYCGate is a capstone project built by final-year students of{" "}
              <span className="text-offwhite font-medium">
                B.Tech CSE — Gaming Technology
              </span>{" "}
              at{" "}
              <span className="text-offwhite font-medium">
                VIT, Bhopal University
              </span>
              . Our mission is to demonstrate how robust identity verification
              can make Web3 gaming safer, fairer, and compliant with global
              regulations.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 mb-12">
            {teamMembers.map((name, i) => (
              <div
                key={i}
                className="card text-center group hover:border-primary/30 transition-colors"
              >
                <div className="flex justify-center mb-4">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <span className="text-primary font-title text-xl font-bold">
                      {name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </span>
                  </div>
                </div>
                <h3 className="font-heading text-base font-semibold">
                  {name}
                </h3>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="card text-center">
              <GraduationCap className="h-8 w-8 text-primary mx-auto mb-3" />
              <h4 className="font-heading font-semibold mb-1">Program</h4>
              <p className="text-offwhite/50 text-sm">
                B.Tech CSE — Gaming Technology
              </p>
            </div>
            <div className="card text-center">
              <Users className="h-8 w-8 text-primary mx-auto mb-3" />
              <h4 className="font-heading font-semibold mb-1">Institution</h4>
              <p className="text-offwhite/50 text-sm">
                VIT, Bhopal University
              </p>
            </div>
            <div className="card text-center">
              <Github className="h-8 w-8 text-primary mx-auto mb-3" />
              <h4 className="font-heading font-semibold mb-1">Project Type</h4>
              <p className="text-offwhite/50 text-sm">
                Capstone / Final Year Project
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="card bg-gradient-to-br from-primary/10 to-transparent border-primary/20">
            <Shield className="h-10 w-10 text-primary mx-auto mb-4" />
            <h2 className="font-heading text-2xl sm:text-3xl font-bold mb-4">
              Ready to Get Verified?
            </h2>
            <p className="text-offwhite/50 mb-8 max-w-xl mx-auto leading-relaxed">
              Join the next generation of verified Web3 gamers. The process is
              quick, your data is secure, and a world of gaming awaits on the
              other side.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/signup" className="btn-primary text-lg py-4 px-10">
                Create Account
              </Link>
              <Link href="/login" className="btn-secondary text-lg py-4 px-10">
                Sign In
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
