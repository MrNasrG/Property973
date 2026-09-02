import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const apiProxyTarget =
  process.env.API_PROXY_TARGET ??
  process.env.NEXT_PUBLIC_API_URL ??
  "https://admin.property973.com";

const nextConfig: NextConfig = {
  compiler: {
    styledComponents: true,
  },

  env: {
    NEXT_PUBLIC_PROJECT_ENV: process.env.NEXT_PUBLIC_PROJECT_ENV,
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
    NEXT_PUBLIC_API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL,
  },
  // images: {
  //   domains: ["fetishfinder-media.dryrun.click"],
  // },
  reactStrictMode: false,

  // Dev: browser can call same-origin /api-proxy/* or /api-backend/* → Next forwards to API.
  // Set NEXT_PUBLIC_API_URL=http://localhost:4000 for direct calls (recommended with Bearer auth).
  async rewrites() {
    if (!apiProxyTarget?.startsWith("http")) {
      return [];
    }
    const origin = apiProxyTarget.replace(/\/$/, "");
    return [
      {
        source: "/api-proxy/:path*",
        destination: `${origin}/:path*`,
      },
      {
        source: "/api-backend/:path*",
        destination: `${origin}/:path*`,
      },
    ];
  },
  // images: {
  //   remotePatterns: [
  //     {
  //       protocol: "https",
  //       hostname: "fetishfinder-media.dryrun.click",
  //       pathname: "**",
  //     },
  //   ],
  // },
  turbopack: {
    rules: {
      "*.svg": {
        loaders: ["@svgr/webpack"],
        as: "*.js",
      },
    },
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ["@svgr/webpack"],
    });
    return config;
  },
};

export default withNextIntl(nextConfig);
