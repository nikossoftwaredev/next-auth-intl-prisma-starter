"use client";

import { NextIntlClientProvider, AbstractIntlMessages } from "next-intl";
import { ThemeProvider } from "./theme-provider";

type Props = {
  children: React.ReactNode;
  messages: AbstractIntlMessages;
  locale: string;
};

export function Providers({ children, messages, locale }: Props) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <NextIntlClientProvider messages={messages} locale={locale}>
        {children}
      </NextIntlClientProvider>
    </ThemeProvider>
  );
}
