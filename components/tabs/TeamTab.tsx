import Image from "next/image";
import { SectionHeader } from "@/components/ui";

const TEAM = [
  {
    name: "Luke Liu",
    affiliation: "University of Rochester",
    email: "lliu88@ur.rochester.edu",
    photo: "/images/luke.png",
    accent: "blue" as const,
    contributions: [
      "System design and Unity scene",
      "Drawing- and stamping-task implementation",
      "User-study design",
      "Storyboard illustrations",
    ],
  },
  {
    name: "Ertugrul Senturk",
    affiliation: "University of Rochester",
    email: "esent@ur.rochester.edu",
    photo: "/images/es.jpg",
    accent: "red" as const,
    contributions: [
      "System architecture",
      "Meta XR Interaction SDK integration",
      "Hand-tracking and pinch-detection pipeline",
      "Persona development and physical prototype",
    ],
  },
];

export default function TeamTab() {
  return (
    <div className="space-y-14">
      <div>
        <SectionHeader
          eyebrow="06 / Team"
          title="Built by two students, in one semester"
          kicker="ToolTwin was designed and built for CSC 216/416 (AR/VR Interaction Design) at the University of Rochester, supervised by Professor Zhen Bai."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {TEAM.map((m) => (
            <article
              key={m.name}
              className="group relative bg-white border border-ink/10 rounded-lg p-7 md:p-8 overflow-hidden transition hover:border-ink/30"
            >
              <div
                className={[
                  "absolute -right-12 -top-12 size-40 rounded-full opacity-[0.06] blur-2xl transition-opacity group-hover:opacity-[0.15]",
                  m.accent === "blue" ? "bg-accent-blue" : "bg-accent-red",
                ].join(" ")}
                aria-hidden="true"
              />

              <div className="relative">
                <div className="flex items-start gap-5 mb-6">
                  <div className="size-14 rounded-full overflow-hidden shrink-0 border border-ink/10">
                    <Image
                      src={m.photo}
                      alt={m.name}
                      width={56}
                      height={56}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-display text-2xl text-ink leading-tight">
                      {m.name}
                    </h3>
                    <p className="text-sm text-slate mt-1">{m.affiliation}</p>
                    <a
                      href={`mailto:${m.email}`}
                      className="inline-block mt-2 font-mono text-xs text-ink/60 hover:text-ink underline-offset-4 hover:underline transition"
                    >
                      {m.email}
                    </a>
                  </div>
                </div>

                <div>
                  <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted mb-3">
                    Contributions
                  </div>
                  <ul className="space-y-2">
                    {m.contributions.map((c) => (
                      <li
                        key={c}
                        className="flex items-start gap-3 text-slate text-sm leading-relaxed"
                      >
                        <span
                          className={[
                            "mt-2 size-1.5 rounded-full shrink-0",
                            m.accent === "blue" ? "bg-accent-blue" : "bg-accent-red",
                          ].join(" ")}
                          aria-hidden="true"
                        />
                        <span>{c}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      <hr className="rule" />

      <div>
        <SectionHeader eyebrow="Course" title="CSC 216/416, AR/VR Interaction Design" />
        <p className="text-slate text-base leading-relaxed font-light max-w-prose">
          Spring 2026, University of Rochester. Course supervised by Professor
          Zhen Bai. We thank Prof. Bai for her guidance throughout the project,
          and the three participants who took part in our user study.
        </p>
      </div>
    </div>
  );
}
