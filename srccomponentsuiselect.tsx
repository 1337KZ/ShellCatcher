<html>
  
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="../style.css">
    <base target="_parent">
    <title data-trilium-title>src/components/ui/select.tsx</title>
  </head>
  
  <body>
    <div class="content">
       <h1 data-trilium-h1>src/components/ui/select.tsx</h1>

      <div class="ck-content"><pre><code class="language-application-javascript-env-frontend">
"use client"

import * as React from "react"
import * as SelectPrimitive from "@radix-ui/react-select"
import { Check, ChevronDown, ChevronUp } from "lucide-react"

import { cn } from "@/lib/utils"

const Select = SelectPrimitive.Root

const SelectGroup = SelectPrimitive.Group

const SelectValue = SelectPrimitive.Value

const SelectTrigger = React.forwardRef&lt;
  React.ElementRef&lt;typeof SelectPrimitive.Trigger&gt;,
  React.ComponentPropsWithoutRef&lt;typeof SelectPrimitive.Trigger&gt;
&gt;(({ className, children, ...props }, ref) =&gt; (
  &lt;SelectPrimitive.Trigger
    ref={ref}
    className={cn(
      "flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&amp;&gt;span]:line-clamp-1",
      className
    )}
    {...props}
  &gt;
    {children}
    &lt;SelectPrimitive.Icon asChild&gt;
      &lt;ChevronDown className="h-4 w-4 opacity-50" /&gt;
    &lt;/SelectPrimitive.Icon&gt;
  &lt;/SelectPrimitive.Trigger&gt;
))
SelectTrigger.displayName = SelectPrimitive.Trigger.displayName

const SelectScrollUpButton = React.forwardRef&lt;
  React.ElementRef&lt;typeof SelectPrimitive.ScrollUpButton&gt;,
  React.ComponentPropsWithoutRef&lt;typeof SelectPrimitive.ScrollUpButton&gt;
&gt;(({ className, ...props }, ref) =&gt; (
  &lt;SelectPrimitive.ScrollUpButton
    ref={ref}
    className={cn(
      "flex cursor-default items-center justify-center py-1",
      className
    )}
    {...props}
  &gt;
    &lt;ChevronUp className="h-4 w-4" /&gt;
  &lt;/SelectPrimitive.ScrollUpButton&gt;
))
SelectScrollUpButton.displayName = SelectPrimitive.ScrollUpButton.displayName

const SelectScrollDownButton = React.forwardRef&lt;
  React.ElementRef&lt;typeof SelectPrimitive.ScrollDownButton&gt;,
  React.ComponentPropsWithoutRef&lt;typeof SelectPrimitive.ScrollDownButton&gt;
&gt;(({ className, ...props }, ref) =&gt; (
  &lt;SelectPrimitive.ScrollDownButton
    ref={ref}
    className={cn(
      "flex cursor-default items-center justify-center py-1",
      className
    )}
    {...props}
  &gt;
    &lt;ChevronDown className="h-4 w-4" /&gt;
  &lt;/SelectPrimitive.ScrollDownButton&gt;
))
SelectScrollDownButton.displayName =
  SelectPrimitive.ScrollDownButton.displayName

const SelectContent = React.forwardRef&lt;
  React.ElementRef&lt;typeof SelectPrimitive.Content&gt;,
  React.ComponentPropsWithoutRef&lt;typeof SelectPrimitive.Content&gt;
&gt;(({ className, children, position = "popper", ...props }, ref) =&gt; (
  &lt;SelectPrimitive.Portal&gt;
    &lt;SelectPrimitive.Content
      ref={ref}
      className={cn(
        "relative z-50 max-h-96 min-w-[8rem] overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
        position === "popper" &amp;&amp;
          "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",
        className
      )}
      position={position}
      {...props}
    &gt;
      &lt;SelectScrollUpButton /&gt;
      &lt;SelectPrimitive.Viewport
        className={cn(
          "p-1",
          position === "popper" &amp;&amp;
            "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]"
        )}
      &gt;
        {children}
      &lt;/SelectPrimitive.Viewport&gt;
      &lt;SelectScrollDownButton /&gt;
    &lt;/SelectPrimitive.Content&gt;
  &lt;/SelectPrimitive.Portal&gt;
))
SelectContent.displayName = SelectPrimitive.Content.displayName

const SelectLabel = React.forwardRef&lt;
  React.ElementRef&lt;typeof SelectPrimitive.Label&gt;,
  React.ComponentPropsWithoutRef&lt;typeof SelectPrimitive.Label&gt;
&gt;(({ className, ...props }, ref) =&gt; (
  &lt;SelectPrimitive.Label
    ref={ref}
    className={cn("py-1.5 pl-8 pr-2 text-sm font-semibold", className)}
    {...props}
  /&gt;
))
SelectLabel.displayName = SelectPrimitive.Label.displayName

const SelectItem = React.forwardRef&lt;
  React.ElementRef&lt;typeof SelectPrimitive.Item&gt;,
  React.ComponentPropsWithoutRef&lt;typeof SelectPrimitive.Item&gt;
&gt;(({ className, children, ...props }, ref) =&gt; (
  &lt;SelectPrimitive.Item
    ref={ref}
    className={cn(
      "relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    )}
    {...props}
  &gt;
    &lt;span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center"&gt;
      &lt;SelectPrimitive.ItemIndicator&gt;
        &lt;Check className="h-4 w-4" /&gt;
      &lt;/SelectPrimitive.ItemIndicator&gt;
    &lt;/span&gt;

    &lt;SelectPrimitive.ItemText&gt;{children}&lt;/SelectPrimitive.ItemText&gt;
  &lt;/SelectPrimitive.Item&gt;
))
SelectItem.displayName = SelectPrimitive.Item.displayName

const SelectSeparator = React.forwardRef&lt;
  React.ElementRef&lt;typeof SelectPrimitive.Separator&gt;,
  React.ComponentPropsWithoutRef&lt;typeof SelectPrimitive.Separator&gt;
&gt;(({ className, ...props }, ref) =&gt; (
  &lt;SelectPrimitive.Separator
    ref={ref}
    className={cn("-mx-1 my-1 h-px bg-muted", className)}
    {...props}
  /&gt;
))
SelectSeparator.displayName = SelectPrimitive.Separator.displayName

export {
  Select,
  SelectGroup,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectLabel,
  SelectItem,
  SelectSeparator,
  SelectScrollUpButton,
  SelectScrollDownButton,
}
</code></pre>
      </div>
    </div>
  </body>

</html>