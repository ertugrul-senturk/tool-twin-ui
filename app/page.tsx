"use client";

import { useState } from "react";

import OverviewTab from "@/components/tabs/OverviewTab";
import SystemTab from "@/components/tabs/SystemTab";
import StoryboardTab from "@/components/tabs/StoryboardTab";
import DemoTab from "@/components/tabs/DemoTab";
import StudyTab from "@/components/tabs/StudyTab";
import TeamTab from "@/components/tabs/TeamTab";

type TabId =
  | "overview"
  | "system"
  | "storyboard"
  | "demo"
  | "study"
  | "team";

const TABS: { id: TabId; label: string; num: string }[] = [
  { id: "overview",   num: "01", label: "Overview" },
  { id: "system",     num: "02", label: "System" },
  { id: "storyboard", num: "03", label: "Storyboard" },
  { id: "demo",       num: "04", label: "Demo" },
  { id: "study",      num: "05", label: "User Study" },
  { id: "team",       num: "06", label: "Team" },
];

export default function Home() {
  const [active, setActive] = useState<TabId>("overview");

  return (
    <main className="relative z-10 min-h-screen">
      {/*
       * HEADER. Compact bar with project glyph and course tag. Not sticky;
       * the tab bar below this is the sticky element so tabs stay visible.
       */}
      <header className="border-b border-ink/10 bg-cream">
        <div className="mx-auto max-w-6xl px-6 md:px-10 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <svg
              width="28" height="28" viewBox="0 0 28 28"
              className="shrink-0"
              aria-hidden="true"
            >
              <rect x="3" y="3" width="14" height="14" fill="none"
                    stroke="#0F1B3F" strokeWidth="2" />
              <rect x="11" y="11" width="14" height="14" fill="none"
                    stroke="#E63946" strokeWidth="2" />
            </svg>
            <div className="flex flex-col leading-tight">
              <span className="font-display font-semibold text-[15px] text-ink">
                ToolTwin
              </span>
              <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
                CSC 216/416 · Spring 2026
              </span>
            </div>
          </div>

          <div className="hidden sm:flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.15em] text-slate">
            <span className="size-2 rounded-full bg-accent-green animate-pulse" />
            <span>Final Project</span>
          </div>
        </div>
      </header>

      {/*
       * TAB BAR. Underline style. Sticky directly below the header so it
       * stays visible while scrolling. Active tab has a thick navy
       * underbar; hovered tabs get a faint underbar so the affordance is
       * always present. No disappearing borders.
       */}
      <nav
        className="sticky top-0 z-20 bg-cream/95 backdrop-blur-md border-b border-ink/15"
        aria-label="Project sections"
      >
        <div className="mx-auto max-w-6xl px-6 md:px-10">
          <div
            className="flex gap-1 md:gap-3 overflow-x-auto overflow-y-hidden scrollbar-thin"
            role="tablist"
          >
            {TABS.map((t) => {
              const isActive = active === t.id;
              return (
                <button
                  key={t.id}
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setActive(t.id)}
                  className={[
                    "group relative shrink-0",
                    "px-4 md:px-5 py-4 md:py-5",
                    "transition-colors duration-150",
                    "focus:outline-none focus-visible:bg-ink/5",
                    isActive ? "text-ink" : "text-slate hover:text-ink",
                  ].join(" ")}
                >
                  <span className="flex items-center gap-2">
                    <span
                      className={[
                        "font-mono text-[10px] tracking-[0.15em]",
                        isActive ? "text-accent-red" : "text-muted",
                      ].join(" ")}
                    >
                      {t.num}
                    </span>
                    <span className="font-sans text-[15px] font-medium">
                      {t.label}
                    </span>
                  </span>

                  {/* Underbar. Thick on active, faint on hover, gone otherwise. */}
                  <span
                    aria-hidden="true"
                    className={[
                      "pointer-events-none absolute left-3 right-3",
                      "-bottom-[1px] h-[3px] rounded-t-sm",
                      "transition-opacity duration-200 bg-ink",
                      isActive
                        ? "opacity-100"
                        : "opacity-0 group-hover:opacity-30",
                    ].join(" ")}
                  />
                </button>
              );
            })}
          </div>
        </div>
      </nav>

      {/* TAB CONTENT */}
      <section
        className="mx-auto max-w-6xl px-6 md:px-10 pt-10 md:pt-14 pb-24"
        key={active}
      >
        <div className="fade-up">
          {active === "overview"   && <OverviewTab />}
          {active === "system"     && <SystemTab />}
          {active === "storyboard" && <StoryboardTab />}
          {active === "demo"       && <DemoTab />}
          {active === "study"      && <StudyTab />}
          {active === "team"       && <TeamTab />}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-ink/10 mt-12">
        <div className="mx-auto max-w-6xl px-6 md:px-10 py-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex flex-col gap-1">
            <span className="font-display font-semibold text-base text-ink">
              ToolTwin
            </span>
            <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted">
              CSC 216/416 · AR/VR Interaction Design · Prof. Zhen Bai
            </span>
          </div>
          <div className="font-sans text-sm text-slate">
            By Luke Liu and Ertugrul Senturk · University of Rochester
          </div>
        </div>
      </footer>
    </main>
  );
}
