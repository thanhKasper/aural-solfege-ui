import { defineConfig } from "vite";
import react, { reactCompilerPreset } from "@vitejs/plugin-react";
import babel from "@rolldown/plugin-babel";
import path from "node:path";
import svgr from "vite-plugin-svgr";

// https://vite.dev/config/
export default defineConfig({
  base: "/aural-solfege",
  server: {
    port: 3000,
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@components": path.resolve(__dirname, "./src/components"),
      "@router": path.resolve(__dirname, "./src/router"),
    },
  },
  plugins: [
    react(),
    svgr({
      include: "**/*.svg",
    }),
    babel({ presets: [reactCompilerPreset()] }),
  ],
});
