import { withSentryConfig } from "@sentry/nextjs";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // eslint: {
  //   ignoreDuringBuilds: true, // 빌드 시 ESLint 무시
  // },
  // typescript: {
  //   ignoreBuildErrors: true, // TypeScript 오류도 무시하려면
  // },
  images: {
    remotePatterns: [
      { hostname: "example.com" },
      { hostname: "team3-snack-s3.s3.ap-northeast-2.amazonaws.com" }, // 리전 추가
      { hostname: "d2e2ap87lbbw61.cloudfront.net" },
    ],
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    // 이미지 로딩 실패 시 fallback 처리를 위한 설정
    unoptimized: process.env.NODE_ENV === 'development', // 개발 환경에서는 최적화 비활성화
  },
};

export default withSentryConfig(nextConfig, {
  // For all available options, see:
  // https://www.npmjs.com/package/@sentry/webpack-plugin#options

  org: "de-cal",
  project: "snack-fe",

  // Only print logs for uploading source maps in CI
  silent: !process.env.CI,

  // For all available options, see:
  // https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/

  // Upload a larger set of source maps for prettier stack traces (increases build time)
  widenClientFileUpload: true,

  // Route browser requests to Sentry through a Next.js rewrite to circumvent ad-blockers.
  // This can increase your server load as well as your hosting bill.
  // Note: Check that the configured route will not match with your Next.js middleware, otherwise reporting of client-
  // side errors will fail.
  tunnelRoute: "/monitoring",

  // Automatically tree-shake Sentry logger statements to reduce bundle size
  disableLogger: true,

  // Enables automatic instrumentation of Vercel Cron Monitors. (Does not yet work with App Router route handlers.)
  // See the following for more information:
  // https://docs.sentry.io/product/crons/
  // https://vercel.com/docs/cron-jobs
  automaticVercelMonitors: true,
});
