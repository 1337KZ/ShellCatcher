<html>
  
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="../style.css">
    <base target="_parent">
    <title data-trilium-title>src/components/ui/card.tsx</title>
  </head>
  
  <body>
    <div class="content">
       <h1 data-trilium-h1>src/components/ui/card.tsx</h1>

      <div class="ck-content"><pre><code class="language-application-javascript-env-frontend">
import * as React from "react"

import { cn } from "@/lib/utils"

const Card = React.forwardRef&lt;
  HTMLDivElement,
  React.HTMLAttributes&lt;HTMLDivElement&gt;
&gt;(({ className, ...props }, ref) =&gt; (
  &lt;div
    ref={ref}
    className={cn(
      "rounded-lg border bg-card text-card-foreground shadow-sm",
      className
    )}
    {...props}
  /&gt;
))
Card.displayName = "Card"

const CardHeader = React.forwardRef&lt;
  HTMLDivElement,
  React.HTMLAttributes&lt;HTMLDivElement&gt;
&gt;(({ className, ...props }, ref) =&gt; (
  &lt;div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 p-6", className)}
    {...props}
  /&gt;
))
CardHeader.displayName = "CardHeader"

const CardTitle = React.forwardRef&lt;
  HTMLDivElement,
  React.HTMLAttributes&lt;HTMLDivElement&gt;
&gt;(({ className, ...props }, ref) =&gt; (
  &lt;div
    ref={ref}
    className={cn(
      "text-2xl font-semibold leading-none tracking-tight",
      className
    )}
    {...props}
  /&gt;
))
CardTitle.displayName = "CardTitle"

const CardDescription = React.forwardRef&lt;
  HTMLDivElement,
  React.HTMLAttributes&lt;HTMLDivElement&gt;
&gt;(({ className, ...props }, ref) =&gt; (
  &lt;div
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  /&gt;
))
CardDescription.displayName = "CardDescription"

const CardContent = React.forwardRef&lt;
  HTMLDivElement,
  React.HTMLAttributes&lt;HTMLDivElement&gt;
&gt;(({ className, ...props }, ref) =&gt; (
  &lt;div ref={ref} className={cn("p-6 pt-0", className)} {...props} /&gt;
))
CardContent.displayName = "CardContent"

const CardFooter = React.forwardRef&lt;
  HTMLDivElement,
  React.HTMLAttributes&lt;HTMLDivElement&gt;
&gt;(({ className, ...props }, ref) =&gt; (
  &lt;div
    ref={ref}
    className={cn("flex items-center p-6 pt-0", className)}
    {...props}
  /&gt;
))
CardFooter.displayName = "CardFooter"

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent }
</code></pre>
      </div>
    </div>
  </body>

</html>