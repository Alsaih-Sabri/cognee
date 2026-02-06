import classNames from "classnames";
import { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  as?: React.ElementType;
}

export default function IconButton({ as, children, className, ...props }: ButtonProps) {
  const Element = as || "button";

  return (
    <Element className={classNames("flex flex-row justify-center items-center gap-2 cursor-pointer rounded-xl bg-transparent p-[0.5rem] m-[-0.5rem] text-gray-900 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 dark:focus-visible:outline-indigo-500 transition-colors", className)} {...props}>{children}</Element>
  );
}
