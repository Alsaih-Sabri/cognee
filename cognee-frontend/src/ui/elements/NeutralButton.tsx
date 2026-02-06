import classNames from "classnames";
import { ButtonHTMLAttributes } from "react";

export default function NeutralButton({ children, className, ...props }: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button className={classNames("flex flex-row justify-center items-center gap-2 cursor-pointer rounded-3xl bg-transparent px-10 h-8 text-indigo-600 dark:text-indigo-400 border border-indigo-600 dark:border-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 dark:focus-visible:outline-indigo-500 transition-colors", className)} {...props}>{children}</button>
  );
}
