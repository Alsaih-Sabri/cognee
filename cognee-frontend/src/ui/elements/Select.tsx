import classNames from "classnames";
import { SelectHTMLAttributes } from "react";
import { CaretIcon } from "../Icons";

export default function Select({ children, className, ...props }: SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <div className="relative">
      <select
        className={
          classNames(
            "block w-full appearance-none rounded-3xl bg-white dark:bg-gray-800 pl-4 pr-8 h-8 text-base text-gray-900 dark:text-white outline-1 -outline-offset-1 outline-gray-300 dark:outline-gray-600 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 dark:focus:outline-indigo-500 transition-colors",
            className,
          )
        }
        {...props}
      >
        {children}
      </select>
      <span className="pointer-events-none absolute top-1/3 -mt-0.5 right-3 text-indigo-600 dark:text-indigo-400 rotate-180">
        <CaretIcon />
      </span>
    </div>
  );
}
