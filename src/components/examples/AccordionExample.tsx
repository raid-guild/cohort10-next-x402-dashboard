"use client";

import Link from "next/link";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export function AccordionExample() {
  return (
    <section id="accordion">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="type-heading-md">Accordion</h2>
        <div className="flex items-center gap-4">
          <Link
            href="#examples-top"
            className="type-body-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Back to top ↑
          </Link>
          <Link
            href="https://github.com/raid-guild/brand/blob/main/src/components/ui/accordion.tsx"
            className="type-body-sm text-primary hover:text-primary/80 transition-colors underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Source code →
          </Link>
          <Link
            href="https://github.com/raid-guild/brand/blob/main/src/components/examples/AccordionExample.tsx"
            className="type-body-sm text-primary hover:text-primary/80 transition-colors underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Example code →
          </Link>
        </div>
      </div>
      <div className="space-y-6">
        <div className="p-6 border border-border rounded-lg">
          <h3 className="type-heading-sm mb-4">Basic Accordion</h3>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>What is RaidGuild?</AccordionTrigger>
              <AccordionContent>
                RaidGuild is a decentralized collective of Web3 builders,
                designers, and operators who collaborate on projects to advance
                the ecosystem.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>How do I join RaidGuild?</AccordionTrigger>
              <AccordionContent>
                You can join RaidGuild by participating in our community,
                contributing to projects, and going through our onboarding
                process. Visit our website for more information.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>
                What services does RaidGuild offer?
              </AccordionTrigger>
              <AccordionContent>
                RaidGuild offers a range of services including smart contract
                development, frontend development, design, marketing, and
                consulting for Web3 projects.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>

        <div className="p-6 border border-border rounded-lg">
          <h3 className="type-heading-sm mb-4">Multiple Items Open</h3>
          <Accordion type="multiple" className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>First Item</AccordionTrigger>
              <AccordionContent>
                This is the content of the first accordion item. Multiple items
                can be open at the same time when using
                type=&quot;multiple&quot;.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>Second Item</AccordionTrigger>
              <AccordionContent>
                This is the content of the second accordion item. You can expand
                both items simultaneously.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>Third Item</AccordionTrigger>
              <AccordionContent>
                This is the content of the third accordion item. All items can
                be expanded or collapsed independently.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </section>
  );
}
