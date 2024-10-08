import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import MainLayout from "@/layouts";
import ProviderWrapper from "../componnets/ProviderWrapper";
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ProviderWrapper>
          <Toaster position="top-right" containerStyle={{ top: "40px" }} />
          <MainLayout>{children}</MainLayout>
        </ProviderWrapper>
      </body>
    </html>
  );
}
