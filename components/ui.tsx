import Image from "next/image";

/* -------------------------------------------------------- */
/* SectionHeader , eyebrow + title + optional kicker         */
/* -------------------------------------------------------- */
export function SectionHeader({
  eyebrow,
  title,
  kicker,
}: {
  eyebrow?: string;
  title: string;
  kicker?: string;
}) {
  return (
    <div className="mb-10">
      {eyebrow && <div className="eyebrow mb-3">{eyebrow}</div>}
      <h2 className="font-display font-light text-3xl md:text-4xl tracking-tightest text-ink leading-tight">
        {title}
      </h2>
      {kicker && (
        <p className="mt-4 max-w-prose text-base md:text-lg text-slate leading-relaxed font-light">
          {kicker}
        </p>
      )}
    </div>
  );
}

/* -------------------------------------------------------- */
/* FigureCard , image with caption, soft frame              */
/* -------------------------------------------------------- */
export function FigureCard({
  src,
  alt,
  caption,
  width,
  height,
  bg = "bone",
}: {
  src: string;
  alt: string;
  caption?: string;
  width: number;
  height: number;
  bg?: "bone" | "white" | "ink";
}) {
  const bgClass = {
    bone:  "bg-bone",
    white: "bg-white",
    ink:   "bg-ink",
  }[bg];

  return (
    <figure className="flex flex-col">
      <div
        className={`${bgClass} rounded-lg overflow-hidden border border-ink/10 p-4 md:p-6`}
      >
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          className="w-full h-auto rounded-sm"
          // Local images only; allow next/image optimisation
          priority={false}
        />
      </div>
      {caption && (
        <figcaption className="mt-3 text-sm text-muted leading-snug font-light">
          <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-accent-red mr-2">
            Fig.
          </span>
          {caption}
        </figcaption>
      )}
    </figure>
  );
}

/* -------------------------------------------------------- */
/* Pill , small label used in lists                         */
/* -------------------------------------------------------- */
export function Pill({
  children,
  tone = "default",
}: {
  children: React.ReactNode;
  tone?: "default" | "green" | "blue" | "red";
}) {
  const tones = {
    default: "bg-ink/5 text-ink border-ink/10",
    green:   "bg-accent-green/10 text-accent-green border-accent-green/20",
    blue:    "bg-accent-blue/10 text-accent-blue border-accent-blue/20",
    red:     "bg-accent-red/10 text-accent-red border-accent-red/20",
  };
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-xs font-mono uppercase tracking-[0.12em] ${tones[tone]}`}
    >
      {children}
    </span>
  );
}

/* -------------------------------------------------------- */
/* Two-column grid that collapses to one column on mobile   */
/* -------------------------------------------------------- */
export function TwoCol({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
      {children}
    </div>
  );
}
