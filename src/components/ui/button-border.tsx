"use client";
import React from "react";
import { Button, type ButtonProps } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface AnimatedBorderButtonProps extends ButtonProps {
  children: React.ReactNode;
  borderWidth?: number;
  duration?: number;
  glowColor?: string;
}

export const AnimatedBorderButton = React.forwardRef<
  HTMLButtonElement,
  AnimatedBorderButtonProps
>(
  (
    {
      children,
      className,
      variant = "outline",
      borderWidth = 20,
      duration = 4,
      glowColor = "via-[#4DA8DA] to-[#0284C7]",
      ...props
    },
    ref
  ) => {
    return (
      <Button
        ref={ref}
        variant={variant}
        className={cn(
          "relative overflow-hidden border border-cyan-500/30 bg-slate-950/60 text-white backdrop-blur-md transition-all hover:border-cyan-400 hover:shadow-[0_0_20px_rgba(77,168,218,0.3)]",
          className
        )}
        {...props}
      >
        <div
          className={cn(
            "-inset-px pointer-events-none absolute rounded-[inherit] border-2 border-transparent border-inset [mask-clip:padding-box,border-box]",
            "[mask-composite:intersect] [mask-image:linear-gradient(transparent,transparent),linear-gradient(#000,#000)]"
          )}
        >
          <motion.div
            className={cn(
              "absolute aspect-square bg-gradient-to-r from-transparent",
              glowColor
            )}
            animate={{
              offsetDistance: ["0%", "100%"],
            }}
            style={{
              width: borderWidth,
              offsetPath: `rect(0 auto auto 0 round ${borderWidth}px)`,
            }}
            transition={{
              repeat: Number.POSITIVE_INFINITY,
              duration: duration,
              ease: "linear",
            }}
          />
        </div>
        {children}
      </Button>
    );
  }
);

AnimatedBorderButton.displayName = "AnimatedBorderButton";

export function ButtonDemo() {
  return (
    <div className="flex flex-wrap gap-3">
      <AnimatedBorderButton>
        Animated Cyber Border
      </AnimatedBorderButton>
    </div>
  );
}
