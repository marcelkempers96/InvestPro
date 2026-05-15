// Deployed as a fully static site to GitHub Pages (project page).
// Served from https://<user>.github.io/InvestPro/ — hence the basePath.
const basePath = "/InvestPro";

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  basePath,
  reactStrictMode: true,
  trailingSlash: true,
  images: {
    // GitHub Pages has no image optimization server.
    unoptimized: true,
  },
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
};

export default nextConfig;
