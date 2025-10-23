import type { Metadata } from "next";
import { maziusDisplay, ebGaramond, ubuntuMono } from "@/lib/fonts";
import Header from "@/components/shared/Header";
import Footer from "@/components/shared/Footer";
import "./globals.css";

export const metadata: Metadata = {
  title: "Raid Guild",
  description: "We are slaying Moloch, one web3 build at a time.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${maziusDisplay.variable} ${ebGaramond.variable} ${ubuntuMono.variable} dark antialiased`}
      >
        <Header />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
