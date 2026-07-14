import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        heading: "var(--color-heading)",
        subheading: "var(--color-subheading)",
        primary: {
          DEFAULT: "var(--color-primary-btn-bg)",
          hover: "var(--color-primary-btn-hover-bg)",
        },
        secondary: "var(--color-secondary-btn-text)",
        testimonial: {
          DEFAULT: "var(--color-testimonial-bg)",
          text: "var(--color-testimonial-text)",
          name: "var(--color-testimonial-name)",
        },
        accent: "var(--color-accent)",
      },
      borderColor: {
        secondary: "var(--color-secondary-btn-border)",
      },
      backgroundColor: {
        secondary: "var(--color-secondary-btn-bg)",
      },
    },
  },
};

export default config;
