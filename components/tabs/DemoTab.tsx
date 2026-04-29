import { SectionHeader, FigureCard, TwoCol } from "@/components/ui";

// Replace with your actual YouTube video ID before sharing the site.
const YOUTUBE_ID = "GElVe2q3JxE";

export default function DemoTab() {
  return (
    <div className="space-y-16">
      {/* YouTube */}
      <div>
        <SectionHeader
          eyebrow="04 / Demo video"
          title="See ToolTwin in action"
          kicker="A short walk-through of the drawing and stamping scenarios, recorded straight from the Quest 3 build."
        />

        <div className="rounded-xl overflow-hidden border border-ink/10 bg-ink relative aspect-video">
          <iframe
            // YouTube IFrame embed. Purely client-side, no backend needed.
            src={`https://www.youtube.com/embed/${YOUTUBE_ID}?rel=0&modestbranding=1`}
            title="ToolTwin demo video"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            className="absolute inset-0 w-full h-full"
          />
        </div>
      </div>

      <hr className="rule" />

      {/* In-game screenshots */}
      <div>
        <SectionHeader
          eyebrow="In-game"
          title="What it looks like inside the headset"
        />

        <TwoCol>
          <FigureCard
            src="/images/draw.jpg"
            alt="Drawing scenario inside the Quest 3"
            width={1200}
            height={900}
            bg="white"
            caption="Drawing scenario. The user traces the rectangular guide with the virtual pen. The white outline is the target; the pen tip is held with a pinch."
          />
          <FigureCard
            src="/images/stamp.jpg"
            alt="Stamping scenario inside the Quest 3"
            width={1200}
            height={900}
            bg="white"
            caption='Stamping scenario. A virtual screen reads "Good stamp. Keep going. Shape: Oval 0/3, Accuracy: 75.0%". Two stamps are visible on the desk; the user is reaching for a third.'
          />
        </TwoCol>
      </div>

      <hr className="rule" />

      {/* Feedback design */}
      <div>
        <SectionHeader
          eyebrow="Feedback design"
          title="Two tasks, two feedback modalities"
          kicker="The drawing task gives continuous visual feedback through the green ink trail. The stamping task gives discrete audio feedback through a click on each successful placement. Mixing the modalities makes the two tasks feel different even though the underlying gesture is identical."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <Channel
            tone="green"
            label="Drawing"
            modality="Continuous, visual"
            description="A TrailRenderer follows the pen tip. Inside the 1.5 cm tolerance the trail is green; outside that, it fades to gray and a soft tone signals the deviation."
          />
          <Channel
            tone="red"
            label="Stamping"
            modality="Discrete, audio + visual"
            description="A single-shot collision event fires when the stamp face touches a target. Click sound plus a colored mark, both at the moment of impact."
          />
        </div>
      </div>
    </div>
  );
}

function Channel({
  tone,
  label,
  modality,
  description,
}: {
  tone: "green" | "red";
  label: string;
  modality: string;
  description: string;
}) {
  const accent =
    tone === "green" ? "border-accent-green" : "border-accent-red";
  const accentText =
    tone === "green" ? "text-accent-green" : "text-accent-red";

  return (
    <div className={`bg-white border-l-4 ${accent} border-y border-r border-ink/10 rounded-r-lg p-6`}>
      <div className={`font-mono text-[10px] uppercase tracking-[0.18em] ${accentText} mb-2`}>
        {modality}
      </div>
      <h4 className="font-display text-xl text-ink mb-3">{label}</h4>
      <p className="text-slate text-sm leading-relaxed font-light">
        {description}
      </p>
    </div>
  );
}
