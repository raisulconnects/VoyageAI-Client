"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const sections = [
  {
    title: "1. Acceptance of Terms",
    content: [
      "By accessing or using VoyageAI, you agree to be bound by these Terms of Service. If you do not agree, please do not use the platform.",
      "We reserve the right to modify these terms at any time. Material changes will be communicated via email or a prominent notice on the platform.",
      "Your continued use of VoyageAI after changes constitutes acceptance of the updated terms.",
    ],
  },
  {
    title: "2. Account Registration",
    content: [
      "You must be at least 13 years old to create an account.",
      "You are responsible for maintaining the confidentiality of your account credentials.",
      "You agree to provide accurate and complete information during registration.",
      "You are solely responsible for all activity that occurs under your account.",
      "You must notify us immediately of any unauthorized use of your account.",
    ],
  },
  {
    title: "3. Use of the Platform",
    content: [
      "VoyageAI provides AI-powered travel planning tools, including itinerary generation, destination exploration, and travel chat assistance.",
      "AI-generated content is provided for informational purposes and should be verified before making travel decisions.",
      "You may not use the platform for any unlawful purpose, to harass others, or to attempt to gain unauthorized access to any system.",
      "Automated access (scraping, bots) is prohibited without prior written consent.",
    ],
  },
  {
    title: "4. User Content",
    content: [
      "You retain ownership of all trips, notes, itineraries, and other content you create on VoyageAI.",
      "By creating content, you grant us a limited license to store, process, and display it as necessary to provide the service.",
      "You may delete your content at any time through the platform interface.",
      "We do not claim ownership over AI-generated itineraries created through your prompts.",
    ],
  },
  {
    title: "5. Intellectual Property",
    content: [
      "The VoyageAI platform, including its design, code, branding, and AI prompts, is owned by VoyageAI and protected by intellectual property laws.",
      "You may not copy, modify, distribute, or reverse-engineer any part of the platform without written permission.",
      "Third-party services (Google Gemini AI, image hosting providers) are subject to their own terms.",
    ],
  },
  {
    title: "6. Payment & Subscriptions",
    content: [
      "VoyageAI currently offers free access to its core features.",
      "If premium features are introduced in the future, additional terms will apply and will be communicated before any charges.",
      "Free-tier usage may be subject to rate limits and usage quotas.",
    ],
  },
  {
    title: "7. Limitation of Liability",
    content: [
      "VoyageAI is provided 'as is' without warranties of any kind, express or implied.",
      "We are not responsible for any travel decisions made based on AI-generated recommendations.",
      "In no event shall VoyageAI be liable for any indirect, incidental, special, or consequential damages.",
      "Our total liability shall not exceed the amount you paid us in the 12 months preceding the claim (which is $0 for free-tier users).",
    ],
  },
  {
    title: "8. Termination",
    content: [
      "You may delete your account at any time through your profile settings.",
      "We may suspend or terminate your account if you violate these terms, with or without prior notice.",
      "Upon termination, your right to use the platform ceases. We will retain your data for up to 30 days to allow for account recovery.",
    ],
  },
  {
    title: "9. Dispute Resolution",
    content: [
      "Any disputes arising from these terms shall be resolved through good-faith negotiation first.",
      "If unresolved, disputes shall be submitted to binding arbitration under applicable local laws.",
      "These terms are governed by the laws of the jurisdiction in which VoyageAI operates.",
    ],
  },
  {
    title: "10. Contact",
    content: [
      "For questions about these Terms of Service, please contact us at legal@voyageai.com or visit our Contact page.",
    ],
  },
];

export default function TermsPage() {
  return (
    <div className="py-24 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-16"
      >
        <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">
          Terms of <span className="text-gradient">Service</span>
        </h1>
        <p className="text-slate-400">Last updated: July 20, 2026</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="glass-card p-8 md:p-12 space-y-10"
      >
        <p className="text-slate-300 leading-relaxed">
          Welcome to VoyageAI. These Terms of Service govern your use of our AI-powered travel
          planning platform. Please read them carefully before using the service.
        </p>

        {sections.map((section, idx) => (
          <div key={idx}>
            <h2 className="text-xl font-bold text-white mb-4">{section.title}</h2>
            <ul className="space-y-3">
              {section.content.map((item, i) => (
                <li key={i} className="text-slate-300 leading-relaxed pl-4 border-l border-white/10">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="mt-12 text-center"
      >
        <p className="text-slate-400 mb-4">
          Have questions about our terms?
        </p>
        <Link
          href="/contact"
          className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-medium rounded-xl transition-all shadow-[0_0_15px_rgba(37,99,235,0.4)] hover:shadow-[0_0_25px_rgba(37,99,235,0.6)]"
        >
          Contact Us
        </Link>
      </motion.div>
    </div>
  );
}
