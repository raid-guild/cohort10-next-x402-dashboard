"use client";

import { ArrowRight, BookOpen, Github } from "lucide-react";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { docsUrl } from "@/config";

const HERO_IMAGES = [
	"/assets/webp/1440x1440/warriors-magic-c.webp",
	"/assets/webp/1440x1440/forge-fire-c.webp",
	"/assets/webp/1440x1440/portal-arch-c.webp",
	"/assets/webp/1440x1440/warriors-orbs-c.webp",
	"/assets/webp/1440x1440/trio-orb-c.webp",
	"/assets/webp/1080x1440/tower-platform-c.webp",
	"/assets/webp/1440x1440/warriors-forward-c.webp",
	"/assets/webp/1440x1440/tree-mech-c.webp",
];

export default function HeroSection() {
	const facilitatorUrl = process.env.NEXT_PUBLIC_FACILITATOR_URL;

	// Calculate current image based on 2-minute intervals
	const getImageForInterval = useCallback(() => {
		const interval = Math.floor(Date.now() / (1000 * 60 * 2)); // 2 minutes
		return HERO_IMAGES[interval % HERO_IMAGES.length];
	}, []);

	const [currentImage, setCurrentImage] = useState<string>(getImageForInterval);

	// Update image every minute to catch 2-minute boundaries
	useEffect(() => {
		const checkImage = () => {
			const newImage = getImageForInterval();
			if (newImage !== currentImage) {
				setCurrentImage(newImage);
			}
		};

		const intervalId = setInterval(checkImage, 60000); // Check every minute

		return () => clearInterval(intervalId);
	}, [currentImage, getImageForInterval]);

	return (
		<div className="container-custom py-16 md:py-24">
			<div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
				{/* Left Column - Text Content */}
				<div className="flex flex-col justify-center space-y-6">
					<Badge variant="moloch" className="w-fit">
						RaidGuild x402 Turnstile Pay
					</Badge>

					<h1 className="type-display-lg md:type-display-md leading-tight">
						The missing payment layer for the{" "}
						<span className="text-moloch-500">agent economy</span>
					</h1>

					<p className="type-body-lg max-w-xl text-neutral-700 dark:text-neutral-300">
						Humans have Stripe. AI agents have nothing. Turnstile Pay is a hosted x402 facilitator
						that absorbs wallet and signature complexity so your agents can pay instantly.
					</p>

					<div className="flex flex-col gap-4 pt-4 sm:flex-row">
						<Button size="sm" variant="primary" rightIcon={<ArrowRight />} asChild>
							<a href="/login">Get Your API Key</a>
						</Button>
						<Button size="sm" variant="secondary" leftIcon={<BookOpen />} asChild>
							<a href={docsUrl} target="_blank" rel="noopener noreferrer">
								Read Docs
							</a>
						</Button>
						<Button size="sm" variant="secondary" leftIcon={<Github />} asChild>
							<a
								href="https://github.com/raid-guild/x402-facilitator-go"
								target="_blank"
								rel="noopener noreferrer"
							>
								View Repo
							</a>
						</Button>
					</div>

					<div className="flex items-center gap-8 pt-4 text-neutral-600 text-sm dark:text-neutral-400">
						<div>
							<div className="type-display-sm text-moloch-500">5 USDC</div>
							<div className="type-label">Key Price</div>
						</div>
						<div>
							<div className="type-display-sm text-moloch-500">30 Days</div>
							<div className="type-label">Key Validity</div>
						</div>
						<div>
							<div className="type-display-sm text-moloch-500">Base</div>
							<div className="type-label">Chain</div>
						</div>
					</div>

					{facilitatorUrl && (
						<div className="mt-6 rounded-lg border border-neutral-200 bg-neutral-50 px-4 py-3 text-sm text-neutral-700 dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-300">
							<span className="type-label text-neutral-500 dark:text-neutral-400">Hosted Facilitator</span>
							<div className="mt-1 font-mono text-sm text-neutral-900 dark:text-neutral-100">
								<a
									href={facilitatorUrl}
									target="_blank"
									rel="noopener noreferrer"
									className="hover:underline"
								>
									{facilitatorUrl}
								</a>
							</div>
						</div>
					)}
				</div>

				{/* Right Column - Image */}
				<div className="flex justify-center lg:justify-end">
					<div className="relative aspect-3/4 w-full max-w-[500px] overflow-hidden rounded-lg shadow-2xl">
						<Image
							key={currentImage}
							src={currentImage}
							alt="RaidGuild x402 Facilitator"
							fill
							className="object-cover"
							priority
						/>
					</div>
				</div>
			</div>
		</div>
	);
}
