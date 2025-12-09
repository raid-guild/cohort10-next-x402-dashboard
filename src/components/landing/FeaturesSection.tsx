import { Code2, Gauge, GitBranch, Globe, Lock, Shield, Wallet, Zap } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const features = [
	{
		icon: Zap,
		title: "Instant Micropayments",
		description:
			"Charge fractions of a cent per API call. Payments settle in ~100ms with zero intermediaries.",
		badge: "Core Feature",
	},
	{
		icon: Shield,
		title: "Trustless & Private",
		description:
			"No KYC, no accounts, no centralized providers. Just cryptographic proof and settlement.",
		badge: "Privacy First",
	},
	{
		icon: Code2,
		title: "Developer-Friendly",
		description:
			"Drop-in integration with any REST API. Works with existing backends, no refactoring required.",
		badge: "Easy Setup",
	},
	{
		icon: Wallet,
		title: "Autonomous Agents Ready",
		description:
			"Built for the agentic economy. AI agents can pay for API access without human intervention.",
		badge: "Future-Proof",
	},
	{
		icon: Lock,
		title: "Self-Hosted or Managed",
		description: "Deploy your own facilitator or use RaidGuild's hosted service. Full flexibility.",
		badge: "Flexible",
	},
	{
		icon: GitBranch,
		title: "100% Open Source",
		description: "MIT licensed. Audit the code, fork it, extend it. No vendor lock-in, ever.",
		badge: "Open Source",
	},
	{
		icon: Gauge,
		title: "Production-Ready",
		description:
			"Battle-tested infrastructure with monitoring, logging, and error handling built in.",
		badge: "Reliable",
	},
	{
		icon: Globe,
		title: "Network Agnostic",
		description:
			"Optimized for Base L2 with low fees and fast finality. Multi-chain support coming soon.",
		badge: "Base Optimized",
	},
];

export default function FeaturesSection() {
	return (
		<section className="container-custom py-16 md:py-24">
			<div className="mb-12 text-center">
				<Badge variant="scroll" className="mb-4">
					Features
				</Badge>
				<h2 className="type-display-md mb-4">Everything you need to monetize APIs</h2>
				<p className="type-body-lg mx-auto max-w-2xl text-neutral-700 dark:text-neutral-300">
					A complete facilitator stack designed for developers who want to turn API access into
					revenue without the complexity of payment processing.
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
