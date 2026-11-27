export default function PageHeader({ title, description, actions, children, className = "" }) {
  return (
    <header className={`border-b-[3px] border-ink pb-5 ${className}`}>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div className="min-w-0">
          <h1 className="display text-[2.6rem] text-ink sm:text-[3.25rem]">{title}</h1>
          {description && <p className="mt-2 max-w-[60ch] text-[1.02rem] text-ink-soft">{description}</p>}
        </div>
        {actions && <div className="flex shrink-0 flex-wrap items-center gap-2">{actions}</div>}
      </div>
      {children}
    </header>
  );
}

/** A titled region inside a page: caption heading over an ink rule. */
export function Region({ title, action, children, className = "", as: Tag = "section", id }) {
  return (
    <Tag className={className} aria-labelledby={id}>
      {(title || action) && (
        <div className="mb-4 flex items-end justify-between gap-3 border-b border-ink/80 pb-2">
          {title && (
            <h2 id={id} className="caps text-[0.95rem] text-ink">
              {title}
            </h2>
          )}
          {action}
        </div>
      )}
      {children}
    </Tag>
  );
}
