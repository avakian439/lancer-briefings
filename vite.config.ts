import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueDevTools from 'vite-plugin-vue-devtools'
import viteCompression from "vite-plugin-compression";
import fs from "fs/promises";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
    viteCompression({
      algorithm: "brotliCompress",
    }),
    {
      name: "github-pages-spa-fallback",
      apply: "build",
      async closeBundle() {
        const outputDir = path.resolve(__dirname, "dist");
        const indexHtmlPath = path.join(outputDir, "index.html");
        const fallbackHtmlPath = path.join(outputDir, "404.html");

        await fs.copyFile(indexHtmlPath, fallbackHtmlPath);
      },
    },
  ],
  base: "/lancer-briefings/",
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  optimizeDeps: {
    include: [
      "lancer-data",
      "lancer-ktb-data",
      "lancer-nrfaw-data",
      "lancer-longrim-data"
    ],
  },
  build: {
    sourcemap: true,
    cssCodeSplit: true,
    reportCompressedSize: true,
  },
  json: {
    namedExports: true,
  },
  css: {
    devSourcemap: true,
  },
});
