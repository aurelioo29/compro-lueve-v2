import clsx from "clsx";

export default function FeaturePrivilege({
  title,
  body,
  mobileAlign = "left", // "left" | "right" untuk zig-zag di mobile
}) {
  const mobileText = mobileAlign === "right" ? "text-right" : "text-left";
  const mobileJustify =
    mobileAlign === "right" ? "justify-end" : "justify-start";

  return (
    <div className="space-y-3">
      {/* Judul: zig-zag di mobile, CENTER di desktop */}
      <div className={clsx("flex", mobileJustify, "lg:justify-center")}>
        <span
          className="
            inline-block rounded-full border border-[#800000]
            px-4 py-1 font-minion-pro text-base md:text-2xl
            text-[#800000] transition-colors
            hover:bg-[#800000] hover:text-[#E0C698]
          "
        >
          {title}
        </span>
      </div>

      {/* Body: zig-zag di mobile, CENTER di desktop */}
      <p
        className={clsx(
          "mt-3 text-[#800000]/90 font-poppins text-sm md:text-base",
          mobileText, // mobile zig-zag
          "lg:text-center lg:max-w-[36ch] lg:mx-auto" // desktop center
        )}
      >
        {body}
      </p>
    </div>
  );
}
