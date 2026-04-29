import { SectionHeader, FigureCard } from "@/components/ui";

export default function StudyTab() {
  return (
    <div className="space-y-16">
      {/* Headline numbers */}
      <div>
        <SectionHeader
          eyebrow="05 / User study"
          title="A small within-subjects study, n = 3"
          kicker="Three University of Rochester students completed both scenarios in a single 15-minute session, then filled out a short post-task survey covering ease of use, enjoyment, and willingness to recommend."
        />

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Headline value="3"        label="Participants"        tone="ink" />
          <Headline value="100%"     label="Task completion"     tone="green" />
          <Headline value="1m 48s"   label="Avg. time per task" tone="blue" />
          <Headline value="4.5 / 5"  label="Mean satisfaction"   tone="red" />
        </div>
      </div>

      <hr className="rule" />

      {/* Study setup with participant photo */}
      <div>
        <SectionHeader
          eyebrow="Setup"
          title="In the lab"
        />

        <div className="grid grid-cols-1 md:grid-cols-[2fr_3fr] gap-8 md:gap-10 items-start">
          <FigureCard
            src="/images/participant.png"
            alt="Participant testing ToolTwin on the Meta Quest 3"
            width={1406}
            height={2500}
            caption="A participant tracing the guide square in mid-air during the drawing scenario."
          />
          <div className="space-y-5 text-slate text-base leading-relaxed font-light">
            <p>
              All three participants were between 18 and 25 years old. Computer
              experience was reported as moderate to high. Two of them had used
              a VR headset only once or twice before, and one had no prior VR
              experience at all.
            </p>
            <p>
              The within-subjects design had everyone complete both tasks in
              the same fixed order: trace a square first, then stamp three
              shapes. Each participant served as their own baseline for the
              second-attempt timing comparison.
            </p>
            <p>
              The moderator only gave a brief verbal explanation of the pinch
              gesture before launch. After that, every participant finished
              both tasks unaided.
            </p>
          </div>
        </div>
      </div>

      <hr className="rule" />

      {/* Timing */}
      <div>
        <SectionHeader
          eyebrow="Efficiency"
          title="Drawing took about 2.5 minutes; stamping about 1 minute"
          kicker="The gap is consistent with the difference between the two interaction models. A square trace requires sustained on-path control; a stamp is a discrete one-shot action."
        />
        <FigureCard
          src="/images/timing.png"
          alt="Per-shape completion time, broken down by participant and task"
          width={2000}
          height={1100}
          bg="white"
          caption="Per-shape completion time, broken down by participant (P1, P2, P3) and task. The dashed red line marks the two-task grand mean of 1 minute 48 seconds."
        />
      </div>

      <hr className="rule" />

      {/* Satisfaction */}
      <div>
        <SectionHeader
          eyebrow="Satisfaction"
          title="No participant rated the system below 4 on any dimension"
        />
        <FigureCard
          src="/images/satisfaction.png"
          alt="Post-task satisfaction ratings on a 1 to 5 Likert scale"
          width={2000}
          height={1100}
          bg="white"
          caption="Per-participant ratings on three dimensions. Horizontal markers indicate the cluster mean; the overall mean across all dimensions is 4.5 out of 5."
        />

        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-5">
          <Quote
            tone="green"
            who="P1"
            text="The pinch gesture was intuitive once it was demonstrated."
          />
          <Quote
            tone="blue"
            who="P2"
            text="The green-ink-on-path feedback was immediately understandable."
          />
          <Quote
            tone="red"
            who="P3"
            text="The stamp click felt like a video-game mechanic. Placement was satisfying."
          />
        </div>
      </div>
    </div>
  );
}

function Headline({
  value,
  label,
  tone,
}: {
  value: string;
  label: string;
  tone: "green" | "blue" | "red" | "ink";
}) {
  const text = {
    green: "text-accent-green",
    blue:  "text-accent-blue",
    red:   "text-accent-red",
    ink:   "text-ink",
  }[tone];

  return (
    <div className="border-t-2 border-ink pt-4">
      <div className={`font-display font-light text-4xl md:text-5xl tracking-tightest ${text}`}>
        {value}
      </div>
      <div className="mt-2 font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
        {label}
      </div>
    </div>
  );
}

function Quote({
  who,
  text,
  tone,
}: {
  who: string;
  text: string;
  tone: "green" | "blue" | "red";
}) {
  const dot = {
    green: "bg-accent-green",
    blue:  "bg-accent-blue",
    red:   "bg-accent-red",
  }[tone];

  return (
    <div className="bg-white border border-ink/10 rounded-lg p-5">
      <div className="flex items-center gap-2 mb-3">
        <span className={`size-2 rounded-full ${dot}`} />
        <span className="font-mono text-[11px] uppercase tracking-[0.15em] text-muted">
          {who}
        </span>
      </div>
      <p className="font-display italic text-base text-ink leading-snug">
        &ldquo;{text}&rdquo;
      </p>
    </div>
  );
}
