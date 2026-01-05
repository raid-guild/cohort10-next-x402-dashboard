import { Code2, Gauge, GitBranch, Globe, Lock, Shield, Wallet, Zap } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const features = [
	{
		icon: Zap,
		title: "Instant Settlement",
		description:
			"Facilitator verifies and settles payments on-chain before forwarding requests.",
		badge: "Core",
	},
	{
		icon: Shield,
		title: "Non-Custodial",
		description:
			"Users sign authorizations; the facilitator submits transactions without holding keys.",
		badge: "Secure",
	},
	{
		icon: Code2,
		title: "Drop-In Integration",
		description:
			"Front your existing REST API with x402 requirements. No backend refactor needed.",
		badge: "Easy",
	},
	{
		icon: Wallet,
		title: "Gasless for Payers",
		description:
			"EIP-3009 authorizations let payers avoid gas while still settling on-chain.",
		badge: "Low Friction",
	},
	{
		icon: Lock,
		title: "Hosted or Self-Hosted",
		description: "Use the hosted Turnstile Pay flow or deploy the Go facilitator yourself.",
		badge: "Flexible",
	},
	{
		icon: GitBranch,
		title: "Open Source",
		description: "MIT licensed. Audit the code, fork it, extend it. No lock-in.",
		badge: "OSS",
	},
	{
		icon: Gauge,
		title: "High Performance",
		description:
			"Go-based facilitator built for low latency and high concurrency.",
		badge: "Fast",
	},
	{
		icon: Globe,
		title: "Base First",
		description:
			"Optimized for Base L2 today, with multi-chain support planned next.",
		badge: "Base",
	},
];

export default function FeaturesSection() {
	return (
		<section className="container-custom py-16 md:py-24">
			<div className="mb-12 text-center">
				<Badge variant="scroll" className="mb-4">
					Features
				</Badge>
				<h2 className="type-display-md mb-4">Infrastructure, not headache</h2>
				<p className="type-body-lg mx-auto max-w-2xl text-neutral-700 dark:text-neutral-300">
					Turnstile Pay removes the plumbing so you can focus on your product and your agents can
					pay instantly.
				</p>
			</div>

			<div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
				{features.map((feature) => {
					const Icon = feature.icon;
					return (
						<Card key={feature.title} className="group transition-colors hover:border-moloch-500">
							<CardHeader>
								<div className="mb-3 flex items-start justify-between">
									<div className="rounded-md bg-moloch-100 p-2 text-moloch-500 transition-colors group-hover:bg-moloch-500 group-hover:text-white dark:bg-moloch-800/20">
										<Icon className="h-6 w-6" />
									</div>
									<Badge variant="outline" className="text-xs">
										{feature.badge}
									</Badge>
								</div>
								<CardTitle className="type-heading-sm">{feature.title}</CardTitle>
							</CardHeader>
							<CardContent>
								<p className="type-body-sm text-neutral-600 dark:text-neutral-400">
									{feature.description}
								</p>
							</CardContent>
						</Card>
					);
				})}
			</div>
		</section>
	);
}
