/** @type {import('next').NextConfig} */
const nextConfig = {
  // Build to plain static files in out/, so the site can be hosted anywhere (no Node server needed).
  output: "export",
  // Write each page as folder/index.html (e.g. out/which-aircon-gas/index.html), which every static host serves
  // at a clean address without special rewrite rules.
  trailingSlash: true,
}
export default nextConfig
