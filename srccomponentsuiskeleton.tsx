<html>
  
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="../style.css">
    <base target="_parent">
    <title data-trilium-title>src/components/ui/skeleton.tsx</title>
  </head>
  
  <body>
    <div class="content">
       <h1 data-trilium-h1>src/components/ui/skeleton.tsx</h1>

      <div class="ck-content"><pre><code class="language-application-javascript-env-frontend">
import { cn } from "@/lib/utils"

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes&lt;HTMLDivElement&gt;) {
  return (
    &lt;div
      className={cn("animate-pulse rounded-md bg-muted", className)}
      {...props}
    /&gt;
  )
}

export { Skeleton }
</code></pre>
      </div>
    </div>
  </body>

</html>