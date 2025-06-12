<html>
  
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="../style.css">
    <base target="_parent">
    <title data-trilium-title>src/components/ui/label.tsx</title>
  </head>
  
  <body>
    <div class="content">
       <h1 data-trilium-h1>src/components/ui/label.tsx</h1>

      <div class="ck-content"><pre><code class="language-application-javascript-env-frontend">
"use client"

import * as React from "react"
import * as LabelPrimitive from "@radix-ui/react-label"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const labelVariants = cva(
  "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
)

const Label = React.forwardRef&lt;
  React.ElementRef&lt;typeof LabelPrimitive.Root&gt;,
  React.ComponentPropsWithoutRef&lt;typeof LabelPrimitive.Root&gt; &amp;
    VariantProps&lt;typeof labelVariants&gt;
&gt;(({ className, ...props }, ref) =&gt; (
  &lt;LabelPrimitive.Root
    ref={ref}
    className={cn(labelVariants(), className)}
    {...props}
  /&gt;
))
Label.displayName = LabelPrimitive.Root.displayName

export { Label }
</code></pre>
      </div>
    </div>
  </body>

</html>