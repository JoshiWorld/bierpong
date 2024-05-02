import "@/styles/globals.css";

import { Inter as FontSans } from "next/font/google";
import { TRPCReactProvider } from "@/trpc/react";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/theme-provider";
import { HeaderNav } from "@/components/header-nav";
import { Toaster } from "@/components/ui/toaster";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata = {
  title: "Bierpong - Turnier",
  description: "Von Joshua Stieber",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable,
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <HeaderNav />
          <TRPCReactProvider>
            <div className="mt-5">{children}</div>
          </TRPCReactProvider>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
