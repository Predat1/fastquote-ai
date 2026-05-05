"use client";

import { motion, type HTMLMotionProps } from "framer-motion";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface ButtonProps extends HTMLMotionProps<"button"> {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
}

export default function Button({
  variant = "primary",
  size = "md",
  children,
  className,
  ...props
}: ButtonProps) {
  const variants = {
    primary: "bg-primary text-primary-foreground hover:bg-amber-400 shadow-[0_4px_0_rgb(180,130,10)] active:shadow-none active:translate-y-[2px]",
    secondary: "bg-secondary text-white hover:bg-slate-700 shadow-[0_4px_0_rgb(15,23,42)] active:shadow-none active:translate-y-[2px]",
    outline: "border-2 border-white/10 text-white hover:bg-white/5",
    ghost: "text-white/70 hover:text-white hover:bg-white/5",
  };

  const sizes = {
    sm: "px-4 py-2 text-xs uppercase tracking-widest",
    md: "px-8 py-4 text-sm font-black uppercase tracking-widest",
    lg: "px-10 py-5 text-base font-black uppercase tracking-widest",
  };

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={cn(
        "inline-flex items-center justify-center rounded-lg transition-all focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed border-b-0",
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {children}
    </motion.button>
  );
}
