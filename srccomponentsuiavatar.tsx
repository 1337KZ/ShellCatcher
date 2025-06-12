<html>
  
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="../style.css">
    <base target="_parent">
    <title data-trilium-title>src/components/ui/avatar.tsx</title>
  </head>
  
  <body>
    <div class="content">
       <h1 data-trilium-h1>src/components/ui/avatar.tsx</h1>

      <div class="ck-content"><pre><code class="language-application-javascript-env-frontend">
"use client"

import * as React from "react"
import * as AvatarPrimitive from "@radix-ui/react-avatar"

import { cn } from "@/lib/utils"

const Avatar = React.forwardRef&lt;
  React.ElementRef&lt;typeof AvatarPrimitive.Root&gt;,
  React.ComponentPropsWithoutRef&lt;typeof AvatarPrimitive.Root&gt;
&gt;(({ className, ...props }, ref) =&gt; (
  &lt;AvatarPrimitive.Root
    ref={ref}
    className={cn(
      "relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full",
      className
    )}
    {...props}
  /&gt;
))
Avatar.displayName = AvatarPrimitive.Root.displayName

const AvatarImage = React.forwardRef&lt;
  React.ElementRef&lt;typeof AvatarPrimitive.Image&gt;,
  React.ComponentPropsWithoutRef&lt;typeof AvatarPrimitive.Image&gt;
&gt;(({ className, ...props }, ref) =&gt; (
  &lt;AvatarPrimitive.Image
    ref={ref}
    className={cn("aspect-square h-full w-full", className)}
    {...props}
  /&gt;
))
AvatarImage.displayName = AvatarPrimitive.Image.displayName

const AvatarFallback = React.forwardRef&lt;
  React.ElementRef&lt;typeof AvatarPrimitive.Fallback&gt;,
  React.ComponentPropsWithoutRef&lt;typeof AvatarPrimitive.Fallback&gt;
&gt;(({ className, ...props }, ref) =&gt; (
  &lt;AvatarPrimitive.Fallback
    ref={ref}
    className={cn(
      "flex h-full w-full items-center justify-center rounded-full bg-muted",
      className
    )}
    {...props}
  /&gt;
))
AvatarFallback.displayName = AvatarPrimitive.Fallback.displayName

export { Avatar, AvatarImage, AvatarFallback }
</code></pre>
      </div>
    </div>
  </body>

</html>