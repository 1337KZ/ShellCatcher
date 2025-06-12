<html>
  
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="../style.css">
    <base target="_parent">
    <title data-trilium-title>src/lib/utils.ts</title>
  </head>
  
  <body>
    <div class="content">
       <h1 data-trilium-h1>src/lib/utils.ts</h1>

      <div class="ck-content"><pre><code class="language-application-javascript-env-frontend">import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}</code></pre>
      </div>
    </div>
  </body>

</html>