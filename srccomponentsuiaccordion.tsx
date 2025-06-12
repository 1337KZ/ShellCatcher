<html>
  
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="../style.css">
    <base target="_parent">
    <title data-trilium-title>src/components/ui/accordion.tsx</title>
  </head>
  
  <body>
    <div class="content">
       <h1 data-trilium-h1>src/components/ui/accordion.tsx</h1>

      <div class="ck-content"><pre><code class="language-application-javascript-env-frontend">
"use client"

import * as React from "react"
import * as AccordionPrimitive from "@radix-ui/react-accordion"
import { ChevronDown } from "lucide-react"

import { cn } from "@/lib/utils"

const Accordion = AccordionPrimitive.Root

const AccordionItem = React.forwardRef&lt;
  React.ElementRef&lt;typeof AccordionPrimitive.Item&gt;,
  React.ComponentPropsWithoutRef&lt;typeof AccordionPrimitive.Item&gt;
&gt;(({ className, ...props }, ref) =&gt; (
  &lt;AccordionPrimitive.Item
    ref={ref}
    className={cn("border-b", className)}
    {...props}
  /&gt;
))
AccordionItem.displayName = "AccordionItem"

const AccordionTrigger = React.forwardRef&lt;
  React.ElementRef&lt;typeof AccordionPrimitive.Trigger&gt;,
  React.ComponentPropsWithoutRef&lt;typeof AccordionPrimitive.Trigger&gt;
&gt;(({ className, children, ...props }, ref) =&gt; (
  &lt;AccordionPrimitive.Header className="flex"&gt;
    &lt;AccordionPrimitive.Trigger
      ref={ref}
      className={cn(
        "flex flex-1 items-center justify-between py-4 font-medium transition-all hover:underline [&amp;[data-state=open]&gt;svg]:rotate-180",
        className
      )}
      {...props}
    &gt;
      {children}
      &lt;ChevronDown className="h-4 w-4 shrink-0 transition-transform duration-200" /&gt;
    &lt;/AccordionPrimitive.Trigger&gt;
  &lt;/AccordionPrimitive.Header&gt;
))
AccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName

const AccordionContent = React.forwardRef&lt;
  React.ElementRef&lt;typeof AccordionPrimitive.Content&gt;,
  React.ComponentPropsWithoutRef&lt;typeof AccordionPrimitive.Content&gt;
&gt;(({ className, children, ...props }, ref) =&gt; (
  &lt;AccordionPrimitive.Content
    ref={ref}
    className="overflow-hidden text-sm transition-all data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down"
    {...props}
  &gt;
    &lt;div className={cn("pb-4 pt-0", className)}&gt;{children}&lt;/div&gt;
  &lt;/AccordionPrimitive.Content&gt;
))

AccordionContent.displayName = AccordionPrimitive.Content.displayName

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent }
</code></pre>
      </div>
    </div>
  </body>

</html>