"use client";

import Link from "next/link";
import { BackIcon, CheckIcon } from "@/ui/Icons";
import { CTAButton, NeutralButton } from "@/ui/elements";
import Header from "@/ui/Layout/Header";
import { useAuthenticatedUser } from "@/modules/auth";

export default function Plan() {
  const { user } = useAuthenticatedUser();

  return (
    <div className="h-full max-w-[1920px] mx-auto transition-colors">
      <Header user={user} />

      <div className="relative flex flex-row items-start justify-stretch gap-2.5">
        <div className="flex-1/5 h-full">
          <div className="flex flex-col justify-between">
            <Link href="/dashboard" className="py-4 px-5 flex flex-row items-center gap-5 text-gray-900 dark:text-white hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
              <BackIcon />
              <span>back</span>
            </Link>
          </div>
        </div>

        <div className="flex-3/5">
          <div className="bg-white dark:bg-gray-800 rounded-xl px-5 py-5 mb-2 transition-colors dark:text-white">
            Affordable and transparent pricing
          </div>

          <div className="grid grid-cols-3 gap-x-2.5">
            <div className="pt-13 py-4 px-5 mb-2.5 rounded-tl-xl rounded-tr-xl bg-white dark:bg-gray-800 transition-colors h-full dark:text-white">
              <div>Basic</div>
              <div className="text-[1.75rem] mb-4 font-bold">Free</div>
            </div>

            <div className="pt-5 py-4 px-5 mb-2.5 rounded-tl-xl rounded-tr-xl bg-white dark:bg-gray-800 transition-colors h-full border-indigo-600 dark:border-indigo-500 border-1 border-b-0 dark:text-white">
              <div className="text-indigo-600 dark:text-indigo-400 mb-5 text-xs font-black">Most Popular</div>
              <div>On-prem Subscription</div>
              <div className="mb-2"><span className="text-[1.75rem] font-bold">$2470</span><span className="text-gray-400 dark:text-gray-500"> /per month</span></div>
              <div className=""><span className="font-black">Save 20% </span>yearly</div>
            </div>

            <div className="pt-13 py-4 px-5 mb-2.5 rounded-tl-xl rounded-tr-xl bg-white dark:bg-gray-800 transition-colors h-full dark:text-white">
              <div>Cloud Subscription</div>
              <div className="mb-2"><span className="text-[1.75rem] font-bold">$25</span><span className="text-gray-400 dark:text-gray-500"> /per month</span></div>
              <div className=" text-gray-400 dark:text-gray-500">(beta pricing)</div>
            </div>

            <div className="bg-white dark:bg-gray-800 transition-colors rounded-bl-xl rounded-br-xl h-full py-4 px-5 dark:text-white">
              <div className="mb-2 invisible">Everything in the free plan, plus...</div>
              <div className="flex flex-col gap-3 mb-28">
                <div className="flex flex-row gap-2 leading-5"><CheckIcon className="mt-1 shrink-0 text-indigo-600 dark:text-indigo-400" />License to use Cognee open source</div>
                <div className="flex flex-row gap-2 leading-5"><CheckIcon className="mt-1 shrink-0 text-indigo-600 dark:text-indigo-400" />Cognee tasks and pipelines</div>
                <div className="flex flex-row gap-2 leading-5"><CheckIcon className="mt-1 shrink-0 text-indigo-600 dark:text-indigo-400" />Custom schema and ontology generation</div>
                <div className="flex flex-row gap-2 leading-5"><CheckIcon className="mt-1 shrink-0 text-indigo-600 dark:text-indigo-400" />Integrated evaluations</div>
                <div className="flex flex-row gap-2 leading-5"><CheckIcon className="mt-1 shrink-0 text-indigo-600 dark:text-indigo-400" />More than 28 data sources supported</div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 transition-colors rounded-bl-xl rounded-br-xl border-indigo-600 dark:border-indigo-500 border-1 border-t-0 h-full py-4 px-5 dark:text-white">
              <div className="mb-2 text-gray-400 dark:text-gray-500">Everything in the free plan, plus...</div>
              <div className="flex flex-col gap-3 mb-4">
                <div className="flex flex-row gap-2 leading-5"><CheckIcon className="mt-1 shrink-0 text-indigo-600 dark:text-indigo-400" />License to use Cognee open source and Cognee Platform</div>
                <div className="flex flex-row gap-2 leading-5"><CheckIcon className="mt-1 shrink-0 text-indigo-600 dark:text-indigo-400" />1 day SLA</div>
                <div className="flex flex-row gap-2 leading-5"><CheckIcon className="mt-1 shrink-0 text-indigo-600 dark:text-indigo-400" />On-prem deployment</div>
                <div className="flex flex-row gap-2 leading-5"><CheckIcon className="mt-1 shrink-0 text-indigo-600 dark:text-indigo-400" />Hands-on support</div>
                <div className="flex flex-row gap-2 leading-5"><CheckIcon className="mt-1 shrink-0 text-indigo-600 dark:text-indigo-400" />Architecture review</div>
                <div className="flex flex-row gap-2 leading-5"><CheckIcon className="mt-1 shrink-0 text-indigo-600 dark:text-indigo-400" />Roadmap prioritization</div>
                <div className="flex flex-row gap-2 leading-5"><CheckIcon className="mt-1 shrink-0 text-indigo-600 dark:text-indigo-400" />Knowledge transfer</div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 transition-colors rounded-bl-xl rounded-br-xl h-full py-4 px-5 dark:text-white">
              <div className="mb-2 text-gray-400 dark:text-gray-500">Everything in the free plan, plus...</div>
              <div className="flex flex-col gap-3 mb-4">
                <div className="flex flex-row gap-2 leading-5"><CheckIcon className="mt-1 shrink-0 text-indigo-600 dark:text-indigo-400" />Fully hosted cloud platform</div>
                <div className="flex flex-row gap-2 leading-5"><CheckIcon className="mt-1 shrink-0 text-indigo-600 dark:text-indigo-400" />Multi-tenant architecture</div>
                <div className="flex flex-row gap-2 leading-5"><CheckIcon className="mt-1 shrink-0 text-indigo-600 dark:text-indigo-400" />Comprehensive API endpoints</div>
                <div className="flex flex-row gap-2 leading-5"><CheckIcon className="mt-1 shrink-0 text-indigo-600 dark:text-indigo-400" />Automated scaling and parallel processing</div>
                <div className="flex flex-row gap-2 leading-5"><CheckIcon className="mt-1 shrink-0 text-indigo-600 dark:text-indigo-400" />Ability to group memories per user and domain</div>
                <div className="flex flex-row gap-2 leading-5"><CheckIcon className="mt-1 shrink-0 text-indigo-600 dark:text-indigo-400" />Automatic updates and priority support</div>
                <div className="flex flex-row gap-2 leading-5"><CheckIcon className="mt-1 shrink-0 text-indigo-600 dark:text-indigo-400" />1 GB ingestion + 10,000 API calls</div>
              </div>
            </div>

            <div className="pt-4 pb-14 mb-2.5">
              <a href="https://www.github.com/topoteretes/cognee" target="_blank">
                <NeutralButton className="w-full">Try for free</NeutralButton>
              </a>
            </div>

            <div className="pt-4 pb-14 mb-2.5">
              <a href="https://www.cognee.ai/contact-us" target="_blank">
                <CTAButton className="w-full">Talk to us</CTAButton>
              </a>
            </div>

            <div className="pt-4 pb-14 mb-2.5">
              <a href="https://platform.cognee.ai" target="_blank">
                <NeutralButton className="w-full">Sign up for Cogwit Beta</NeutralButton>
              </a>
            </div>
          </div>

          <div className="grid grid-cols-4 py-4 px-5 mb-4 dark:text-white">
            <div>Feature Comparison</div>
            <div className="text-center">Basic</div>
            <div className="text-center">On-prem</div>
            <div className="text-center">Cloud</div>
          </div>
          <div className="grid grid-cols-4 py-1 px-5 mb-12 bg-white dark:bg-gray-800 transition-colors rounded-xl leading-[1] dark:text-white">
            <div className="border-b-[1px] border-b-gray-100 dark:border-b-gray-700 py-3">Data Sources</div>
            <div className="text-center border-b-[1px] border-b-gray-100 dark:border-b-gray-700 py-3">28+</div>
            <div className="text-center border-b-[1px] border-b-gray-100 dark:border-b-gray-700 py-3">28+</div>
            <div className="text-center border-b-[1px] border-b-gray-100 dark:border-b-gray-700 py-3">28+</div>

            <div className="border-b-[1px] border-b-gray-100 dark:border-b-gray-700 py-3">Deployment</div>
            <div className="text-center border-b-[1px] border-b-gray-100 dark:border-b-gray-700 py-3">Self-hosted</div>
            <div className="text-center border-b-[1px] border-b-gray-100 dark:border-b-gray-700 py-3">On-premise</div>
            <div className="text-center border-b-[1px] border-b-gray-100 dark:border-b-gray-700 py-3">Cloud</div>

            <div className="border-b-[1px] border-b-gray-100 dark:border-b-gray-700 py-3">API Calls</div>
            <div className="text-center border-b-[1px] border-b-gray-100 dark:border-b-gray-700 py-3">Limited</div>
            <div className="text-center border-b-[1px] border-b-gray-100 dark:border-b-gray-700 py-3">Unlimited</div>
            <div className="text-center border-b-[1px] border-b-gray-100 dark:border-b-gray-700 py-3">10,000</div>

            <div className="border-b-[1px] border-b-gray-100 dark:border-b-gray-700 py-3">Support</div>
            <div className="text-center border-b-[1px] border-b-gray-100 dark:border-b-gray-700 py-3">Community</div>
            <div className="text-center border-b-[1px] border-b-gray-100 dark:border-b-gray-700 py-3">Hands-on</div>
            <div className="text-center border-b-[1px] border-b-gray-100 dark:border-b-gray-700 py-3">Priority</div>

            <div className="py-3">SLA</div>
            <div className="text-center py-3">—</div>
            <div className="text-center py-3">1 day</div>
            <div className="text-center py-3">Standard</div>
          </div>

          <div className="grid grid-cols-2 gap-x-2.5 gap-y-2.5 mb-12">
            <div className="bg-white dark:bg-gray-800 transition-colors py-4 px-5 rounded-xl dark:text-white">
              <div>Can I change my plan anytime?</div>
              <div className="text-gray-500 dark:text-gray-400 mt-6">Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately.</div>
            </div>
            <div className="bg-white dark:bg-gray-800 transition-colors py-4 px-5 rounded-xl dark:text-white">
              <div>What happens to my data if I downgrade?</div>
              <div className="text-gray-500 dark:text-gray-400 mt-6">Your data is preserved, but features may be limited based on your new plan constraints.</div>
            </div>
            <div className="bg-white dark:bg-gray-800 transition-colors py-4 px-5 rounded-xl dark:text-white">
              <div>Do you offer educational discounts?</div>
              <div className="text-gray-500 dark:text-gray-400 mt-6">Yes, we offer special pricing for educational institutions and students. Contact us for details.</div>
            </div>
            <div className="bg-white dark:bg-gray-800 transition-colors py-4 px-5 rounded-xl dark:text-white">
              <div>Is there a free trial for paid plans?</div>
              <div className="text-gray-500 dark:text-gray-400 mt-6">All new accounts start with a 14-day free trial of our Pro plan features.</div>
            </div>
          </div>
        </div>

        <div className="flex-1/5 h-full text-center flex flex-col self-end mb-12 max-w-[1920px]">
          <div className="fixed bottom-6 w-[calc(min(1920px,100%)/5)] mx-auto">
            <div className="text-sm mb-2 dark:text-white">Need a custom solution?</div>
            <CTAButton className="w-full">Contact us</CTAButton>
          </div>
        </div>
      </div>
    </div>
  );
}
