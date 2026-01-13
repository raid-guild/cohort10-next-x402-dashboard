import { CloudUpload, HeartHandshake } from "lucide-react";
import { Button } from "@/components/ui/button";

const DONATE_BASE_URL = "https://x402-donate.vercel.app";
const ONE_CLICK_DEPLOY_URL = "https://github.com/raid-guild/x402-facilitator-go";

export default function DeployPage() {
  return (
    <section className="container-custom py-16 md:py-24">
      <div className="mx-auto max-w-3xl space-y-10 text-center">
        <div className="space-y-4">
          <h1 className="type-display-md md:type-display-lg leading-tight">
            Ship your own x402 facilitator in one click
          </h1>
          <p className="type-body-lg text-neutral-700">
            Drop this service onto Vercel and get a fully hosted x402 facilitator without thinking about servers, SSL, or scaling. Click once, wire up your env vars, and you&apos;re ready to charge for API calls.
          </p>
        </div>

        <div className="space-y-2 text-neutral-700 md:text-base">
          <p>Perfect if you want to:</p>
          <ul className="list-disc list-inside text-left">
            <li>Turn on paid access for agents or backends fast</li>
            <li>Avoid babysitting infra, nodes, or TLS</li>
            <li>Let Vercel handle traffic spikes and HTTPS for you</li>
          </ul>
        </div>

        <div className="flex flex-col items-center justify-center gap-4 pt-4 sm:flex-row sm:justify-center">
          <Button
            size="lg"
            variant="primary"
            leftIcon={<CloudUpload className="h-4 w-4" />}
            asChild
          >
            <a
              href={ONE_CLICK_DEPLOY_URL}
              target="_blank"
              rel="noopener noreferrer"
            >
              One-click deploy
            </a>
          </Button>
          <Button
            size="lg"
            variant="secondary"
            leftIcon={<HeartHandshake className="h-4 w-4" />}
            asChild
          >
            <a
              href={(() => {
                const recipient = process.env.NEXT_PUBLIC_SERVICE_RECIPIENT_ADDRESS;
                return recipient ? `${DONATE_BASE_URL}/donate/${recipient}` : DONATE_BASE_URL;
              })()}
              target="_blank"
              rel="noopener noreferrer"
            >
              Buy us a coffee
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}
