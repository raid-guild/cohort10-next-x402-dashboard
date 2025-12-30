import type { Metadata } from "next";
import { headers } from "next/headers";
import ContextProvider from "@/context";
import { ebGaramond, maziusDisplay, ubuntuMono } from "@/lib/fonts";
import { ThemeProvider } from "@/lib/theme-context";
import "./globals.css";

export const metadata: Metadata = {
	title: "RaidGuild x402 Facilitator | API Micropayments on Base",
	description:
		"Turn APIs into revenue streams with the RaidGuild x402 facilitator. Charge micro-payments for API calls instantly, trustlessly, and without signup friction.",
};

export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const cookies = (await headers()).get('cookie')

	return (
		<html lang="en" suppressHydrationWarning>
			<body
				className={`${maziusDisplay.variable} ${ebGaramond.variable} ${ubuntuMono.variable} antialiased`}
			>
				<ThemeProvider>
					<ContextProvider cookies={cookies}>
						{children}
					</ContextProvider>
				</ThemeProvider>
			</body>
		</html>
	);
}
