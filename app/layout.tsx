import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ToolTwin: VR Hand-Tool Skill Training on Meta Quest 3",
  description:
    "ToolTwin is a virtual reality application for the Meta Quest 3 that provides real-time guidance for hand-tool tasks using native hand tracking and pinch-to-grab gestures. CSC 216/416, University of Rochester.",
  authors: [{ name: "Luke Liu" }, { name: "Ertugrul Senturk" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
