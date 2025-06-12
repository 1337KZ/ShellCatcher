<html>
  
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="../style.css">
    <base target="_parent">
    <title data-trilium-title>src/components/ui/alert-dialog.tsx</title>
  </head>
  
  <body>
    <div class="content">
       <h1 data-trilium-h1>src/components/ui/alert-dialog.tsx</h1>

      <div class="ck-content"><pre><code class="language-application-javascript-env-frontend">
"use client"

import * as React from "react"
import * as AlertDialogPrimitive from "@radix-ui/react-alert-dialog"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"

const AlertDialog = AlertDialogPrimitive.Root

const AlertDialogTrigger = AlertDialogPrimitive.Trigger

const AlertDialogPortal = AlertDialogPrimitive.Portal

const AlertDialogOverlay = React.forwardRef&lt;
  React.ElementRef&lt;typeof AlertDialogPrimitive.Overlay&gt;,
  React.ComponentPropsWithoutRef&lt;typeof AlertDialogPrimitive.Overlay&gt;
&gt;(({ className, ...props }, ref) =&gt; (
  &lt;AlertDialogPrimitive.Overlay
    className={cn(
      "fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className
    )}
    {...props}
    ref={ref}
  /&gt;
))
AlertDialogOverlay.displayName = AlertDialogPrimitive.Overlay.displayName

const AlertDialogContent = React.forwardRef&lt;
  React.ElementRef&lt;typeof AlertDialogPrimitive.Content&gt;,
  React.ComponentPropsWithoutRef&lt;typeof AlertDialogPrimitive.Content&gt;
&gt;(({ className, ...props }, ref) =&gt; (
  &lt;AlertDialogPortal&gt;
    &lt;AlertDialogOverlay /&gt;
    &lt;AlertDialogPrimitive.Content
      ref={ref}
      className={cn(
        "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg",
        className
      )}
      {...props}
    /&gt;
  &lt;/AlertDialogPortal&gt;
))
AlertDialogContent.displayName = AlertDialogPrimitive.Content.displayName

const AlertDialogHeader = ({
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
AlertDialogHeader.displayName = "AlertDialogHeader"

const AlertDialogFooter = ({
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
AlertDialogFooter.displayName = "AlertDialogFooter"

const AlertDialogTitle = React.forwardRef&lt;
  React.ElementRef&lt;typeof AlertDialogPrimitive.Title&gt;,
  React.ComponentPropsWithoutRef&lt;typeof AlertDialogPrimitive.Title&gt;
&gt;(({ className, ...props }, ref) =&gt; (
  &lt;AlertDialogPrimitive.Title
    ref={ref}
    className={cn("text-lg font-semibold", className)}
    {...props}
  /&gt;
))
AlertDialogTitle.displayName = AlertDialogPrimitive.Title.displayName

const AlertDialogDescription = React.forwardRef&lt;
  React.ElementRef&lt;typeof AlertDialogPrimitive.Description&gt;,
  React.ComponentPropsWithoutRef&lt;typeof AlertDialogPrimitive.Description&gt;
&gt;(({ className, ...props }, ref) =&gt; (
  &lt;AlertDialogPrimitive.Description
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  /&gt;
))
AlertDialogDescription.displayName =
  AlertDialogPrimitive.Description.displayName

const AlertDialogAction = React.forwardRef&lt;
  React.ElementRef&lt;typeof AlertDialogPrimitive.Action&gt;,
  React.ComponentPropsWithoutRef&lt;typeof AlertDialogPrimitive.Action&gt;
&gt;(({ className, ...props }, ref) =&gt; (
  &lt;AlertDialogPrimitive.Action
    ref={ref}
    className={cn(buttonVariants(), className)}
    {...props}
  /&gt;
))
AlertDialogAction.displayName = AlertDialogPrimitive.Action.displayName

const AlertDialogCancel = React.forwardRef&lt;
  React.ElementRef&lt;typeof AlertDialogPrimitive.Cancel&gt;,
  React.ComponentPropsWithoutRef&lt;typeof AlertDialogPrimitive.Cancel&gt;
&gt;(({ className, ...props }, ref) =&gt; (
  &lt;AlertDialogPrimitive.Cancel
    ref={ref}
    className={cn(
      buttonVariants({ variant: "outline" }),
      "mt-2 sm:mt-0",
      className
    )}
    {...props}
  /&gt;
))
AlertDialogCancel.displayName = AlertDialogPrimitive.Cancel.displayName

export {
  AlertDialog,
  AlertDialogPortal,
  AlertDialogOverlay,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel,
}
</code></pre>
      </div>
    </div>
  </body>

</html>