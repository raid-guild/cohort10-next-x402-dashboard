import { Badge } from "@/components/ui/badge";

const partyMembers = [
	{
		name: "Rome",
		classRole: "Cleric / Monk",
		responsibility: "Project Lead & Narrative",
	},
	{
		name: "Ryan",
		classRole: "Paladin",
		responsibility: "Backend Lead (Go Facilitator)",
	},
	{
		name: "Mike",
		classRole: "Ranger",
		responsibility: "Frontend Lead (Auth & Dashboard)",
	},
	{
		name: "Matt",
		classRole: "Bard",
		responsibility: "Design & Aesthetics",
	},
	{
		name: "Peyton",
		classRole: "Druid / Rogue",
		responsibility: "Wallet Auth & Backend Contributor",
	},
	{
		name: "Patrick",
		classRole: "Mage",
		responsibility: "Frontend & Documentation",
	},
	{
		name: "Duckanbro",
		classRole: "Wizard",
		responsibility: "Architecture Advisor",
	},
];

export default function PartySection() {
	return (
		<section className="container-custom py-16 md:py-24">
			<div className="mb-12 text-center">
				<Badge variant="moloch" className="mb-4">
					The Party
				</Badge>
				<h2 className="type-display-md mb-4">Raid Guild Cohort x402</h2>
				<p className="type-body-lg mx-auto max-w-2xl text-neutral-700 dark:text-neutral-300">
					Built by the Raid Guild December Cohort for the x402 Hackathon.
				</p>
			</div>

			<div className="mx-auto max-w-5xl overflow-hidden rounded-lg border border-neutral-200 bg-white dark:border-neutral-800 dark:bg-neutral-950">
				<table className="w-full border-collapse">
					<thead className="bg-neutral-50 text-left text-sm text-neutral-600 dark:bg-neutral-900">
						<tr>
							<th className="px-6 py-4 type-label">Name</th>
							<th className="px-6 py-4 type-label">Class</th>
							<th className="px-6 py-4 type-label">Responsibility</th>
						</tr>
					</thead>
					<tbody>
						{partyMembers.map((member, index) => (
							<tr
								key={member.name}
								className={index % 2 === 0 ? "bg-white dark:bg-neutral-950" : "bg-neutral-50/60 dark:bg-neutral-900/40"}
							>
								<td className="px-6 py-4 type-body-base text-neutral-900 dark:text-neutral-100">
									{member.name}
								</td>
								<td className="px-6 py-4 type-body-base text-neutral-700 dark:text-neutral-300">
									{member.classRole}
								</td>
								<td className="px-6 py-4 type-body-base text-neutral-700 dark:text-neutral-300">
									{member.responsibility}
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</section>
	);
}
