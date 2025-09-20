import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { MSWComponent } from "@/components/MSWComponent";
import { Providers } from "@/components/Providers";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Header } from "@/components/layout/header";
import { Sidebar } from "@/components/layout/sidebar";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "TalentFlow",
  description: "A mini hiring platform for managing jobs and candidates.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Providers>
            <MSWComponent />
            <div className="flex h-screen w-full flex-col">
              <Header />
              <div className="flex flex-1 overflow-hidden">
                <Sidebar />
                <div className="flex-1 overflow-y-auto">
                  {children}
                </div>
              </div>
            </div>
            <Toaster richColors />
          </Providers>
        </ThemeProvider>
      </body>
    </html>
  );
}