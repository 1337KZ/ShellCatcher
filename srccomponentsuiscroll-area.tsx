<html>
  
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="../style.css">
    <base target="_parent">
    <title data-trilium-title>src/components/ui/scroll-area.tsx</title>
  </head>
  
  <body>
    <div class="content">
       <h1 data-trilium-h1>src/components/ui/scroll-area.tsx</h1>

      <div class="ck-content"><pre><code class="language-application-javascript-env-frontend">
"use client"

import * as React from "react"
import * as ScrollAreaPrimitive from "@radix-ui/react-scroll-area"

import { cn } from "@/lib/utils"

interface CustomScrollAreaProps extends React.ComponentPropsWithoutRef&lt;typeof ScrollAreaPrimitive.Root&gt; {
  viewportRef?: React.RefObject&lt;HTMLDivElement&gt;;
}

const ScrollArea = React.forwardRef&lt;
  React.ElementRef&lt;typeof ScrollAreaPrimitive.Root&gt;,
  CustomScrollAreaProps
&gt;(({ className, children, viewportRef, ...props }, ref) =&gt; (
  &lt;ScrollAreaPrimitive.Root
    ref={ref}
    className={cn("relative overflow-hidden", className)}
    {...props} // viewportRef is now destructured and won't be passed here
  &gt;
    &lt;ScrollAreaPrimitive.Viewport
      ref={viewportRef} // viewportRef is correctly passed to the Viewport component
      className="h-full w-full rounded-[inherit]"
    &gt;
      {children}
    &lt;/ScrollAreaPrimitive.Viewport&gt;
    &lt;ScrollBar /&gt;
    &lt;ScrollAreaPrimitive.Corner /&gt;
  &lt;/ScrollAreaPrimitive.Root&gt;
))
ScrollArea.displayName = ScrollAreaPrimitive.Root.displayName

const ScrollBar = React.forwardRef&lt;
  React.ElementRef&lt;typeof ScrollAreaPrimitive.ScrollAreaScrollbar&gt;,
  React.ComponentPropsWithoutRef&lt;typeof ScrollAreaPrimitive.ScrollAreaScrollbar&gt;
&gt;(({ className, orientation = "vertical", ...props }, ref) =&gt; (
  &lt;ScrollAreaPrimitive.ScrollAreaScrollbar
    ref={ref}
    orientation={orientation}
    className={cn(
      "flex touch-none select-none transition-colors",
      orientation === "vertical" &amp;&amp;
        "h-full w-2.5 border-l border-l-transparent p-[1px]",
      orientation === "horizontal" &amp;&amp;
        "h-2.5 flex-col border-t border-t-transparent p-[1px]",
      className
    )}
    {...props}
  &gt;
    &lt;ScrollAreaPrimitive.ScrollAreaThumb className="relative flex-1 rounded-full bg-border" /&gt;
  &lt;/ScrollAreaPrimitive.ScrollAreaScrollbar&gt;
))
ScrollBar.displayName = ScrollAreaPrimitive.ScrollAreaScrollbar.displayName

export { ScrollArea, ScrollBar }
</code></pre>
      </div>
    </div>
  </body>

</html>