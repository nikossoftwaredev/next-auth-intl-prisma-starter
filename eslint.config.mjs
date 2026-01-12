import { FlatCompat } from "@eslint/eslintrc";
import simpleImportSort from "eslint-plugin-simple-import-sort";

const compat = new FlatCompat({
  // import.meta.dirname is available after Node.js v20.11.0
  baseDirectory: import.meta.dirname,
});

const eslintConfig = [
  ...compat.config({
    extends: ["next/core-web-vitals", "next/typescript"],
  }),
  {
    plugins: {
      "simple-import-sort": simpleImportSort,
    },
    rules: {
      "simple-import-sort/imports": "warn",
      "simple-import-sort/exports": "warn",
      // Prevent nested ternary operators for better readability
      "no-nested-ternary": "error",
      // Disable TypeScript comment and any rules for generated API client files
      "@typescript-eslint/ban-ts-comment": "off",
      "@typescript-eslint/no-explicit-any": "off",
      // Custom rules to enforce using internationalized navigation
      "no-restricted-imports": [
        "warn",
        {
          name: "next/link",
          message:
            "Please use Link from '@/lib/i18n/navigation' instead of 'next/link' for internationalization support.",
        },
        {
          name: "next/navigation",
          importNames: ["redirect", "usePathname", "useRouter"],
          message:
            "Please use redirect, usePathname, useRouter from '@/lib/i18n/navigation' instead of 'next/navigation' for internationalization support.",
        },
        {
          name: "next/router",
          message:
            "Please use router from '@/lib/i18n/navigation' instead of 'next/router' for internationalization support.",
        },
        {
          name: "@/lib/api/client",
          message:
            "Please use functions from '@/lib/api/api-wrapper' instead of importing directly from '@/lib/api/client'. The api-wrapper provides a cleaner interface and better error handling.",
        },
      ],
    },
  },
];

export default eslintConfig;
