<html>
  
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="../style.css">
    <base target="_parent">
    <title data-trilium-title>src/components/ui/textarea.tsx</title>
  </head>
  
  <body>
    <div class="content">
       <h1 data-trilium-h1>src/components/ui/textarea.tsx</h1>

      <div class="ck-content"><pre><code class="language-application-javascript-env-frontend">
import * as React from 'react';

import {cn} from '@/lib/utils';

const Textarea = React.forwardRef&lt;HTMLTextAreaElement, React.ComponentProps&lt;'textarea'&gt;&gt;(
  ({className, ...props}, ref) =&gt; {
    return (
      &lt;textarea
        className={cn(
          'flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
          className
        )}
        ref={ref}
        {...props}
      /&gt;
    );
  }
);
Textarea.displayName = 'Textarea';

export {Textarea};
</code></pre>
      </div>
    </div>
  </body>

</html>