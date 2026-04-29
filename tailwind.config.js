/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // ToolTwin design tokens — same palette as the report figures
        ink:      "#0F1B3F",   // deep navy
        slate:    "#3F4A66",   // secondary text
        muted:    "#6B7280",   // tertiary text
        border:   "#D1D5DB",
        bone:     "#F4F5F7",   // soft background
        cream:    "#FAFAF7",   // page bg accent
        accent: {
          green: "#2EA86F",
          blue:  "#2F6FED",
          red:   "#E63946",
          gold:  "#D4A017",
        },
      },
      fontFamily: {
        // Distinctive editorial pairing:
        //  - "Fraunces" serif for display (modern, with optical adjustments)
        //  - "Geist" sans for body (technical, neutral)
        //  - "JetBrains Mono" for code/labels
        display: ['"Fraunces"', "ui-serif", "Georgia", "serif"],
        sans:    ['"Geist"', "ui-sans-serif", "system-ui", "sans-serif"],
        mono:    ['"JetBrains Mono"', "ui-monospace", "SFMono-Regular", "monospace"],
      },
      letterSpacing: {
        tightest: "-0.04em",
      },
      maxWidth: {
        prose: "68ch",
      },
    },
  },
  plugins: [],
};
