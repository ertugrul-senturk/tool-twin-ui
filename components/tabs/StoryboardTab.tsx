import { SectionHeader, FigureCard } from "@/components/ui";

const SHARED_STEP = {
  n: "01",
  title: "Enter the VR room",
  body: "Kid puts on the Quest 3 and finds a desk with paper, a pen, and a few stamps.",
};

const DRAWING_STEPS = [
  {
    n: "02",
    title: "Select Drawing",
    body: "Select Drawing option from the menu.",
  },
  {
    n: "03",
    title: "Take the Pen",
    body: "Reach out and pinch the pen.",
  },
  {
    n: "04",
    title: "Draw the shape",
    body: "Follow the guide line; the system rewards on-path strokes with green ink. Check score and accuracy update on the screen.",
  },
];

const STAMPING_STEPS = [
  {
    n: "02",
    title: "Select Stamp",
    body: "Select Stamp option from the menu.",
  },
  {
    n: "03",
    title: "Take the stamp",
    body: "Reach out and pinch the stamp.",
  },
  {
    n: "04",
    title: "Stamp the target",
    body: "Press a stamp onto the matching silhouette. Check score and accuracy update on the screen.",
  },
];

function Step({
  n,
  title,
  body,
  accent,
}: {
  n: string;
  title: string;
  body: string;
  accent: "blue" | "green" | "red";
}) {
  const colors = {
    blue:  { ring: "bg-accent-blue/10 text-accent-blue" },
    green: { ring: "bg-accent-green/10 text-accent-green" },
    red:   { ring: "bg-accent-red/10 text-accent-red" },
  }[accent];

  return (
    <li className="grid grid-cols-[auto_1fr] gap-4 items-start border-b border-ink/10 pb-4 last:border-b-0">
      <div className={`size-10 rounded-full flex items-center justify-center font-mono font-semibold text-xs shrink-0 ${colors.ring}`}>
        {n}
      </div>
      <div>
        <h4 className="font-display text-lg text-ink leading-snug">{title}</h4>
        <p className="text-slate text-sm leading-relaxed font-light mt-1">{body}</p>
      </div>
    </li>
  );
}

export default function StoryboardTab() {
  return (
    <div className="space-y-14">
      <div>
        <SectionHeader
          eyebrow="03 / Storyboard"
          title="A session, from headset on to last stamp"
          kicker="Designed to be discoverable in under a minute. No tutorial, no menu maze. A workbench, a pen, three stamps, a kid."
        />

        <FigureCard
          src="/images/storyboard.png"
          alt="ToolTwin user storyboard"
          width={1600}
          height={1600}
          caption="The hand-drawn flow we worked from. The illustration was the design brief and the final build stayed close to it."
        />
      </div>

      <hr className="rule" />

      <div>
        <SectionHeader
          eyebrow="Step by step"
          title="One start, two separate tasks"
          kicker="After entering the VR room the user picks one task — Drawing or Stamping — and completes it independently. The two paths do not overlap."
        />

        {/* Shared first step */}
        <ol className="space-y-4 mb-8">
          <Step n={SHARED_STEP.n} title={SHARED_STEP.title} body={SHARED_STEP.body} accent="blue" />
        </ol>

        {/* Fork indicator */}
        <div className="flex items-center gap-3 mb-8">
          <div className="h-px flex-1 bg-ink/10" />
          <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted px-3">
            User selects one task
          </span>
          <div className="h-px flex-1 bg-ink/10" />
        </div>

        {/* Two task paths side by side */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Drawing */}
          <div className="border border-accent-green/30 rounded-lg p-5">
            <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-accent-green mb-4">
              Drawing task
            </div>
            <ol className="space-y-4">
              {DRAWING_STEPS.map((s) => (
                <Step key={s.n + s.title} n={s.n} title={s.title} body={s.body} accent="green" />
              ))}
            </ol>
          </div>

          {/* Stamping */}
          <div className="border border-accent-red/30 rounded-lg p-5">
            <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-accent-red mb-4">
              Stamping task
            </div>
            <ol className="space-y-4">
              {STAMPING_STEPS.map((s) => (
                <Step key={s.n + s.title} n={s.n} title={s.title} body={s.body} accent="red" />
              ))}
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
}
