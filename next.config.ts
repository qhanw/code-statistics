import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */

  // 忽略构建时的TypeScript错误
  // typescript: { ignoreBuildErrors: true },
  // 忽略构建时的ESLint错误
  eslint: { ignoreDuringBuilds: true },
};

export default nextConfig;
