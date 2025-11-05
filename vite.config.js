import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    port: 3000,

    // 👇 Allow specific production domains
    allowedHosts: ["www.preetinest.ca", "preetinest.ca"],

    proxy: {
      "/api": {
        // 👇 Your backend target for local dev
        target: "http://localhost:8080",
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
});
