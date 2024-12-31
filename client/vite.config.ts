import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "./",
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@compenents": path.resolve(__dirname, "./src/components"),
      "@layout": path.resolve(__dirname, "./src/components/layout"),
      "@pages": path.resolve(__dirname, "./src/pages"),
      "@schema": path.resolve(__dirname, "./src/schema"),
      "@server": path.resolve(__dirname, "../server/src"),
      "@utils": path.resolve(__dirname, "../server/src/utils"),
      "@services": path.resolve(__dirname, "../server/src/services"),
    },
  },
});
