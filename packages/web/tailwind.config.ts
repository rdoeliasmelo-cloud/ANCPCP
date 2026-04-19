import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          500: "#1d4ed8",
          700: "#1e3a8a"
        }
      }
    }
  },
  plugins: []
};

export default config;
