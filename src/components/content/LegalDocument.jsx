import Link from "next/link";

/** Long-form legal text: a contents column and a readable measure. */
export default function LegalDocument({ title, updated, intro, sections, question }) {
  const slug = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  return (
    <div className="mx-auto max-w-[1280px] px-5 pt-10 sm:px-8 lg:pt-14">
      <header className="border-b-[3px] border-ink pb-6">
        <h1 className="display text-[3.4rem] sm:text-[4.6rem]">{title}</h1>
        <p className="caps mt-2 text-[0.8rem] text-muted">Last updated {updated}</p>
      </header>

      <div className="mt-10 grid gap-12 lg:grid-cols-[240px_1fr]">
        <nav aria-label="Sections" className="hidden lg:block">
          <ol className="sticky top-24 space-y-2 border-l-[3px] border-ink pl-4 text-[0.92rem]">
            {sections.map((s) => (
              <li key={s.title}>
                <a href={`#${slug(s.title)}`} className="text-ink-soft hover:text-crimson">
                  {s.title.replace(/^\d+\.\s*/, "")}
                </a>
              </li>
            ))}
          </ol>
        </nav>

        <div className="max-w-[70ch]">
          <p className="text-[1.15rem] leading-relaxed">{intro}</p>
          {sections.map((s) => (
            <section key={s.title} id={slug(s.title)} className="mt-10 scroll-mt-24">
              <h2 className="display text-[1.9rem]">{s.title}</h2>
              <ul className="mt-3 list-disc space-y-2.5 pl-5 leading-relaxed text-ink-soft marker:text-crimson">
                {s.content.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </section>
          ))}
          <p className="mt-12 border-t border-ink pt-5 text-ink-soft">
            {question}{" "}
            <Link href="/contact" className="ink-link font-semibold text-ink">
              Contact us
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
