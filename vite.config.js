import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { ViteMinifyPlugin } from "vite-plugin-minify";

export default defineConfig({
  plugins: [react(), ViteMinifyPlugin({})],
  build: {
    rollupOptions: {
      treeshake: true,
      output: {
        manualChunks(id) {
          if (id.includes("node_modules")) {
            return id
              .toString()
              .split("node_modules/")[1]
              .split("/")[0]
              .toString();
          }
        },
      },
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
