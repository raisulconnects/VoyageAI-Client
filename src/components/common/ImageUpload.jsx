"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { HiOutlinePhotograph, HiOutlineX } from "react-icons/hi";
import { toast } from "sonner";

const IMGBB_API_KEY = process.env.NEXT_PUBLIC_IMGBB_API_KEY;
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_TYPES = ["image/jpeg", "image/png", "image/webp"];

export default function ImageUpload({ value, onChange, label = "Cover Image" }) {
  const [preview, setPreview] = useState(value || "");
  const [uploading, setUploading] = useState(false);
  const inputRef = useRef(null);

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!ACCEPTED_TYPES.includes(file.type)) {
      toast.error("Please upload a JPG, PNG, or WebP image.");
      return;
    }

    if (file.size > MAX_FILE_SIZE) {
      toast.error("Image must be under 5MB.");
      return;
    }

    setUploading(true);

    try {
      const reader = new FileReader();
      reader.onload = async () => {
        const base64 = reader.result.split(",")[1];

        const formData = new URLSearchParams();
        formData.append("key", IMGBB_API_KEY);
        formData.append("image", base64);

        const res = await fetch("https://api.imgbb.com/1/upload", {
          method: "POST",
          body: formData,
        });

        const data = await res.json();

        if (data.success) {
          const url = data.data.url;
          setPreview(url);
          onChange(url);
        } else {
          toast.error("Failed to upload image. Please try again.");
        }
        setUploading(false);
      };

      reader.onerror = () => {
        toast.error("Failed to read file.");
        setUploading(false);
      };

      reader.readAsDataURL(file);
    } catch {
      toast.error("Upload failed. Please try again.");
      setUploading(false);
    }
  };

  const handleRemove = () => {
    setPreview("");
    onChange("");
    if (inputRef.current) inputRef.current.value = "";
  };

  return (
    <div>
      <label className="block text-sm font-medium text-slate-300 mb-2">
        {label}
      </label>

      {preview ? (
        <div className="relative rounded-xl overflow-hidden border border-white/10 group">
          <div className="relative h-48 w-full">
            <Image
              src={preview}
              alt="Preview"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors" />
            <button
              type="button"
              onClick={handleRemove}
              className="absolute top-3 right-3 p-1.5 rounded-full bg-black/60 text-white hover:bg-red-600 transition-colors opacity-0 group-hover:opacity-100"
            >
              <HiOutlineX className="h-4 w-4" />
            </button>
          </div>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={uploading}
          className="w-full h-48 rounded-xl border-2 border-dashed border-white/10 hover:border-blue-500/50 bg-slate-900/50 flex flex-col items-center justify-center gap-3 transition-all hover:bg-slate-900/80 disabled:opacity-50"
        >
          {uploading ? (
            <div className="w-8 h-8 border-t-2 border-b-2 border-blue-500 rounded-full animate-spin" />
          ) : (
            <>
              <HiOutlinePhotograph className="h-10 w-10 text-slate-500" />
              <div className="text-center">
                <p className="text-sm font-medium text-slate-400">
                  Click to upload an image
                </p>
                <p className="text-xs text-slate-500 mt-1">
                  JPG, PNG, or WebP. Max 5MB.
                </p>
              </div>
            </>
          )}
        </button>
      )}

      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        onChange={handleFileChange}
        className="hidden"
      />
    </div>
  );
}
