import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Relative asset paths support both a github.io root and a project subdirectory.
export default defineConfig({ plugins: [react()], base: "./" });
