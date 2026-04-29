import { SectionHeader, FigureCard } from "@/components/ui";

const SPECS = [
  {
    aspect: "Platform",
    choice: "Unity 2022 LTS",
    detail: "with the Meta XR Interaction SDK for Quest devices",
  },
  {
    aspect: "Display",
    choice: "Meta Quest 3, fully immersive VR",
    detail: "no passthrough; the virtual classroom keeps the user focused",
  },
  {
    aspect: "Tracking",
    choice: "Inside-out hand tracking",
    detail: "no controllers; pinch gesture drives every interaction",
  },
  {
    aspect: "Interaction",
    choice: "Pinch-to-grab; collider-based ink and stamps",
    detail: "pen leaves green ink while on path; stamps fire on collision",
  },
];

export default function SystemTab() {
  return (
    <div className="space-y-16">
      {/* Architecture diagram */}
      <div>
        <SectionHeader
          eyebrow="02 / Architecture"
          title="Everything runs on the headset"
          kicker="There is no server, no remote inference, no network call. The whole feedback loop fits inside the Quest 3, which means hand motion to visual response is bounded by the display pipeline rather than any network round trip."
        />
        <FigureCard
          src="/images/architecture.png"
          alt="ToolTwin system architecture"
          width={2000}
          height={1100}
          caption="Three layers: the Quest 3 hardware, the OpenXR and Meta XR SDK runtime stack with Unity, and the ToolTwin application code split into a Scene Manager, Drawing Task, and Stamping Task."
        />
      </div>

      <hr className="rule" />

      {/* Spec table */}
      <div>
        <SectionHeader eyebrow="Stack" title="Specifications at a glance" />
        <div className="rounded-lg border border-ink/10 bg-white overflow-hidden">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-ink text-cream font-mono text-[11px] uppercase tracking-[0.15em]">
                <th className="px-5 py-3 w-1/4">Aspect</th>
                <th className="px-5 py-3">Choice</th>
              </tr>
            </thead>
            <tbody>
              {SPECS.map((row, i) => (
                <tr
                  key={row.aspect}
                  className={i % 2 === 0 ? "bg-white" : "bg-bone/60"}
                >
                  <td className="px-5 py-4 align-top font-mono text-[12px] uppercase tracking-[0.12em] text-accent-red font-semibold">
                    {row.aspect}
                  </td>
                  <td className="px-5 py-4 align-top">
                    <div className="font-display text-lg text-ink leading-tight">
                      {row.choice}
                    </div>
                    <div className="mt-1 text-sm text-slate font-light">
                      {row.detail}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <hr className="rule" />

      {/* Pinch detection */}
      <div>
        <SectionHeader
          eyebrow="Hand tracking"
          title="A pinch is the only gesture you need"
          kicker="The Meta SDK gives us 26 joint poses per hand at 60 Hz. ToolTwin only watches one distance: between thumb-tip (joint 4) and index-tip (joint 8). When that distance drops below a threshold and there is a tool nearby, the tool snaps to the hand."
        />
        <FigureCard
          src="/images/hand-tracking.png"
          alt="Pinch gesture detection diagram"
          width={2000}
          height={1100}
          caption="Pinch fires when the Euclidean distance d between thumb-tip and index-tip drops below the configured threshold. The same gesture grabs the pen and the stamp, so users only learn one move."
        />

        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-5">
          <Reason
            title="Why pinch and not a closed fist"
            body="Vision-based hand tracking on the Quest 3 reads a pinch more reliably than a full grip. When you wrap your fingers around a virtual tool, the tool occludes your fingers in the camera view and the tracker loses confidence."
          />
          <Reason
            title="Why one gesture for both tools"
            body="Once a user discovers pinch on the pen, it transfers cleanly to the stamp. Nobody in the user study asked us how to pick up the second tool. They just did it."
          />
        </div>
      </div>
    </div>
  );
}

function Reason({ title, body }: { title: string; body: string }) {
  return (
    <div className="border-l-2 border-accent-blue pl-5">
      <h4 className="font-display text-lg text-ink mb-2">{title}</h4>
      <p className="text-slate text-sm leading-relaxed">{body}</p>
    </div>
  );
}
