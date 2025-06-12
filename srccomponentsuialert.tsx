<html>
  
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="../style.css">
    <base target="_parent">
    <title data-trilium-title>src/components/ui/alert.tsx</title>
  </head>
  
  <body>
    <div class="content">
       <h1 data-trilium-h1>src/components/ui/alert.tsx</h1>

      <div class="ck-content"><pre><code class="language-application-javascript-env-frontend">
import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const alertVariants = cva(
  "relative w-full rounded-lg border p-4 [&amp;&gt;svg~*]:pl-7 [&amp;&gt;svg+div]:translate-y-[-3px] [&amp;&gt;svg]:absolute [&amp;&gt;svg]:left-4 [&amp;&gt;svg]:top-4 [&amp;&gt;svg]:text-foreground",
  {
    variants: {
      variant: {
        default: "bg-background text-foreground",
        destructive:
          "border-destructive/50 text-destructive dark:border-destructive [&amp;&gt;svg]:text-destructive",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

const Alert = React.forwardRef&lt;
  HTMLDivElement,
  React.HTMLAttributes&lt;HTMLDivElement&gt; &amp; VariantProps&lt;typeof alertVariants&gt;
&gt;(({ className, variant, ...props }, ref) =&gt; (
  &lt;div
    ref={ref}
    role="alert"
    className={cn(alertVariants({ variant }), className)}
    {...props}
  /&gt;
))
Alert.displayName = "Alert"

const AlertTitle = React.forwardRef&lt;
  HTMLParagraphElement,
  React.HTMLAttributes&lt;HTMLHeadingElement&gt;
&gt;(({ className, ...props }, ref) =&gt; (
  &lt;h5
    ref={ref}
    className={cn("mb-1 font-medium leading-none tracking-tight", className)}
    {...props}
  /&gt;
))
AlertTitle.displayName = "AlertTitle"

const AlertDescription = React.forwardRef&lt;
  HTMLParagraphElement,
  React.HTMLAttributes&lt;HTMLParagraphElement&gt;
&gt;(({ className, ...props }, ref) =&gt; (
  &lt;div
    ref={ref}
    className={cn("text-sm [&amp;_p]:leading-relaxed", className)}
    {...props}
  /&gt;
))
AlertDescription.displayName = "AlertDescription"

export { Alert, AlertTitle, AlertDescription }
</code></pre>
      </div>
    </div>
  </body>

</html>