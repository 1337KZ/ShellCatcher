<html>
  
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="../style.css">
    <base target="_parent">
    <title data-trilium-title>src/components/ui/checkbox.tsx</title>
  </head>
  
  <body>
    <div class="content">
       <h1 data-trilium-h1>src/components/ui/checkbox.tsx</h1>

      <div class="ck-content"><pre><code class="language-application-javascript-env-frontend">
"use client"

import * as React from "react"
import * as CheckboxPrimitive from "@radix-ui/react-checkbox"
import { Check } from "lucide-react"

import { cn } from "@/lib/utils"

const Checkbox = React.forwardRef&lt;
  React.ElementRef&lt;typeof CheckboxPrimitive.Root&gt;,
  React.ComponentPropsWithoutRef&lt;typeof CheckboxPrimitive.Root&gt;
&gt;(({ className, ...props }, ref) =&gt; (
  &lt;CheckboxPrimitive.Root
    ref={ref}
    className={cn(
      "peer h-4 w-4 shrink-0 rounded-sm border border-primary ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground",
      className
    )}
    {...props}
  &gt;
    &lt;CheckboxPrimitive.Indicator
      className={cn("flex items-center justify-center text-current")}
    &gt;
      &lt;Check className="h-4 w-4" /&gt;
    &lt;/CheckboxPrimitive.Indicator&gt;
  &lt;/CheckboxPrimitive.Root&gt;
))
Checkbox.displayName = CheckboxPrimitive.Root.displayName

export { Checkbox }
</code></pre>
      </div>
    </div>
  </body>

</html>