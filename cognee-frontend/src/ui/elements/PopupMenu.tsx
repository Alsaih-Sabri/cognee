"use client";

import { useBoolean, useOutsideClick } from "@/utils";
import { MenuIcon } from "@/ui/Icons";
import { IconButton } from "@/ui/elements";
import classNames from 'classnames';

interface PopupMenuProps {
  children: React.ReactNode;
  triggerElement?: React.ReactNode;
  triggerClassName?: string;
  openToRight?: boolean;
}

export default function PopupMenu({ triggerElement, triggerClassName, children, openToRight = false }: PopupMenuProps) {
  const {
    value: isMenuOpen,
    setFalse: closeMenu,
    toggle: toggleMenu,
  } = useBoolean(false);

  const menuRootRef = useOutsideClick<HTMLDivElement>(closeMenu);

  return (
    <div className="relative inline-block" ref={menuRootRef}>
      <IconButton as="div" className={triggerClassName} onClick={toggleMenu}>
        {triggerElement || <MenuIcon />}
      </IconButton>

      {isMenuOpen && (
        <div
          className={
            classNames(
              "absolute top-full flex flex-col gap-1 py-1 min-w-[140px]",
              "whitespace-nowrap bg-white dark:bg-gray-800 border-1 border-gray-100 dark:border-gray-700 z-50",
              "rounded-lg shadow-lg ring-1 ring-black/5 dark:ring-white/10 overflow-hidden",
              {
                "left-0": openToRight,
                "right-0": !openToRight,
              },
            )
          }
        >
          {children}
        </div>
      )}
    </div>
  );
};
