"use client";

import Link from "next/link";
import { BackIcon } from "@/ui/Icons";
import { CTAButton } from "@/ui/elements";
import Header from "@/ui/Layout/Header";
import { useAuthenticatedUser } from "@/modules/auth";

export default function Account() {
  const { user } = useAuthenticatedUser();
  const account = {
    name: user ? user.name || user.email : "NN",
  };

  return (
    <div className="h-full max-w-[1920px] mx-auto transition-colors">
      <Header user={user} />

      <div className="relative flex flex-row items-start gap-2.5">
        <Link href="/dashboard" className="flex-1/5 py-4 px-5 flex flex-row items-center gap-5 text-gray-900 dark:text-white hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
          <BackIcon />
          <span>back</span>
        </Link>
        <div className="flex-1/5 flex flex-col gap-2.5">
          <div className="py-4 px-5 rounded-xl bg-white dark:bg-gray-800 transition-colors dark:text-white">
            <div className="font-semibold mb-1">Account</div>
            <div className="text-sm text-gray-500 dark:text-gray-400 mb-8">Manage your account&apos;s settings.</div>
            <div className="font-medium text-lg truncate">{account.name}</div>
          </div>

        </div>
        <div className="flex-1/5 py-4 px-5 rounded-xl">
        </div>
        <div className="flex-1/5 py-4 px-5 rounded-xl">
        </div>
        <div className="flex-1/5 py-4 px-5 rounded-xl">
        </div>
      </div>
    </div>
  );
}
