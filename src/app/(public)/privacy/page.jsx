import LegalDocument from "@/components/content/LegalDocument";

export const metadata = { title: "Privacy policy" };

const sections = [
  {
    title: "1. Information We Collect",
    content: [
      "Account Information: When you create an account, we collect your name, email address, and password (stored in encrypted form).",
      "Profile Data: Optionally, you may provide a bio and avatar image.",
      "Trip Data: Destinations, budgets, travel dates, itineraries, expenses, and notes you create or generate through our AI tools.",
      "Usage Data: Pages visited, features used, interactions with the AI planner and chat assistant, and diagnostic logs.",
      "Device & Browser Data: IP address, browser type, operating system, and referring URLs collected automatically for security and analytics.",
    ],
  },
  {
    title: "2. How We Use Your Information",
    content: [
      "To provide, maintain, and improve the VoyageAI platform and its features.",
      "To generate personalized travel itineraries and recommendations using AI.",
      "To authenticate your account and protect against unauthorized access.",
      "To communicate with you about updates, support, and promotional offers (with opt-out available).",
      "To analyze usage patterns and improve user experience.",
      "To comply with legal obligations and enforce our terms.",
    ],
  },
  {
    title: "3. AI & Data Processing",
    content: [
      "VoyageAI uses Google Gemini AI to generate itineraries and respond to chat queries. Your trip details (destination, budget, preferences) are sent to the AI service for processing.",
      "AI-generated content is not used to train external models. Your data is processed ephemerally and is not retained by the AI provider beyond the request lifecycle.",
      "You retain full ownership of all trips and itineraries you create. You may delete them at any time.",
    ],
  },
  {
    title: "4. Data Sharing",
    content: [
      "We do not sell your personal data to third parties.",
      "We may share anonymized, aggregated data (e.g., popular destinations) that cannot identify you personally.",
      "Service providers who assist in hosting, analytics, and AI processing may have access to data strictly to perform their functions, under contractual obligations of confidentiality.",
      "We may disclose data if required by law, legal process, or to protect the rights and safety of VoyageAI and its users.",
    ],
  },
  {
    title: "5. Data Security",
    content: [
      "All data is encrypted in transit (TLS/HTTPS) and at rest.",
      "Passwords are hashed using bcrypt before storage.",
      "Authentication tokens are managed via secure HttpOnly cookies.",
      "We implement rate limiting, input validation, and security headers (Helmet) across all API endpoints.",
      "While we take reasonable measures, no system is 100% secure. We encourage strong passwords and prompt reporting of suspicious activity.",
    ],
  },
  {
    title: "6. Cookies & Tracking",
    content: [
      "We use HttpOnly cookies for authentication session management. These are essential for the platform to function and are not used for advertising.",
      "We do not use third-party advertising cookies or cross-site tracking.",
      "Browser local storage is not used for sensitive authentication data.",
    ],
  },
  {
    title: "7. Your Rights",
    content: [
      "Access: You may request a copy of the personal data we hold about you.",
      "Correction: You may update your profile information at any time through your account settings.",
      "Deletion: You may delete your account and associated data by contacting us. Trip data will be permanently removed.",
      "Export: You may request an export of your trip data in a portable format.",
      "Opt-Out: You may unsubscribe from promotional emails at any time.",
    ],
  },
  {
    title: "8. Data Retention",
    content: [
      "Account data is retained as long as your account is active.",
      "Trip data is retained until you choose to delete it.",
      "Upon account deletion, all personal data and trip data are permanently removed within 30 days.",
      "Anonymized analytics data may be retained indefinitely as it cannot be linked back to you.",
    ],
  },
  {
    title: "9. Children's Privacy",
    content: [
      "VoyageAI is not intended for users under the age of 13. We do not knowingly collect data from children. If we become aware that a child has provided us with personal data, we will take steps to delete it promptly.",
    ],
  },
  {
    title: "10. Changes to This Policy",
    content: [
      "We may update this Privacy Policy from time to time. Material changes will be communicated via email or a prominent notice on the platform.",
      "The 'Last updated' date at the top of this page reflects the most recent revision.",
    ],
  },
  {
    title: "11. Contact Us",
    content: [
      "If you have questions or concerns about this Privacy Policy or our data practices, please reach out to us at privacy@voyageai.com or visit our Contact page.",
    ],
  },
];

export default function PrivacyPage() {
  return (
    <LegalDocument
      title="Privacy policy"
      updated="July 20, 2026"
      intro="At VoyageAI, your privacy is fundamental to us. This Privacy Policy explains how we collect, use, protect, and handle your personal information when you use our AI-powered travel planning platform."
      sections={sections}
      question="Questions about your privacy?"
    />
  );
}
