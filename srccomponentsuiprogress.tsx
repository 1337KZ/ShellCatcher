<html>
  
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="../style.css">
    <base target="_parent">
    <title data-trilium-title>src/components/ui/progress.tsx</title>
  </head>
  
  <body>
    <div class="content">
       <h1 data-trilium-h1>src/components/ui/progress.tsx</h1>

      <div class="ck-content"><pre><code class="language-application-javascript-env-frontend">
"use client"

import * as React from "react"
import * as ProgressPrimitive from "@radix-ui/react-progress"

import { cn } from "@/lib/utils"

const Progress = React.forwardRef&lt;
  React.ElementRef&lt;typeof ProgressPrimitive.Root&gt;,
  React.ComponentPropsWithoutRef&lt;typeof ProgressPrimitive.Root&gt;
&gt;(({ className, value, ...props }, ref) =&gt; (
  &lt;ProgressPrimitive.Root
    ref={ref}
    className={cn(
      "relative h-4 w-full overflow-hidden rounded-full bg-secondary",
      className
    )}
    {...props}
  &gt;
    &lt;ProgressPrimitive.Indicator
      className="h-full w-full flex-1 bg-primary transition-all"
      style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
    /&gt;
  &lt;/ProgressPrimitive.Root&gt;
))
Progress.displayName = ProgressPrimitive.Root.displayName

export { Progress }
</code></pre>
      </div>
    </div>
  </body>

</html>