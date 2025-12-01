import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig(() => {
  const basePath = process.env.VITE_BASE_PATH || "/";

  return {
  // server: {
  //   host: "::",
  //   port: 443,
  //   allowedHosts: ["*"],
  // },
    base: basePath,
    plugins: [react()],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
  };
});