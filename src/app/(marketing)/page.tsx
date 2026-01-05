import FAQSection from "@/components/landing/FAQSection";
import FeaturesSection from "@/components/landing/FeaturesSection";
import HeroSection from "@/components/landing/HeroSection";
import HowItWorksSection from "@/components/landing/HowItWorksSection";
import PartySection from "@/components/landing/PartySection";

export default function Home() {
	return (
		<>
			<HeroSection />
			<FeaturesSection />
			<HowItWorksSection />
			<PartySection />
			<FAQSection />
		</>
	);
}
