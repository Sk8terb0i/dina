import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Replace "dina-therapy" with your exact GitHub repository name
export default defineConfig({
  plugins: [react()],
  base: "/dina/",
});
