import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import legacy from "@vitejs/plugin-legacy";
import vue2 from "@vitejs/plugin-vue2";

// https://vitejs.dev/config/
export default defineConfig({
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use "/public/style/vars.scss" as *; @use "/public/style/global.scss" as *;`,
      },
    },
  },
  plugins: [
    vue2(),
    legacy({
      targets: ["ie >= 11"],
      additionalLegacyPolyfills: ["regenerator-runtime/runtime"],
    }),
  ],
  resolve: {
    alias: {
      vue: "vue/dist/vue.js",
      "@": fileURLToPath(new URL("./src", import.meta.url)),
      core: fileURLToPath(new URL("./src/components/core", import.meta.url)),
      pages: fileURLToPath(new URL("./src/pages", import.meta.url)),
      elements: fileURLToPath(new URL("./src/components/elements", import.meta.url)),
      modules: fileURLToPath(new URL("./src/components/modules", import.meta.url)),
    },
  },
  server: {
    port: 5163,
  },
});
