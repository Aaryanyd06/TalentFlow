import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { MSWComponent } from "@/components/MSWComponent";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
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
        <MSWComponent />
        <main>{children}</main>
        <Toaster richColors />
      </body>
    </html>
  );
}