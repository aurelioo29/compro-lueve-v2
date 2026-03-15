import React from "react";
import Image from "next/image";

export default function StoryCard({
  item,
  overlayLeft,
  textLeft = true,
  priority,
  contentAos = "fade-up",
  contentDelay = 0,
  imgAos = "fade",
  imgDelay = 0,
  titleDelay = 0,
  stepDelay = 0,
  descDelay = 0,
}) {
  // Mobile dibuat lebih kecil supaya blur tidak terlalu menutup gambar
  const blurWidth = "w-[52%] sm:w-[58%] md:w-[64%] lg:w-[60%]";
  const contentWidth = "w-[50%] sm:w-[56%] md:w-[60%] lg:w-[60%]";

  return (
    <article
      className="
        relative overflow-hidden shadow-lg
        w-full max-w-[min(100%,637px)]
        min-h-[62svh] sm:min-h-[60svh]
        lg:w-[637px] lg:min-h-[858px]
        hover:brightness-[1.02] transition-[filter,transform] duration-300
      "
      aria-label={`${item.title}${item.step ? ` — ${item.step}` : ""}`}
    >
      {/* Foto */}
      <div
        className="absolute inset-0 -z-10"
        data-aos={imgAos}
        data-aos-delay={imgDelay}
      >
        <Image
          src={item.imageSrc}
          alt={item.imageAlt || ""}
          fill
          sizes="(min-width:1024px) 637px, 100vw"
          priority={priority}
          className="object-cover"
        />
      </div>

      {/* Blur side */}
      <div
        className={[
          "absolute inset-y-0 z-0",
          blurWidth,
          overlayLeft ? "right-0" : "left-0",
          "backdrop-blur-[4px] sm:backdrop-blur-[6px] md:backdrop-blur-[7px]",
        ].join(" ")}
        aria-hidden
      />

      {/* Gradient bawah */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-white/70 to-transparent z-10"
        aria-hidden
      />

      {/* Content */}
      <div
        className={[
          "relative z-20 flex flex-col justify-start gap-2",
          "py-5 sm:py-8 mt-6 sm:mt-10 md:mt-24",
          contentWidth,
          textLeft
            ? "ml-auto pl-3 sm:pl-5 md:pl-7 pr-3 sm:pr-4 text-left"
            : "mr-auto pr-3 sm:pr-5 md:pr-7 pl-3 sm:pl-4 text-right",
        ].join(" ")}
        data-aos={contentAos}
        data-aos-delay={contentDelay}
      >
        <div
          className={`flex flex-col ${
            textLeft
              ? "border-l-2 sm:border-l-4 pl-2"
              : "border-r-2 sm:border-r-4 pr-2"
          } gap-1 sm:gap-2 border-[#800000]`}
          data-aos="fade-up"
          data-aos-delay={titleDelay}
        >
          <h3 className="font-minion-pro text-[#800000] text-[18px] sm:text-[24px] md:text-[32px] uppercase leading-tight">
            {item.title}
          </h3>

          {item.step && (
            <span
              className="font-poppins text-[#CEA660] text-xl sm:text-3xl md:text-5xl font-bold"
              data-aos="fade-up"
              data-aos-delay={stepDelay}
            >
              {item.step}
            </span>
          )}
        </div>

        <p
          className={[
            "mt-2 font-poppins text-[11px] sm:text-sm md:text-base leading-5 sm:leading-6 text-[#800000]/90",
            "max-w-full sm:max-w-[90%] md:max-w-[80%]",
            textLeft ? "mr-auto text-left" : "ml-auto text-right",
          ].join(" ")}
          data-aos="fade-up"
          data-aos-delay={descDelay}
        >
          {item.desc}
        </p>
      </div>
    </article>
  );
}
