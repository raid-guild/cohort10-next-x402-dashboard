import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";

const faqs = [
	{
		question: "What is x402?",
		answer:
			"x402 is an emerging standard for autonomous payments on blockchain networks like Base. It enables micro-payments (fractions of a cent) for API calls without requiring accounts, KYC, or centralized payment processors. Think of it as a cryptographic toll gate for your endpoints.",
	},
	{
		question: "Do I need to modify my existing API?",
		answer:
			"No. The x402 facilitator acts as a proxy in front of your API. You point it at your existing REST endpoints, and it handles payment validation before forwarding requests. Your backend code remains unchanged.",
	},
	{
		question: "How much does it cost to use?",
		answer:
			"The open-source facilitator is free to self-host. RaidGuild's hosted service offers a free tier for testing and development. Production tiers start at $29/month with volume discounts available. You set the per-API-call price your clients pay.",
	},
	{
		question: "What networks are supported?",
		answer:
			"Currently optimized for Base L2 with plans to support Optimism, Arbitrum, and other EVM-compatible chains. The protocol is chain-agnostic, so additional networks can be added via configuration.",
	},
	{
		question: "How do clients pay for API calls?",
		answer:
			"Clients include cryptographic payment proofs in request headers. These proofs are validated by the facilitator before forwarding the request. Payments settle on-chain automatically. No manual invoicing or payment collection needed.",
	},
	{
		question: "Is this production-ready?",
		answer:
			"Yes. The facilitator is battle-tested and includes monitoring, error handling, rate limiting, and comprehensive logging. RaidGuild's hosted service provides 99.9% uptime SLA for production customers.",
	},
	{
		question: "Can I use this with AI agents?",
		answer:
			"Absolutely. x402 is designed for autonomous agents that need to pay for API access without human intervention. Agents can generate payment proofs programmatically and make authenticated requests.",
	},
	{
		question: "What happens if a payment fails?",
		answer:
			"Failed payments are rejected before reaching your API. The facilitator returns a 402 Payment Required status with details. Your backend never processes unpaid requests, protecting your infrastructure.",
	},
	{
		question: "How do I monitor revenue and usage?",
		answer:
			"The dashboard provides real-time analytics: total revenue, calls per endpoint, payment success rates, and client breakdowns. You can also access raw data via the analytics API for custom reporting.",
	},
	{
		question: "Can I customize pricing per endpoint?",
		answer:
			"Yes. You can set different prices for different endpoints, implement tiered pricing, or use dynamic pricing based on request attributes. The facilitator supports flexible pricing rules via configuration.",
	},
];

export default function FAQSection() {
	return (
		<section className="container-custom py-16 md:py-24">
			<div className="mx-auto max-w-3xl">
				<div className="mb-12 text-center">
					<Badge variant="scroll" className="mb-4">
						FAQ
					</Badge>
					<h2 className="type-display-md mb-4">Frequently asked questions</h2>
					<p className="type-body-lg text-neutral-700 dark:text-neutral-300">
						Everything you need to know about the x402 facilitator. Can't find an answer?{" "}
						<a
							href="https://discord.gg/raidguild"
							target="_blank"
							rel="noopener noreferrer"
							className="text-moloch-500 hover:underline"
						>
							Ask in Discord
						</a>
						.
					</p>
				</div>

				<Accordion type="single" collapsible className="w-full">
					{faqs.map((faq, index) => (
						<AccordionItem key={Math.random()} value={`item-${index}`}>
							<AccordionTrigger className="type-heading-sm text-left">
								{faq.question}
							</AccordionTrigger>
							<AccordionContent className="type-body-base text-neutral-600 dark:text-neutral-400">
								{faq.answer}
							</AccordionContent>
						</AccordionItem>
					))}
				</Accordion>
			</div>
		</section>
	);
}
