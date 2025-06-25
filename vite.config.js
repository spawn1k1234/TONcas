import { defineConfig } from "vite";

export default defineConfig({
  root: "client", // Указывает, что корень проекта находится в папке "client"
  build: {
    outDir: "../dist", // Папка, куда будет собираться проект
  },
  publicDir: "client/public", // Указывает, где искать публичные файлы, включая index.html
});
