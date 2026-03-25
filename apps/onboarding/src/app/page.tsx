"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Layers,
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
  ArrowRight,
  ChevronDown,
  Sparkles,
  Zap,
} from "lucide-react";
import ScrollReveal from "@/components/animations/ScrollReveal";
import StaggerContainer, {
  StaggerItem,
} from "@/components/animations/StaggerContainer";
import AnimatedCounter from "@/components/animations/AnimatedCounter";
import FloatingParticles from "@/components/animations/FloatingParticles";
import GlowOrb from "@/components/animations/GlowOrb";

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
      {/* ══════════════ HERO SECTION ══════════════ */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden isolate">
        {/* Ambient Background */}
        <div className="absolute inset-0 bg-gradient-to-b from-primary/[0.04] via-transparent to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-20%,_rgba(5,160,73,0.12),_transparent)]" />
        <div className="absolute inset-0 grid-bg opacity-50" />
        <FloatingParticles />
        <GlowOrb
          color="primary"
          size={600}
          className="-top-40 left-1/2 -translate-x-1/2"
        />
        <GlowOrb
          color="blue"
          size={500}
          className="top-1/3 -left-40"
        />
        <GlowOrb
          color="blue"
          size={400}
          className="top-1/4 -right-32"
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32 relative z-10 w-full">
          <div className="text-center max-w-4xl mx-auto">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="flex justify-center mb-8"
            >
              <div className="inline-flex items-center gap-2 glass rounded-full px-5 py-2 text-xs font-medium text-primary">
                <Sparkles className="h-3.5 w-3.5" />
                <span>Trusted by Web3 gamers worldwide</span>
              </div>
            </motion.div>

            {/* Logo Icon */}
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.1, type: "spring", stiffness: 200 }}
              className="flex justify-center mb-8"
            >
              <div className="relative">
                <div className="bg-primary/10 border border-primary/20 rounded-2xl p-5 animate-glow-pulse">
                  <Layers className="h-14 w-14 text-primary" />
                </div>
                <div className="absolute -inset-3 bg-primary/5 rounded-3xl animate-ping-slow opacity-0" />
              </div>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="font-title text-5xl sm:text-7xl font-extrabold tracking-tight mb-6 leading-[1.1]"
            >
              Your Gateway to{" "}
              <span className="text-gradient">Web3 Gaming</span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.35 }}
              className="text-lg sm:text-xl text-offwhite/50 mb-4 font-body leading-relaxed max-w-2xl mx-auto"
            >
              Complete a quick identity verification, connect your wallet, and
              unlock access to our immersive Web3 gaming platform. Secure, fast,
              and seamless.
            </motion.p>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.45 }}
              className="text-sm text-offwhite/30 mb-12 font-body"
            >
              Trusted identity verification powering safer gaming for thousands
              of players worldwide.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Link
                href="/signup"
                className="btn-primary text-lg py-4 px-10 inline-flex items-center justify-center gap-2 group"
              >
                Get Started
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/login"
                className="btn-secondary text-lg py-4 px-10 inline-flex items-center justify-center"
              >
                I Have an Account
              </Link>
            </motion.div>

            {/* Stats Row */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.7 }}
              className="mt-20 grid grid-cols-3 gap-8 max-w-lg mx-auto"
            >
              {[
                { value: "99.9%", label: "Uptime SLA" },
                { value: "2min", label: "Avg. Verification" },
                { value: "256bit", label: "AES Encryption" },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <AnimatedCounter
                    value={stat.value}
                    className="text-2xl sm:text-3xl font-bold text-primary font-title block"
                  />
                  <div className="text-xs text-offwhite/35 mt-1.5 uppercase tracking-wider">
                    {stat.label}
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Scroll Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.6 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2"
          >
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <ChevronDown className="h-6 w-6 text-offwhite/20" />
            </motion.div>
          </motion.div>
        </div>
      </section>

      <div className="section-divider" />

      {/* ══════════════ HOW IT WORKS ══════════════ */}
      <section className="py-24 relative">
        <div className="absolute inset-0 bg-dark-card/20" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <ScrollReveal>
            <div className="text-center mb-4">
              <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-1.5 text-xs font-medium text-primary mb-6">
                <Zap className="h-3.5 w-3.5" />
                Simple Process
              </div>
            </div>
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-center mb-4">
              How It Works
            </h2>
            <p className="text-center text-offwhite/40 mb-20 max-w-2xl mx-auto leading-relaxed">
              Three simple steps stand between you and a verified, secure gaming
              experience. The entire process takes under two minutes.
            </p>
          </ScrollReveal>

          <StaggerContainer
            staggerDelay={0.15}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {steps.map((step, i) => (
              <StaggerItem key={i}>
                <div className="card card-hover text-center group relative h-full">
                  {/* Connector line */}
                  {i < steps.length - 1 && (
                    <div className="hidden md:block absolute top-1/2 -right-4 w-8 h-[1px] bg-gradient-to-r from-primary/30 to-transparent" />
                  )}

                  {/* Step number badge */}
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <div className="bg-primary/10 border border-primary/30 rounded-full w-7 h-7 flex items-center justify-center">
                      <span className="text-xs font-bold text-primary">
                        {i + 1}
                      </span>
                    </div>
                  </div>

                  <div className="flex justify-center mb-6 mt-2">
                    <div className="bg-primary/[0.08] rounded-2xl p-5 group-hover:bg-primary/15 transition-all duration-500 group-hover:shadow-[0_0_40px_rgba(5,160,73,0.1)]">
                      <step.icon className="h-8 w-8 text-primary" />
                    </div>
                  </div>
                  <h3 className="font-heading text-xl font-semibold mb-3">
                    {step.title}
                  </h3>
                  <p className="text-offwhite/40 leading-relaxed text-sm">
                    {step.description}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      <div className="section-divider" />

      {/* ══════════════ WHY KYC MATTERS ══════════════ */}
      <section className="py-24 relative overflow-hidden">
        <GlowOrb
          color="primary"
          size={400}
          className="top-0 right-0 opacity-50"
        />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <ScrollReveal>
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-1.5 text-xs font-medium text-primary mb-6">
                Why It Matters
              </div>
              <h2 className="font-heading text-3xl sm:text-5xl font-bold mb-5">
                Why KYC Is{" "}
                <span className="text-gradient">Non-Negotiable</span> in Web3
                Gaming
              </h2>
              <p className="text-offwhite/40 max-w-3xl mx-auto leading-relaxed">
                The Web3 gaming ecosystem handles real money, digital assets, and
                sensitive user data. Without robust identity verification,
                platforms become breeding grounds for fraud, exploitation, and
                abuse.
              </p>
            </div>
          </ScrollReveal>

          <StaggerContainer
            staggerDelay={0.12}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {whyKycMatters.map((item, i) => (
              <StaggerItem key={i}>
                <div className="card card-hover group flex gap-5 h-full">
                  <div className="flex-shrink-0">
                    <div className="bg-primary/[0.08] rounded-xl p-3.5 group-hover:bg-primary/15 transition-all duration-500 group-hover:shadow-[0_0_30px_rgba(5,160,73,0.08)]">
                      <item.icon className="h-6 w-6 text-primary" />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-heading text-lg font-semibold mb-2 group-hover:text-primary transition-colors duration-300">
                      {item.title}
                    </h3>
                    <p className="text-offwhite/40 text-sm leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      <div className="section-divider" />

      {/* ══════════════ SECURITY SECTION ══════════════ */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-dark-card/20" />
        <GlowOrb
          color="blue"
          size={500}
          className="bottom-0 left-0 opacity-40"
        />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <ScrollReveal>
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-1.5 text-xs font-medium text-primary mb-6">
                <Lock className="h-3.5 w-3.5" />
                Security
              </div>
              <h2 className="font-heading text-3xl sm:text-5xl font-bold mb-5">
                Enterprise-Grade{" "}
                <span className="text-gradient">Security</span>
              </h2>
              <p className="text-offwhite/40 max-w-3xl mx-auto leading-relaxed">
                Your identity documents are the most sensitive data you can share
                online. We treat them with the highest level of security — here is
                exactly how we protect you.
              </p>
            </div>
          </ScrollReveal>

          <StaggerContainer
            staggerDelay={0.12}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {securityFeatures.map((feature, i) => (
              <StaggerItem key={i}>
                <div className="card card-hover group flex gap-5 h-full">
                  <div className="flex-shrink-0">
                    <div className="bg-primary/[0.08] rounded-xl p-3.5 group-hover:bg-primary/15 transition-all duration-500 group-hover:shadow-[0_0_30px_rgba(5,160,73,0.08)]">
                      <feature.icon className="h-6 w-6 text-primary" />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-heading text-lg font-semibold mb-2 group-hover:text-primary transition-colors duration-300">
                      {feature.title}
                    </h3>
                    <p className="text-offwhite/40 text-sm leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      <div className="section-divider" />

      {/* ══════════════ GAME ABUSE & CHILD PREVENTION ══════════════ */}
      <section className="py-24 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
            <div className="lg:col-span-2">
              <ScrollReveal direction="left">
                <div className="sticky top-24">
                  <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-1.5 text-xs font-medium text-red-400 border-red-500/20 mb-6">
                    <ShieldCheck className="h-3.5 w-3.5" />
                    Protection
                  </div>
                  <h2 className="font-heading text-3xl sm:text-4xl font-bold mb-4">
                    Game Abuse &{" "}
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-red-400 to-orange-400">
                      Child Prevention
                    </span>
                  </h2>
                  <p className="text-offwhite/40 leading-relaxed mb-6">
                    Online gaming without identity verification is an open door
                    for exploitation. From financial fraud to underage gambling,
                    the risks are severe and growing.
                  </p>
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.3 }}
                    className="card bg-red-500/[0.04] border-red-500/15 hover:border-red-500/30"
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <ShieldCheck className="h-5 w-5 text-red-400" />
                      <span className="font-heading font-semibold text-sm">
                        Did You Know?
                      </span>
                    </div>
                    <p className="text-offwhite/40 text-sm leading-relaxed">
                      According to UNICEF, over 1 in 3 internet users worldwide is
                      a child. In unregulated gaming platforms, minors are routinely
                      exposed to gambling mechanics, predatory microtransactions, and
                      unmoderated interactions with strangers.
                    </p>
                  </motion.div>
                </div>
              </ScrollReveal>
            </div>

            <div className="lg:col-span-3">
              <StaggerContainer staggerDelay={0.1} className="space-y-4">
                {abusePreventionPoints.map((point, i) => (
                  <StaggerItem key={i}>
                    <div className="card card-hover group">
                      <div className="flex items-start gap-4">
                        <div className="flex-shrink-0 w-9 h-9 bg-primary/[0.08] rounded-xl flex items-center justify-center text-primary font-bold text-sm group-hover:bg-primary/15 transition-all duration-500 group-hover:shadow-[0_0_20px_rgba(5,160,73,0.1)]">
                          {i + 1}
                        </div>
                        <div>
                          <h3 className="font-heading text-lg font-semibold mb-2 group-hover:text-primary transition-colors duration-300">
                            {point.title}
                          </h3>
                          <p className="text-offwhite/40 text-sm leading-relaxed">
                            {point.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  </StaggerItem>
                ))}
              </StaggerContainer>
            </div>
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* ══════════════ ABOUT / TEAM SECTION ══════════════ */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-dark-card/20" />
        <GlowOrb
          color="primary"
          size={300}
          className="bottom-20 right-20 opacity-30"
        />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <ScrollReveal>
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-1.5 text-xs font-medium text-primary mb-6">
                <Users className="h-3.5 w-3.5" />
                About Us
              </div>
              <h2 className="font-heading text-3xl sm:text-5xl font-bold mb-5">
                Meet the <span className="text-gradient">Team</span>
              </h2>
              <p className="text-offwhite/40 max-w-2xl mx-auto leading-relaxed">
                TrustLayer is a capstone project built by final-year students of{" "}
                <span className="text-offwhite/70 font-medium">
                  B.Tech CSE — Gaming Technology
                </span>{" "}
                at{" "}
                <span className="text-offwhite/70 font-medium">
                  VIT Bhopal University
                </span>
                . Our mission is to demonstrate how robust identity verification
                can make Web3 gaming safer, fairer, and compliant with global
                regulations.
              </p>
            </div>
          </ScrollReveal>

          <StaggerContainer
            staggerDelay={0.08}
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-5 mb-14"
          >
            {teamMembers.map((name, i) => (
              <StaggerItem key={i}>
                <motion.div
                  whileHover={{ y: -6, scale: 1.03 }}
                  transition={{ duration: 0.3 }}
                  className="card text-center group hover:border-primary/30 hover:shadow-[0_0_30px_rgba(5,160,73,0.06)]"
                >
                  <div className="flex justify-center mb-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-primary/20 to-primary/5 rounded-full flex items-center justify-center group-hover:from-primary/30 group-hover:to-primary/10 transition-all duration-500 group-hover:shadow-[0_0_30px_rgba(5,160,73,0.15)]">
                      <span className="text-primary font-title text-xl font-bold">
                        {name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </span>
                    </div>
                  </div>
                  <h3 className="font-heading text-sm font-semibold">
                    {name}
                  </h3>
                </motion.div>
              </StaggerItem>
            ))}
          </StaggerContainer>

          <StaggerContainer
            staggerDelay={0.1}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {[
              {
                icon: GraduationCap,
                title: "Program",
                text: "B.Tech CSE — Gaming Technology",
              },
              {
                icon: Users,
                title: "Institution",
                text: "VIT Bhopal University",
              },
              {
                icon: Github,
                title: "Project Type",
                text: "Capstone / Final Year Project",
              },
            ].map((item, i) => (
              <StaggerItem key={i}>
                <div className="card card-hover text-center group">
                  <item.icon className="h-8 w-8 text-primary mx-auto mb-3 group-hover:scale-110 transition-transform duration-300" />
                  <h4 className="font-heading font-semibold mb-1">
                    {item.title}
                  </h4>
                  <p className="text-offwhite/40 text-sm">{item.text}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      <div className="section-divider" />

      {/* ══════════════ CTA SECTION ══════════════ */}
      <section className="py-24 relative overflow-hidden">
        <GlowOrb
          color="primary"
          size={500}
          className="top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <ScrollReveal>
            <motion.div
              whileHover={{ scale: 1.01 }}
              transition={{ duration: 0.3 }}
              className="card bg-gradient-to-br from-primary/[0.08] via-dark-card/80 to-transparent border-primary/20 hover:border-primary/30 py-14 px-8 sm:px-14 relative overflow-hidden"
            >
              {/* Decorative grid in CTA */}
              <div className="absolute inset-0 grid-bg opacity-30" />

              <div className="relative z-10">
                <motion.div
                  animate={{ rotate: [0, 5, -5, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="inline-block mb-6"
                >
                  <Layers className="h-12 w-12 text-primary" />
                </motion.div>
                <h2 className="font-heading text-3xl sm:text-4xl font-bold mb-4">
                  Ready to Get Verified?
                </h2>
                <p className="text-offwhite/40 mb-10 max-w-xl mx-auto leading-relaxed">
                  Join the next generation of verified Web3 gamers. The process is
                  quick, your data is secure, and a world of gaming awaits on the
                  other side.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link
                    href="/signup"
                    className="btn-primary text-lg py-4 px-10 inline-flex items-center justify-center gap-2 group"
                  >
                    Create Account
                    <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                  <Link
                    href="/login"
                    className="btn-secondary text-lg py-4 px-10 inline-flex items-center justify-center"
                  >
                    Sign In
                  </Link>
                </div>
              </div>
            </motion.div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
