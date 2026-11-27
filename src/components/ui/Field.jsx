import { forwardRef, useId } from "react";

const control =
  "block w-full rounded-[var(--radius-sm)] border-[1.5px] bg-field text-ink placeholder:text-placeholder transition-[border-color,box-shadow] duration-150 focus:outline-none focus-visible:outline-none disabled:opacity-60";

const controlState = (error) =>
  error
    ? "border-crimson focus:shadow-[0_0_0_3px_var(--color-crimson-wash)]"
    : "border-ink/25 hover:border-ink/45 focus:border-ink focus:shadow-[0_0_0_3px_var(--color-gold-wash)]";

export function FieldLabel({ htmlFor, children, optional }) {
  return (
    <label htmlFor={htmlFor} className="mb-1.5 flex items-baseline justify-between gap-2">
      <span className="caps text-[0.78rem] text-ink-soft">{children}</span>
      {optional && <span className="text-xs text-muted">Optional</span>}
    </label>
  );
}

function FieldMessage({ id, error, hint }) {
  if (error) {
    return (
      <p id={id} role="alert" className="mt-1.5 text-sm text-crimson">
        {typeof error === "string" ? error : error.message}
      </p>
    );
  }
  if (hint) {
    return (
      <p id={id} className="mt-1.5 text-sm text-muted">
        {hint}
      </p>
    );
  }
  return null;
}

export const Input = forwardRef(function Input(
  { label, id, error, hint, icon: Icon, prefix, optional, className = "", type = "text", ...props },
  ref
) {
  const auto = useId();
  const inputId = id || auto;
  const msgId = `${inputId}-msg`;
  return (
    <div className={`w-full ${className}`}>
      {label && (
        <FieldLabel htmlFor={inputId} optional={optional}>
          {label}
        </FieldLabel>
      )}
      <div className="relative">
        {Icon && (
          <Icon
            aria-hidden="true"
            className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-muted"
          />
        )}
        {prefix && (
          <span
            aria-hidden="true"
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 font-medium text-muted"
          >
            {prefix}
          </span>
        )}
        <input
          id={inputId}
          ref={ref}
          type={type}
          aria-invalid={error ? true : undefined}
          aria-describedby={error || hint ? msgId : undefined}
          className={`${control} ${controlState(error)} h-11 ${Icon || prefix ? "pl-9" : "pl-3"} pr-3 text-[0.975rem]`}
          {...props}
        />
      </div>
      <FieldMessage id={msgId} error={error} hint={hint} />
    </div>
  );
});

export const Textarea = forwardRef(function Textarea(
  { label, id, error, hint, optional, className = "", rows = 4, ...props },
  ref
) {
  const auto = useId();
  const inputId = id || auto;
  const msgId = `${inputId}-msg`;
  return (
    <div className={`w-full ${className}`}>
      {label && (
        <FieldLabel htmlFor={inputId} optional={optional}>
          {label}
        </FieldLabel>
      )}
      <textarea
        id={inputId}
        ref={ref}
        rows={rows}
        aria-invalid={error ? true : undefined}
        aria-describedby={error || hint ? msgId : undefined}
        className={`${control} ${controlState(error)} resize-y px-3 py-2.5 text-[0.975rem] leading-relaxed`}
        {...props}
      />
      <FieldMessage id={msgId} error={error} hint={hint} />
    </div>
  );
});

export const Select = forwardRef(function Select(
  { label, id, error, hint, className = "", children, ...props },
  ref
) {
  const auto = useId();
  const inputId = id || auto;
  const msgId = `${inputId}-msg`;
  return (
    <div className={`w-full ${className}`}>
      {label && <FieldLabel htmlFor={inputId}>{label}</FieldLabel>}
      <div className="relative">
        <select
          id={inputId}
          ref={ref}
          aria-invalid={error ? true : undefined}
          aria-describedby={error || hint ? msgId : undefined}
          className={`${control} ${controlState(error)} h-11 appearance-none pl-3 pr-9 text-[0.975rem]`}
          {...props}
        >
          {children}
        </select>
        <svg
          aria-hidden="true"
          viewBox="0 0 12 8"
          className="pointer-events-none absolute right-3 top-1/2 h-2 w-3 -translate-y-1/2 text-ink"
        >
          <path d="M1 1.5 6 6.5l5-5" fill="none" stroke="currentColor" strokeWidth="1.8" />
        </svg>
      </div>
      <FieldMessage id={msgId} error={error} hint={hint} />
    </div>
  );
});

export default Input;
