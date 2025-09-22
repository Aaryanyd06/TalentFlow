// src/app/layout.tsx

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/Providers";
import { MSWComponent } from "@/components/MSWComponent";
import { Header } from "@/components/layout/header";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "TalentFlow",
  description: "A mini hiring platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <Providers>
          
          <MSWComponent>
            <div className="flex h-screen w-full flex-col">
              <Header />
              <div className="flex flex-1 overflow-hidden">
                <main className="flex-1 overflow-y-auto">{children}</main>
              </div>
            </div>
          </MSWComponent>
        </Providers>
      </body>
    </html>
  );
}