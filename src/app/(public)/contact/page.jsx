import Link from "next/link";
import { HiArrowRight, HiOutlineMail } from "react-icons/hi";

export const metadata = { title: "Contact" };

const TOPICS = [
  {
    q: "A plan looks wrong",
    a: "Open the trip in the planner and tell it what to fix, for example “day 2 has too much travel”. If the AI keeps getting it wrong, write to us with the destination.",
  },
  {
    q: "The planner says it’s busy",
    a: "Gemini is overloaded. VoyageAI already retries on lighter models; wait a minute and press Try again.",
  },
  {
    q: "Changing or deleting your data",
    a: "Edit your name, email and photo on your profile. Delete any trip from Trips → Manage. For account deletion, email us.",
  },
];

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-[1280px] px-5 pt-10 sm:px-8 lg:pt-14">
      <header className="border-b-[3px] border-ink pb-6">
        <h1 className="display text-[3.4rem] sm:text-[5rem]">Contact</h1>
        <p className="mt-3 max-w-[58ch] text-[1.1rem] text-ink-soft">
          Questions, bugs or a plan that went sideways. Email is the fastest way to reach us.
        </p>
      </header>

      <div className="mt-10 grid gap-12 lg:grid-cols-[1fr_1.3fr]">
        <a
          href="mailto:support@voyageai.com"
          className="group flex flex-col justify-between gap-10 border-[3px] border-ink bg-ink p-8 text-board transition-colors hover:bg-ink-soft"
        >
          <HiOutlineMail className="h-10 w-10 text-gold" aria-hidden="true" />
          <span>
            <span className="caps block text-[0.8rem] text-board/70">Email</span>
            <span className="display mt-1 flex items-center gap-3 break-all text-[1.45rem] sm:text-[2.4rem]">
              support@voyageai.com
              <HiArrowRight aria-hidden="true" className="h-7 w-7 shrink-0 transition-transform group-hover:translate-x-1" />
            </span>
          </span>
        </a>

        <section aria-labelledby="topics-title">
          <h2 id="topics-title" className="caps border-b border-ink pb-2 text-[0.95rem]">
            Before you write
          </h2>
          <dl>
            {TOPICS.map((t) => (
              <div key={t.q} className="border-b border-ink/15 py-5">
                <dt className="display text-[1.6rem]">{t.q}</dt>
                <dd className="mt-1 max-w-[62ch] leading-relaxed text-ink-soft">{t.a}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-6 text-ink-soft">
            Looking for policies? Read the{" "}
            <Link href="/privacy" className="ink-link text-ink">
              privacy policy
            </Link>{" "}
            and{" "}
            <Link href="/terms" className="ink-link text-ink">
              terms
            </Link>
            .
          </p>
        </section>
      </div>
    </div>
  );
}
