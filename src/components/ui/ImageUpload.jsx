"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { HiOutlinePhotograph } from "react-icons/hi";
import { toast } from "sonner";
import Button, { InlineSpinner } from "./Button";
import { FieldLabel } from "./Field";

const IMGBB_API_KEY = process.env.NEXT_PUBLIC_IMGBB_API_KEY;
const MAX_FILE_SIZE = 5 * 1024 * 1024;
const ACCEPTED_TYPES = ["image/jpeg", "image/png", "image/webp"];

/** Uploads to imgbb and returns the hosted URL through onChange. */
export default function ImageUpload({ value, onChange, label = "Cover image", aspect = "aspect-[16/7]", compact = false }) {
  const [uploading, setUploading] = useState(false);
  const inputRef = useRef(null);
  const preview = value || "";

  const upload = (file) => {
    if (!ACCEPTED_TYPES.includes(file.type)) {
      toast.error("Use a JPG, PNG or WebP image.");
      return;
    }
    if (file.size > MAX_FILE_SIZE) {
      toast.error("That image is over 5 MB. Choose a smaller one.");
      return;
    }
    setUploading(true);
    const reader = new FileReader();
    reader.onload = async () => {
      try {
        const body = new URLSearchParams();
        body.append("key", IMGBB_API_KEY);
        body.append("image", reader.result.split(",")[1]);
        const res = await fetch("https://api.imgbb.com/1/upload", { method: "POST", body });
        const data = await res.json();
        if (data.success) onChange(data.data.url);
        else toast.error("The image host rejected the upload. Try another image.");
      } catch {
        toast.error("Upload failed. Check your connection and try again.");
      } finally {
        setUploading(false);
      }
    };
    reader.onerror = () => {
      toast.error("Couldn’t read that file.");
      setUploading(false);
    };
    reader.readAsDataURL(file);
  };

  const handleFile = (e) => {
    const file = e.target.files?.[0];
    if (file) upload(file);
  };

  const clear = () => {
    onChange("");
    if (inputRef.current) inputRef.current.value = "";
  };

  return (
    <div>
      {label && <FieldLabel optional>{label}</FieldLabel>}
      {preview ? (
        <div className={`relative w-full overflow-hidden border-[1.5px] border-ink ${compact ? "aspect-square" : aspect}`}>
          <Image src={preview} alt="Selected image" fill className="object-cover" sizes="(max-width: 768px) 100vw, 640px" />
          <div className="absolute bottom-2 right-2 flex gap-2">
            <Button type="button" size="sm" variant="ink" onClick={() => inputRef.current?.click()} loading={uploading}>
              Replace
            </Button>
            <Button type="button" size="sm" variant="ink" onClick={clear}>
              Remove
            </Button>
          </div>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={uploading}
          className={`flex w-full flex-col items-center justify-center gap-2 border-[1.5px] border-dashed border-ink/40 bg-field/60 px-4 text-center transition-colors hover:border-ink hover:bg-field disabled:opacity-60 ${compact ? "aspect-square" : aspect}`}
        >
          {uploading ? (
            <InlineSpinner className="h-6 w-6 text-crimson" />
          ) : (
            <HiOutlinePhotograph className="h-7 w-7 text-muted" aria-hidden="true" />
          )}
          <span className="caps text-[0.8rem] text-ink">{uploading ? "Uploading…" : "Choose an image"}</span>
          {!compact && <span className="text-sm text-muted">JPG, PNG or WebP, up to 5 MB</span>}
        </button>
      )}
      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        onChange={handleFile}
        className="sr-only"
        tabIndex={-1}
        aria-hidden="true"
      />
    </div>
  );
}
