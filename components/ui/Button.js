import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex cursor-pointer items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow-xs hover:bg-primary/90",
        destructive:
          "bg-destructive text-white shadow-xs hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline:
          "border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50",
        secondary:
          "bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80",
        ghost:
          "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",
        link: "text-primary underline-offset-4 hover:underline",
        // Action button variations
        add: "bg-green-600 text-white shadow-xs hover:bg-green-700 focus-visible:ring-green-500/20",
        delete:
          "bg-red-600 text-white shadow-xs hover:bg-red-700 focus-visible:ring-red-500/20",
        view: "bg-blue-600 text-white shadow-xs hover:bg-blue-700 focus-visible:ring-blue-500/20",
        edit: "bg-yellow-600 text-white shadow-xs hover:bg-yellow-700 focus-visible:ring-yellow-500/20",
        send: "bg-purple-600 text-white shadow-xs hover:bg-purple-700 focus-visible:ring-purple-500/20",
        download:
          "bg-indigo-600 text-white shadow-xs hover:bg-indigo-700 focus-visible:ring-indigo-500/20",
        upload:
          "bg-emerald-600 text-white shadow-xs hover:bg-emerald-700 focus-visible:ring-emerald-500/20",
        save: "bg-teal-600 text-white shadow-xs hover:bg-teal-700 focus-visible:ring-teal-500/20",
        cancel:
          "bg-gray-600 text-white shadow-xs hover:bg-gray-700 focus-visible:ring-gray-500/20",
        // Ghost action variations for icon buttons
        "ghost-add": "text-green-600 hover:text-green-700 hover:bg-green-50",
        "ghost-delete": "text-red-600 hover:text-red-700 hover:bg-red-50",
        "ghost-view": "text-blue-600 hover:text-blue-700 hover:bg-blue-50",
        "ghost-edit":
          "text-yellow-600 hover:text-yellow-700 hover:bg-yellow-50",
        "ghost-send":
          "text-purple-600 hover:text-purple-700 hover:bg-purple-50",
        "ghost-download":
          "text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50",
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
        icon: "size-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

function Button({ className, variant, size, asChild = false, ...props }) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
