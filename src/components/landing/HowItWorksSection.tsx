import { CheckCircle2, Code2, Key, Zap } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

const steps = [
	{
		icon: Code2,
		step: "01",
		title: "Wrap Your API",
		description:
			"Point the facilitator at your existing REST API. No code changes required on your backend.",
		code: `curl https://facilitator.raidguild.org/api/your-endpoint \\
  -H "Authorization: Bearer YOUR_KEY"`,
	},
	{
		icon: Key,
		step: "02",
		title: "Generate API Keys",
		description:
			"Use the dashboard to create temporary or permanent API keys. Keys are hashed and never stored in plaintext.",
		code: `# Create a new API key
POST /api/keys
{ "name": "production", "rate": 0.0001 }`,
	},
	{
		icon: Zap,
		step: "03",
		title: "Clients Pay Per Call",
		description:
			"Clients include payment proof with each request. The facilitator validates and forwards to your API.",
		code: `# Client request with x402 payment
curl -X POST https://api.example.com/data \\
  -H "X-Payment-Proof: 0x..." \\
  -H "X-Payment-Amount: 0.0001"`,
	},
	{
		icon: CheckCircle2,
		step: "04",
		title: "Instant Settlement",
		description:
			"Payments settle on-chain in milliseconds. Monitor revenue in real-time through the dashboard.",
		code: `// Revenue analytics available via API
GET /api/analytics/revenue?period=daily`,
	},
];

export default function HowItWorksSection() {
	return (
		<section className="container-custom bg-neutral-50 py-16 md:py-24 dark:bg-neutral-900/50">
			<div className="mb-12 text-center">
				<Badge variant="moloch" className="mb-4">
					How It Works
				</Badge>
				<h2 className="type-display-md mb-4">
					From API to revenue in <span className="text-moloch-500">4 steps</span>
				</h2>
				<p className="type-body-lg mx-auto max-w-2xl text-neutral-700 dark:text-neutral-300">
					Deploy a production-ready payment gateway in minutes. No blockchain expertise required.
				</p>
			</div>

			<div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 lg:grid-cols-2">
				{steps.map((stepItem) => {
					const Icon = stepItem.icon;
					return (
						<Card
							key={stepItem.title}
							className="relative overflow-hidden border-2 transition-colors hover:border-moloch-500"
						>
							<div className="pointer-events-none absolute top-0 right-0 font-bold text-[120px] text-moloch-100/20 leading-none dark:text-moloch-900/20">
								{stepItem.step}
							</div>
							<CardContent className="relative z-10 p-6">
								<div className="mb-4 flex items-start gap-4">
									<div className="rounded-lg bg-moloch-500 p-3 text-white">
										<Icon className="h-6 w-6" />
									</div>
									<div>
										<div className="type-label mb-1 text-moloch-500">Step {stepItem.step}</div>
										<h3 className="type-heading-md mb-2">{stepItem.title}</h3>
										<p className="type-body-base text-neutral-600 dark:text-neutral-400">
											{stepItem.description}
										</p>
									</div>
								</div>
								<div className="mt-4 overflow-x-auto rounded-md bg-neutral-900 p-4 dark:bg-neutral-950">
									<pre className="type-body-sm font-mono text-scroll-300">
										<code>{stepItem.code}</code>
									</pre>
								</div>
							</CardContent>
						</Card>
					);
				})}
			</div>

			<div className="mt-12 text-center">
				<p className="type-body-base text-neutral-600 dark:text-neutral-400">
					Want to self-host?{" "}
					<a
						href="https://github.com/raid-guild/x402-facilitator"
						target="_blank"
						rel="noopener noreferrer"
						className="font-semibold text-moloch-500 hover:underline"
					>
						Check out the Go facilitator →
					</a>
				</p>
			</div>
		</section>
	);
}
