<html>
  
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="../style.css">
    <base target="_parent">
    <title data-trilium-title>src/components/ui/sheet.tsx</title>
  </head>
  
  <body>
    <div class="content">
       <h1 data-trilium-h1>src/components/ui/sheet.tsx</h1>

      <div class="ck-content"><pre><code class="language-application-javascript-env-frontend">
"use client"

import * as React from "react"
import * as SheetPrimitive from "@radix-ui/react-dialog"
import { cva, type VariantProps } from "class-variance-authority"
import { X } from "lucide-react"

import { cn } from "@/lib/utils"

const Sheet = SheetPrimitive.Root

const SheetTrigger = SheetPrimitive.Trigger

const SheetClose = SheetPrimitive.Close

const SheetPortal = SheetPrimitive.Portal

const SheetOverlay = React.forwardRef&lt;
  React.ElementRef&lt;typeof SheetPrimitive.Overlay&gt;,
  React.ComponentPropsWithoutRef&lt;typeof SheetPrimitive.Overlay&gt;
&gt;(({ className, ...props }, ref) =&gt; (
  &lt;SheetPrimitive.Overlay
    className={cn(
      "fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className
    )}
    {...props}
    ref={ref}
  /&gt;
))
SheetOverlay.displayName = SheetPrimitive.Overlay.displayName

const sheetVariants = cva(
  "fixed z-50 gap-4 bg-background p-6 shadow-lg transition ease-in-out data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:duration-300 data-[state=open]:duration-500",
  {
    variants: {
      side: {
        top: "inset-x-0 top-0 border-b data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top",
        bottom:
          "inset-x-0 bottom-0 border-t data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom",
        left: "inset-y-0 left-0 h-full w-3/4 border-r data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left sm:max-w-sm",
        right:
          "inset-y-0 right-0 h-full w-3/4  border-l data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right sm:max-w-sm",
      },
    },
    defaultVariants: {
      side: "right",
    },
  }
)

interface SheetContentProps
  extends React.ComponentPropsWithoutRef&lt;typeof SheetPrimitive.Content&gt;,
    VariantProps&lt;typeof sheetVariants&gt; {}

const SheetContent = React.forwardRef&lt;
  React.ElementRef&lt;typeof SheetPrimitive.Content&gt;,
  SheetContentProps
&gt;(({ side = "right", className, children, ...props }, ref) =&gt; (
  &lt;SheetPortal&gt;
    &lt;SheetOverlay /&gt;
    &lt;SheetPrimitive.Content
      ref={ref}
      className={cn(sheetVariants({ side }), className)}
      {...props}
    &gt;
      {children}
      &lt;SheetPrimitive.Close className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-secondary"&gt;
        &lt;X className="h-4 w-4" /&gt;
        &lt;span className="sr-only"&gt;Close&lt;/span&gt;
      &lt;/SheetPrimitive.Close&gt;
    &lt;/SheetPrimitive.Content&gt;
  &lt;/SheetPortal&gt;
))
SheetContent.displayName = SheetPrimitive.Content.displayName

const SheetHeader = ({
  className,
  ...props
}: React.HTMLAttributes&lt;HTMLDivElement&gt;) =&gt; (
  &lt;div
    className={cn(
      "flex flex-col space-y-2 text-center sm:text-left",
      className
    )}
    {...props}
  /&gt;
)
SheetHeader.displayName = "SheetHeader"

const SheetFooter = ({
  className,
  ...props
}: React.HTMLAttributes&lt;HTMLDivElement&gt;) =&gt; (
  &lt;div
    className={cn(
      "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2",
      className
    )}
    {...props}
  /&gt;
)
SheetFooter.displayName = "SheetFooter"

const SheetTitle = React.forwardRef&lt;
  React.ElementRef&lt;typeof SheetPrimitive.Title&gt;,
  React.ComponentPropsWithoutRef&lt;typeof SheetPrimitive.Title&gt;
&gt;(({ className, ...props }, ref) =&gt; (
  &lt;SheetPrimitive.Title
    ref={ref}
    className={cn("text-lg font-semibold text-foreground", className)}
    {...props}
  /&gt;
))
SheetTitle.displayName = SheetPrimitive.Title.displayName

const SheetDescription = React.forwardRef&lt;
  React.ElementRef&lt;typeof SheetPrimitive.Description&gt;,
  React.ComponentPropsWithoutRef&lt;typeof SheetPrimitive.Description&gt;
&gt;(({ className, ...props }, ref) =&gt; (
  &lt;SheetPrimitive.Description
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  /&gt;
))
SheetDescription.displayName = SheetPrimitive.Description.displayName

export {
  Sheet,
  SheetPortal,
  SheetOverlay,
  SheetTrigger,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetFooter,
  SheetTitle,
  SheetDescription,
}
</code></pre>
      </div>
    </div>
  </body>

</html>