import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#F7F9FC",
        foreground: "#1F2937",
        dwp: {
          blue: '#2F5DAA', // Primary Blue
          dark: '#0F2A5F', // Deep Corporate Blue
          orange: '#F47A2A', // Orange Accent
          teal: '#2CA7A4', // Teal Accent
          neutral: '#F7F9FC', // Neutral Background
          text: '#1F2937', // Text Color
          yellow: '#FFC107', // Vibrant Yellow
          cyan: '#00E5FF', // Vibrant Cyan
          deepPurple: '#1A237E', // Deep Blue-Purple
          lightBlue: '#E1F5FE', // Light Blue for Footer
        }
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'dwp-gradient-blue-teal': 'linear-gradient(to right, #2F5DAA, #2CA7A4)',
        'dwp-gradient-orange-coral': 'linear-gradient(to right, #F47A2A, #FF6B6B)',
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'sans-serif'],
        heading: ['var(--font-poppins)', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
export default config;
