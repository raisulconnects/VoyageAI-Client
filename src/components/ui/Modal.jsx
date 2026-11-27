"use client";

import { useEffect, useId, useRef } from "react";
import { HiOutlineX } from "react-icons/hi";
import Button from "./Button";

const FOCUSABLE =
  'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])';

/** Accessible dialog: labelled, focus-trapped, Esc to close, focus returned on close. */
export default function Modal({ isOpen, onClose, title, description, children, footer, size = "md" }) {
  const panelRef = useRef(null);
  const returnTo = useRef(null);
  const titleId = useId();
  const descId = useId();

  useEffect(() => {
    if (!isOpen) return;
    returnTo.current = document.activeElement;
    document.body.style.overflow = "hidden";
    const panel = panelRef.current;
    (panel?.querySelector("[data-autofocus]") || panel?.querySelector(FOCUSABLE))?.focus();

    const onKey = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "Tab" && panel) {
        const nodes = [...panel.querySelectorAll(FOCUSABLE)];
        if (!nodes.length) return;
        const first = nodes[0];
        const last = nodes[nodes.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
      returnTo.current?.focus?.();
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const width = size === "sm" ? "max-w-md" : size === "lg" ? "max-w-3xl" : "max-w-xl";

  return (
    <div className="fixed inset-0 z-[70] flex items-end justify-center p-0 sm:items-center sm:p-4">
      <div className="fade-up absolute inset-0 bg-ink/55" onClick={onClose} aria-hidden="true" />
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={description ? descId : undefined}
        className={`fade-up relative flex max-h-[92dvh] w-full ${width} flex-col border-[1.5px] border-ink bg-board shadow-[0_24px_60px_-20px_rgba(22,20,18,0.6)]`}
      >
        <div className="flex items-start justify-between gap-4 border-b-[3px] border-ink px-5 py-4 sm:px-6">
          <div>
            <h2 id={titleId} className="display text-[1.8rem]">
              {title}
            </h2>
            {description && (
              <p id={descId} className="mt-1 text-ink-soft">
                {description}
              </p>
            )}
          </div>
          <Button variant="ghost" size="icon-sm" onClick={onClose} aria-label="Close dialog">
            <HiOutlineX className="h-5 w-5" aria-hidden="true" />
          </Button>
        </div>
        {children && <div className="flex-1 overflow-y-auto px-5 py-5 sm:px-6">{children}</div>}
        {footer && (
          <div className="flex flex-wrap justify-end gap-2 border-t border-ink/20 px-5 py-4 sm:px-6">{footer}</div>
        )}
      </div>
    </div>
  );
}

export function ConfirmDialog({ isOpen, onClose, onConfirm, title, description, confirmLabel = "Delete", busy }) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      description={description}
      size="sm"
      footer={
        <>
          <Button variant="ghost" onClick={onClose} data-autofocus>
            Keep it
          </Button>
          <Button variant="primary" onClick={onConfirm} loading={busy}>
            {confirmLabel}
          </Button>
        </>
      }
    />
  );
}
