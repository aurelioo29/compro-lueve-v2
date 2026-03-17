"use client";

import { useEffect, useMemo, useState } from "react";
import {
  Facebook,
  Linkedin,
  Mail,
  MessageCircle,
  Link as LinkIcon,
} from "lucide-react";

function buildUrl(base, params) {
  const url = new URL(base);
  Object.entries(params).forEach(([key, value]) => {
    if (value) url.searchParams.set(key, value);
  });
  return url.toString();
}

export default function BlogShareButtons({
  title = "Check out this article",
  excerpt = "",
}) {
  const [currentUrl, setCurrentUrl] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setCurrentUrl(window.location.href);
  }, []);

  const shareText = useMemo(() => {
    return excerpt?.trim() || title;
  }, [excerpt, title]);

  const facebookUrl = useMemo(() => {
    return buildUrl("https://www.facebook.com/sharer/sharer.php", {
      u: currentUrl,
    });
  }, [currentUrl]);

  const whatsappUrl = useMemo(() => {
    return buildUrl("https://wa.me/", {
      text: `${title} ${currentUrl}`.trim(),
    });
  }, [title, currentUrl]);

  const linkedinUrl = useMemo(() => {
    return buildUrl("https://www.linkedin.com/sharing/share-offsite/", {
      url: currentUrl,
    });
  }, [currentUrl]);

  const xUrl = useMemo(() => {
    return buildUrl("https://twitter.com/intent/tweet", {
      text: title,
      url: currentUrl,
    });
  }, [title, currentUrl]);

  const mailUrl = useMemo(() => {
    return buildUrl("mailto:", {
      subject: title,
      body: `${shareText}\n\n${currentUrl}`,
    });
  }, [title, shareText, currentUrl]);

  async function handleCopy() {
    if (!currentUrl) return;

    try {
      await navigator.clipboard.writeText(currentUrl);
      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch {
      // fail silently
    }
  }

  const buttonBase =
    "inline-flex items-center justify-center gap-3 rounded-full px-6 py-3 font-poppins text-lg font-medium text-white transition hover:opacity-90";

  return (
    <div className="flex flex-wrap items-center justify-center gap-4">
      <a
        href={facebookUrl}
        target="_blank"
        rel="noreferrer"
        className={`${buttonBase} bg-[#1877f2]`}
      >
        <Facebook className="h-5 w-5" />
        <span>Share</span>
      </a>

      <a
        href={whatsappUrl}
        target="_blank"
        rel="noreferrer"
        className={`${buttonBase} bg-[#25d366]`}
      >
        <MessageCircle className="h-5 w-5" />
        <span>Share</span>
      </a>

      <a
        href={linkedinUrl}
        target="_blank"
        rel="noreferrer"
        className={`${buttonBase} bg-[#0a66c2]`}
      >
        <Linkedin className="h-5 w-5" />
        <span>Share</span>
      </a>

      <a
        href={xUrl}
        target="_blank"
        rel="noreferrer"
        className={`${buttonBase} bg-black`}
      >
        <span className="text-xl leading-none">𝕏</span>
        <span>Share</span>
      </a>

      <a href={mailUrl} className={`${buttonBase} bg-[#f04438]`}>
        <Mail className="h-5 w-5" />
        <span>Share</span>
      </a>

      <button
        type="button"
        onClick={handleCopy}
        className="inline-flex items-center justify-center gap-3 rounded-full border border-[#d0d5dd] bg-white px-6 py-3 font-poppins text-lg font-medium text-[#344054] transition hover:bg-[#f9fafb]"
      >
        <LinkIcon className="h-5 w-5" />
        <span>{copied ? "Copied" : "Copy link"}</span>
      </button>
    </div>
  );
}
