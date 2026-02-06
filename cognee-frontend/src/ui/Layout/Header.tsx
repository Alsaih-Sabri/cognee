"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect } from "react";
import { useBoolean, fetch, useDarkMode } from "@/utils";

import { CloseIcon, CloudIcon, CogneeIcon, MoonIcon, SunIcon } from "../Icons";
import { CTAButton, GhostButton, IconButton, Modal, StatusDot } from "../elements";
import syncData from "@/modules/cloud/syncData";

interface HeaderProps {
  user?: {
    name: string;
    email: string;
    picture: string;
  };
}

export default function Header({ user }: HeaderProps) {
  const {
    value: isSyncModalOpen,
    setTrue: openSyncModal,
    setFalse: closeSyncModal,
  } = useBoolean(false);

  const {
    value: isMCPConnected,
    setTrue: setMCPConnected,
    setFalse: setMCPDisconnected,
  } = useBoolean(false);

  const { isDarkMode, toggleDarkMode } = useDarkMode();

  const handleDataSyncConfirm = () => {
    syncData()
      .finally(() => {
        closeSyncModal();
      });
  };

  useEffect(() => {
    const checkMCPConnection = () => {
      fetch.checkMCPHealth()
        .then(() => setMCPConnected())
        .catch(() => setMCPDisconnected());
    };

    checkMCPConnection();
    const interval = setInterval(checkMCPConnection, 30000);

    return () => clearInterval(interval);
  }, [setMCPConnected, setMCPDisconnected]);

  return (
    <>
      <header className="relative flex flex-row h-14 min-h-14 px-5 items-center justify-between w-full max-w-[1920px] mx-auto dark:bg-gray-900 transition-colors">
        <div className="flex flex-row gap-4 items-center">
          <CogneeIcon className="text-indigo-600 dark:text-indigo-400" />
          <div className="text-lg text-gray-900 dark:text-white">Cognee Local</div>
        </div>

        <div className="flex flex-row items-center gap-2.5">
          <Link href="/mcp-status" className="!text-indigo-600 dark:!text-indigo-400 pl-4 pr-4">
            <StatusDot className="mr-2" isActive={isMCPConnected} />
            {isMCPConnected ? "MCP connected" : "MCP disconnected"}
          </Link>
          <GhostButton onClick={openSyncModal} className="text-indigo-600 dark:text-indigo-400 gap-3 pl-4 pr-4">
            <CloudIcon />
            <div>Sync</div>
          </GhostButton>

          <a href="https://platform.cognee.ai" className="!text-indigo-600 dark:!text-indigo-400 pl-4 pr-4">API keys</a>
          <IconButton
            onClick={toggleDarkMode}
            className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300"
            aria-label="Toggle dark mode"
          >
            {isDarkMode ? <SunIcon /> : <MoonIcon />}
          </IconButton>
          <Link href="/account" className="bg-indigo-600 dark:bg-indigo-700 w-8 h-8 rounded-full overflow-hidden">
            {user?.picture ? (
              <Image width="32" height="32" alt="Name of the user" src={user.picture} />
            ) : (
              <div className="w-8 h-8 rounded-full text-white flex items-center justify-center">
                {user?.email?.charAt(0) || "C"}
              </div>
            )}
          </Link>
        </div>
      </header>

      <Modal isOpen={isSyncModalOpen}>
        <div className="w-full max-w-2xl bg-white dark:bg-gray-800 p-8 rounded-xl shadow-2xl transition-colors dark:text-white">
          <div className="flex flex-row items-center justify-between">
            <span className="text-2xl font-semibold">Sync local datasets with cloud datasets?</span>
            <IconButton onClick={closeSyncModal}><CloseIcon /></IconButton>
          </div>
          <div className="mt-8 mb-6 text-gray-600 dark:text-gray-300">Are you sure you want to sync local datasets to cloud?</div>
          <div className="flex flex-row gap-4 mt-8 justify-end">
            <GhostButton type="button" onClick={closeSyncModal}>Cancel</GhostButton>
            <CTAButton onClick={handleDataSyncConfirm} type="submit">Confirm</CTAButton>
          </div>
        </div>
      </Modal>
    </>
  );
}
