import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { siteConfig } from "@/config/site";
import { Toaster } from "sonner";

import { QueryProvider } from "@/providers/query-provider";
import { SheetProvider } from "@/providers/sheet-provider";
import ModalProvider from "@/components/modal-provider";
import ProtectedLayout from "@/components/layout/protected-layout";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: siteConfig.title,
    template: `%s | ${siteConfig.title}`
  },
  description: siteConfig.description,
  icons: [
    {
      url: "/logo.svg",
      href: "/logo.svg"
    }
  ]
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
      <body className={inter.className}>
        <QueryProvider>
          <ProtectedLayout>
            <SheetProvider />
            <Toaster />
            <ModalProvider />
            {children}
          </ProtectedLayout>
        </QueryProvider>
      </body>
    </html>
  );
}
