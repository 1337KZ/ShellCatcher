<html>
  
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="../style.css">
    <base target="_parent">
    <title data-trilium-title>src/components/ui/toaster.tsx</title>
  </head>
  
  <body>
    <div class="content">
       <h1 data-trilium-h1>src/components/ui/toaster.tsx</h1>

      <div class="ck-content"><pre><code class="language-application-javascript-env-frontend">
"use client"

import { useToast } from "@/hooks/use-toast"
import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "@/components/ui/toast"

export function Toaster() {
  const { toasts } = useToast()

  return (
    &lt;ToastProvider&gt;
      {toasts.map(function ({ id, title, description, action, ...props }) {
        return (
          &lt;Toast key={id} {...props}&gt;
            &lt;div className="grid gap-1"&gt;
              {title &amp;&amp; &lt;ToastTitle&gt;{title}&lt;/ToastTitle&gt;}
              {description &amp;&amp; (
                &lt;ToastDescription&gt;{description}&lt;/ToastDescription&gt;
              )}
            &lt;/div&gt;
            {action}
            &lt;ToastClose /&gt;
          &lt;/Toast&gt;
        )
      })}
      &lt;ToastViewport /&gt;
    &lt;/ToastProvider&gt;
  )
}

</code></pre>
      </div>
    </div>
  </body>

</html>