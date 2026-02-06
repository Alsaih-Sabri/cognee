import classNames from "classnames";
import { ButtonHTMLAttributes } from "react";

export default function GhostButton({ children, className, ...props }: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button className={classNames("flex flex-row justify-center items-center gap-2 cursor-pointer rounded-3xl bg-transparent px-10 h-8 text-gray-900 dark:text-gray-100 hover:bg-gray-200 dark:hover:bg-gray-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 dark:focus-visible:outline-indigo-500 transition-colors", className)} {...props}>{children}</button>
  );
}
