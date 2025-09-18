/** @type {import('next').NextConfig} */
const nextConfig = {
  // (Optional) Export as a standalone site
  // See https://nextjs.org/docs/pages/api-reference/next-config-js/output#automatically-copying-traced-files
  output: "standalone", // Feel free to modify/remove this option
  serverExternalPackages: ["sharp", "onnxruntime-node"],
  allowedDevOrigins: ["localhost", "192.168.1.212"],

  // Indicate that these packages should not be bundled by webpack
  experimental: {
    webpackBuildWorker: false, // https://github.com/vercel/next.js/issues/65350
  },
};
export default nextConfig;
