import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    port: 3000,
    allowedHosts: ["www.preetinest.ca", "preetinest.ca"],
    proxy: {
      "/api": {
        target: "http://localhost:8080",
        changeOrigin: true,
        secure: false,
      },
    },
    // proxy: {
    //   "/api": {
    //     target: "https://preetinest.ca",
    //     changeOrigin: true,
    //     secure: true,
    //     // rewrite: (path) => path.replace(/^\/api/, ""),
    //   },
    // },
  },
});
