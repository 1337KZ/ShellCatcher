<html>
  
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="../style.css">
    <base target="_parent">
    <title data-trilium-title>src/components/ui/slider.tsx</title>
  </head>
  
  <body>
    <div class="content">
       <h1 data-trilium-h1>src/components/ui/slider.tsx</h1>

      <div class="ck-content"><pre><code class="language-application-javascript-env-frontend">
"use client"

import * as React from "react"
import * as SliderPrimitive from "@radix-ui/react-slider"

import { cn } from "@/lib/utils"

const Slider = React.forwardRef&lt;
  React.ElementRef&lt;typeof SliderPrimitive.Root&gt;,
  React.ComponentPropsWithoutRef&lt;typeof SliderPrimitive.Root&gt;
&gt;(({ className, ...props }, ref) =&gt; (
  &lt;SliderPrimitive.Root
    ref={ref}
    className={cn(
      "relative flex w-full touch-none select-none items-center",
      className
    )}
    {...props}
  &gt;
    &lt;SliderPrimitive.Track className="relative h-2 w-full grow overflow-hidden rounded-full bg-secondary"&gt;
      &lt;SliderPrimitive.Range className="absolute h-full bg-primary" /&gt;
    &lt;/SliderPrimitive.Track&gt;
    &lt;SliderPrimitive.Thumb className="block h-5 w-5 rounded-full border-2 border-primary bg-background ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50" /&gt;
  &lt;/SliderPrimitive.Root&gt;
))
Slider.displayName = SliderPrimitive.Root.displayName

export { Slider }
</code></pre>
      </div>
    </div>
  </body>

</html>