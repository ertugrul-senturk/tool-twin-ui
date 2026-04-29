import { SectionHeader, Pill } from "@/components/ui";

export default function OverviewTab() {
  return (
    <div className="space-y-16">
      {/* HERO. Lives inside the Overview tab so it does not block the tab bar. */}
      <div>
        <div className="eyebrow mb-5">A virtual reality study, 2026</div>

        <h1 className="font-display font-light text-5xl md:text-6xl lg:text-7xl leading-[0.98] tracking-tightest text-ink max-w-5xl">
          Real-time guidance for{" "}
          <em className="italic font-normal text-accent-red">hand-tool</em>{" "}
          skills, on a stock Meta Quest 3.
        </h1>

        <p className="mt-7 max-w-prose text-lg md:text-xl text-slate leading-relaxed font-light">
          ToolTwin is a Unity VR app that teaches young learners to trace
          shapes and place stamps using only the headset's hand tracking. No
          controllers. No external hardware. Just a pinch and a virtual pen.
        </p>

        {/* Stat strip. The four numbers we keep coming back to in the report. */}
        <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-6 border-t border-ink/10 pt-8">
          <Stat label="Task completion"     value="100%"   accent="green" />
          <Stat label="Avg. time per shape" value="1m 48s" accent="blue" />
          <Stat label="Satisfaction"        value="4.5 / 5" accent="red" />
          <Stat label="Participants"        value="3"      accent="ink" />
        </div>
      </div>

      <hr className="rule" />

      {/* ABSTRACT */}
      <div>
        <SectionHeader
          eyebrow="01 / Abstract"
          title="What is ToolTwin?"
        />
        <div className="space-y-5 max-w-prose text-slate text-lg leading-relaxed font-light">
          <p>
            Learning to use a pen, scissors, or a stamp is one of the first
            motor skills most kids pick up. Traditionally that means a tutor, a
            stack of paper, and a lot of patience. Both are expensive in their
            own way, and the feedback always comes after the mistake.
          </p>
          <p>
            ToolTwin is a VR app for the Meta Quest 3 that gives the same kind
            of guidance, but in real time. It runs two scenarios. The first is
            a drawing task where the user traces a guide shape with a virtual
            pen. The second is a stamping task where the user places three
            target stamps on a virtual sheet. A green ink trail follows the
            pen while it stays on the path. A click confirms each successful
            stamp. The whole thing works without controllers.
          </p>
          <p>
            We ran a small within-subjects study with three University of
            Rochester students. Everyone finished both tasks unaided. Average
            shape time was{" "}
            <strong className="text-ink">1 minute 48 seconds</strong>.
            Satisfaction averaged{" "}
            <strong className="text-ink">4.5 out of 5</strong>. The numbers are
            small but consistent, and the qualitative feedback was positive
            even from the participant who had never put on a VR headset before.
          </p>
        </div>
      </div>

      <hr className="rule" />

      {/* MR -> VR design evolution */}
      <div>
        <SectionHeader
          eyebrow="Design evolution"
          title="Why we ended up in VR, not MR"
          kicker="The midterm pitched ToolTwin as a passthrough mixed reality app on top of real tools. We tried it. It did not hold up for fine motor work. Here is what pushed us to fully immersive VR."
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <Card
            num="A"
            title="Passthrough lag"
            body="Quest 3 passthrough has a small but visible delay between your hand moving and the camera feed catching up. For a casual app it is fine. For tracing a line, that delay is enough to break the feeling that you are guiding a real pen."
          />
          <Card
            num="B"
            title="The pen tip lines up"
            body="In VR the virtual pen tip is rendered exactly where the system thinks your index finger is. There is no parallax mismatch between a real tool you can see and a virtual overlay drawn near it."
          />
          <Card
            num="C"
            title="Less to look at"
            body="A clean virtual classroom keeps a young user focused on the task. No clutter, no lighting changes, no real desk getting in the way of the guide shapes."
          />
        </div>
      </div>

      <hr className="rule" />

      {/* Keywords */}
      <div>
        <SectionHeader eyebrow="Tags" title="What this project is about" />
        <div className="flex flex-wrap gap-2">
          <Pill>Virtual Reality</Pill>
          <Pill tone="green">Hand Tracking</Pill>
          <Pill>Skill Training</Pill>
          <Pill tone="blue">Meta Quest 3</Pill>
          <Pill>Educational Technology</Pill>
          <Pill tone="red">Pinch Gesture</Pill>
          <Pill>Unity</Pill>
          <Pill>Within-Subjects Study</Pill>
        </div>
      </div>
    </div>
  );
}

/* ----------------------------------------------------------------- */
/* Stat. Used in the hero strip.                                     */
/* ----------------------------------------------------------------- */
function Stat({
  label,
  value,
  accent,
}: {
  label: string;
  value: string;
  accent: "green" | "blue" | "red" | "ink";
}) {
  const accentClass = {
    green: "text-accent-green",
    blue:  "text-accent-blue",
    red:   "text-accent-red",
    ink:   "text-ink",
  }[accent];

  return (
    <div className="flex flex-col">
      <span className={`stat-num ${accentClass}`}>{value}</span>
      <span className="mt-2 font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
        {label}
      </span>
    </div>
  );
}

/* ----------------------------------------------------------------- */
/* Reason card used in the design-evolution grid.                    */
/* ----------------------------------------------------------------- */
function Card({
  num,
  title,
  body,
}: {
  num: string;
  title: string;
  body: string;
}) {
  return (
    <div className="bg-white border border-ink/10 rounded-lg p-6 hover:border-ink/30 transition">
      <div className="font-mono text-[11px] tracking-[0.18em] text-accent-red uppercase mb-3">
        Reason {num}
      </div>
      <h3 className="font-display font-medium text-xl text-ink leading-snug mb-3">
        {title}
      </h3>
      <p className="text-slate text-sm leading-relaxed">{body}</p>
    </div>
  );
}
