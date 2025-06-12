<html>
  
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="../style.css">
    <base target="_parent">
    <title data-trilium-title>src/components/ui/separator.tsx</title>
  </head>
  
  <body>
    <div class="content">
       <h1 data-trilium-h1>src/components/ui/separator.tsx</h1>

      <div class="ck-content"><pre><code class="language-application-javascript-env-frontend">
"use client"

import * as React from "react"
import * as SeparatorPrimitive from "@radix-ui/react-separator"

import { cn } from "@/lib/utils"

const Separator = React.forwardRef&lt;
  React.ElementRef&lt;typeof SeparatorPrimitive.Root&gt;,
  React.ComponentPropsWithoutRef&lt;typeof SeparatorPrimitive.Root&gt;
&gt;(
  (
    { className, orientation = "horizontal", decorative = true, ...props },
    ref
  ) =&gt; (
    &lt;SeparatorPrimitive.Root
      ref={ref}
      decorative={decorative}
      orientation={orientation}
      className={cn(
        "shrink-0 bg-border",
        orientation === "horizontal" ? "h-[1px] w-full" : "h-full w-[1px]",
        className
      )}
      {...props}
    /&gt;
  )
)
Separator.displayName = SeparatorPrimitive.Root.displayName

export { Separator }
</code></pre>
      </div>
    </div>
  </body>

</html>