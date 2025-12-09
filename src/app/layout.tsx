import type { Metadata } from "next";
import Footer from "@/components/shared/Footer";
import Header from "@/components/shared/Header";
import { ebGaramond, maziusDisplay, ubuntuMono } from "@/lib/fonts";
import { ThemeProvider } from "@/lib/theme-context";
import "./globals.css";

export const metadata: Metadata = {
	title: "RaidGuild x402 Facilitator | API Micropayments on Base",
	description:
		"Turn APIs into revenue streams with the RaidGuild x402 facilitator. Charge micro-payments for API calls instantly, trustlessly, and without signup friction.",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" suppressHydrationWarning>
			<body
				className={`${maziusDisplay.variable} ${ebGaramond.variable} ${ubuntuMono.variable} antialiased`}
			>
				<ThemeProvider>
					<Header />
					<main className="min-h-screen">{children}</main>
					<Footer />
				</ThemeProvider>
			</body>
		</html>
	);
}
