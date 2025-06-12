<html>
  
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="../style.css">
    <base target="_parent">
    <title data-trilium-title>src/components/ui/radio-group.tsx</title>
  </head>
  
  <body>
    <div class="content">
       <h1 data-trilium-h1>src/components/ui/radio-group.tsx</h1>

      <div class="ck-content"><pre><code class="language-application-javascript-env-frontend">
"use client"

import * as React from "react"
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group"
import { Circle } from "lucide-react"

import { cn } from "@/lib/utils"

const RadioGroup = React.forwardRef&lt;
  React.ElementRef&lt;typeof RadioGroupPrimitive.Root&gt;,
  React.ComponentPropsWithoutRef&lt;typeof RadioGroupPrimitive.Root&gt;
&gt;(({ className, ...props }, ref) =&gt; {
  return (
    &lt;RadioGroupPrimitive.Root
      className={cn("grid gap-2", className)}
      {...props}
      ref={ref}
    /&gt;
  )
})
RadioGroup.displayName = RadioGroupPrimitive.Root.displayName

const RadioGroupItem = React.forwardRef&lt;
  React.ElementRef&lt;typeof RadioGroupPrimitive.Item&gt;,
  React.ComponentPropsWithoutRef&lt;typeof RadioGroupPrimitive.Item&gt;
&gt;(({ className, ...props }, ref) =&gt; {
  return (
    &lt;RadioGroupPrimitive.Item
      ref={ref}
      className={cn(
        "aspect-square h-4 w-4 rounded-full border border-primary text-primary ring-offset-background focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    &gt;
      &lt;RadioGroupPrimitive.Indicator className="flex items-center justify-center"&gt;
        &lt;Circle className="h-2.5 w-2.5 fill-current text-current" /&gt;
      &lt;/RadioGroupPrimitive.Indicator&gt;
    &lt;/RadioGroupPrimitive.Item&gt;
  )
})
RadioGroupItem.displayName = RadioGroupPrimitive.Item.displayName

export { RadioGroup, RadioGroupItem }
</code></pre>
      </div>
    </div>
  </body>

</html>