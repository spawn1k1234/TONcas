import { defineConfig } from "vite";

export default defineConfig({
  root: "./client", // Указание Vite использовать папку "client"
  build: {
    outDir: "../dist", // Сборка будет в корневой папке в директории dist
  },
});
