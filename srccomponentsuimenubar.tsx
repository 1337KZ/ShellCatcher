<html>
  
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="../style.css">
    <base target="_parent">
    <title data-trilium-title>src/components/ui/menubar.tsx</title>
  </head>
  
  <body>
    <div class="content">
       <h1 data-trilium-h1>src/components/ui/menubar.tsx</h1>

      <div class="ck-content"><pre><code class="language-application-javascript-env-frontend">
"use client"

import * as React from "react"
import * as MenubarPrimitive from "@radix-ui/react-menubar"
import { Check, ChevronRight, Circle } from "lucide-react"

import { cn } from "@/lib/utils"

function MenubarMenu({
  ...props
}: React.ComponentProps&lt;typeof MenubarPrimitive.Menu&gt;) {
  return &lt;MenubarPrimitive.Menu {...props} /&gt;
}

function MenubarGroup({
  ...props
}: React.ComponentProps&lt;typeof MenubarPrimitive.Group&gt;) {
  return &lt;MenubarPrimitive.Group {...props} /&gt;
}

function MenubarPortal({
  ...props
}: React.ComponentProps&lt;typeof MenubarPrimitive.Portal&gt;) {
  return &lt;MenubarPrimitive.Portal {...props} /&gt;
}

function MenubarRadioGroup({
  ...props
}: React.ComponentProps&lt;typeof MenubarPrimitive.RadioGroup&gt;) {
  return &lt;MenubarPrimitive.RadioGroup {...props} /&gt;
}

function MenubarSub({
  ...props
}: React.ComponentProps&lt;typeof MenubarPrimitive.Sub&gt;) {
  return &lt;MenubarPrimitive.Sub data-slot="menubar-sub" {...props} /&gt;
}

const Menubar = React.forwardRef&lt;
  React.ElementRef&lt;typeof MenubarPrimitive.Root&gt;,
  React.ComponentPropsWithoutRef&lt;typeof MenubarPrimitive.Root&gt;
&gt;(({ className, ...props }, ref) =&gt; (
  &lt;MenubarPrimitive.Root
    ref={ref}
    className={cn(
      "flex h-10 items-center space-x-1 rounded-md border bg-background p-1",
      className
    )}
    {...props}
  /&gt;
))
Menubar.displayName = MenubarPrimitive.Root.displayName

const MenubarTrigger = React.forwardRef&lt;
  React.ElementRef&lt;typeof MenubarPrimitive.Trigger&gt;,
  React.ComponentPropsWithoutRef&lt;typeof MenubarPrimitive.Trigger&gt;
&gt;(({ className, ...props }, ref) =&gt; (
  &lt;MenubarPrimitive.Trigger
    ref={ref}
    className={cn(
      "flex cursor-default select-none items-center rounded-sm px-3 py-1.5 text-sm font-medium outline-none focus:bg-accent focus:text-accent-foreground data-[state=open]:bg-accent data-[state=open]:text-accent-foreground",
      className
    )}
    {...props}
  /&gt;
))
MenubarTrigger.displayName = MenubarPrimitive.Trigger.displayName

const MenubarSubTrigger = React.forwardRef&lt;
  React.ElementRef&lt;typeof MenubarPrimitive.SubTrigger&gt;,
  React.ComponentPropsWithoutRef&lt;typeof MenubarPrimitive.SubTrigger&gt; &amp; {
    inset?: boolean
  }
&gt;(({ className, inset, children, ...props }, ref) =&gt; (
  &lt;MenubarPrimitive.SubTrigger
    ref={ref}
    className={cn(
      "flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[state=open]:bg-accent data-[state=open]:text-accent-foreground",
      inset &amp;&amp; "pl-8",
      className
    )}
    {...props}
  &gt;
    {children}
    &lt;ChevronRight className="ml-auto h-4 w-4" /&gt;
  &lt;/MenubarPrimitive.SubTrigger&gt;
))
MenubarSubTrigger.displayName = MenubarPrimitive.SubTrigger.displayName

const MenubarSubContent = React.forwardRef&lt;
  React.ElementRef&lt;typeof MenubarPrimitive.SubContent&gt;,
  React.ComponentPropsWithoutRef&lt;typeof MenubarPrimitive.SubContent&gt;
&gt;(({ className, ...props }, ref) =&gt; (
  &lt;MenubarPrimitive.SubContent
    ref={ref}
    className={cn(
      "z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
      className
    )}
    {...props}
  /&gt;
))
MenubarSubContent.displayName = MenubarPrimitive.SubContent.displayName

const MenubarContent = React.forwardRef&lt;
  React.ElementRef&lt;typeof MenubarPrimitive.Content&gt;,
  React.ComponentPropsWithoutRef&lt;typeof MenubarPrimitive.Content&gt;
&gt;(
  (
    { className, align = "start", alignOffset = -4, sideOffset = 8, ...props },
    ref
  ) =&gt; (
    &lt;MenubarPrimitive.Portal&gt;
      &lt;MenubarPrimitive.Content
        ref={ref}
        align={align}
        alignOffset={alignOffset}
        sideOffset={sideOffset}
        className={cn(
          "z-50 min-w-[12rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
          className
        )}
        {...props}
      /&gt;
    &lt;/MenubarPrimitive.Portal&gt;
  )
)
MenubarContent.displayName = MenubarPrimitive.Content.displayName

const MenubarItem = React.forwardRef&lt;
  React.ElementRef&lt;typeof MenubarPrimitive.Item&gt;,
  React.ComponentPropsWithoutRef&lt;typeof MenubarPrimitive.Item&gt; &amp; {
    inset?: boolean
  }
&gt;(({ className, inset, ...props }, ref) =&gt; (
  &lt;MenubarPrimitive.Item
    ref={ref}
    className={cn(
      "relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      inset &amp;&amp; "pl-8",
      className
    )}
    {...props}
  /&gt;
))
MenubarItem.displayName = MenubarPrimitive.Item.displayName

const MenubarCheckboxItem = React.forwardRef&lt;
  React.ElementRef&lt;typeof MenubarPrimitive.CheckboxItem&gt;,
  React.ComponentPropsWithoutRef&lt;typeof MenubarPrimitive.CheckboxItem&gt;
&gt;(({ className, children, checked, ...props }, ref) =&gt; (
  &lt;MenubarPrimitive.CheckboxItem
    ref={ref}
    className={cn(
      "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    )}
    checked={checked}
    {...props}
  &gt;
    &lt;span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center"&gt;
      &lt;MenubarPrimitive.ItemIndicator&gt;
        &lt;Check className="h-4 w-4" /&gt;
      &lt;/MenubarPrimitive.ItemIndicator&gt;
    &lt;/span&gt;
    {children}
  &lt;/MenubarPrimitive.CheckboxItem&gt;
))
MenubarCheckboxItem.displayName = MenubarPrimitive.CheckboxItem.displayName

const MenubarRadioItem = React.forwardRef&lt;
  React.ElementRef&lt;typeof MenubarPrimitive.RadioItem&gt;,
  React.ComponentPropsWithoutRef&lt;typeof MenubarPrimitive.RadioItem&gt;
&gt;(({ className, children, ...props }, ref) =&gt; (
  &lt;MenubarPrimitive.RadioItem
    ref={ref}
    className={cn(
      "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    )}
    {...props}
  &gt;
    &lt;span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center"&gt;
      &lt;MenubarPrimitive.ItemIndicator&gt;
        &lt;Circle className="h-2 w-2 fill-current" /&gt;
      &lt;/MenubarPrimitive.ItemIndicator&gt;
    &lt;/span&gt;
    {children}
  &lt;/MenubarPrimitive.RadioItem&gt;
))
MenubarRadioItem.displayName = MenubarPrimitive.RadioItem.displayName

const MenubarLabel = React.forwardRef&lt;
  React.ElementRef&lt;typeof MenubarPrimitive.Label&gt;,
  React.ComponentPropsWithoutRef&lt;typeof MenubarPrimitive.Label&gt; &amp; {
    inset?: boolean
  }
&gt;(({ className, inset, ...props }, ref) =&gt; (
  &lt;MenubarPrimitive.Label
    ref={ref}
    className={cn(
      "px-2 py-1.5 text-sm font-semibold",
      inset &amp;&amp; "pl-8",
      className
    )}
    {...props}
  /&gt;
))
MenubarLabel.displayName = MenubarPrimitive.Label.displayName

const MenubarSeparator = React.forwardRef&lt;
  React.ElementRef&lt;typeof MenubarPrimitive.Separator&gt;,
  React.ComponentPropsWithoutRef&lt;typeof MenubarPrimitive.Separator&gt;
&gt;(({ className, ...props }, ref) =&gt; (
  &lt;MenubarPrimitive.Separator
    ref={ref}
    className={cn("-mx-1 my-1 h-px bg-muted", className)}
    {...props}
  /&gt;
))
MenubarSeparator.displayName = MenubarPrimitive.Separator.displayName

const MenubarShortcut = ({
  className,
  ...props
}: React.HTMLAttributes&lt;HTMLSpanElement&gt;) =&gt; {
  return (
    &lt;span
      className={cn(
        "ml-auto text-xs tracking-widest text-muted-foreground",
        className
      )}
      {...props}
    /&gt;
  )
}
MenubarShortcut.displayname = "MenubarShortcut"

export {
  Menubar,
  MenubarMenu,
  MenubarTrigger,
  MenubarContent,
  MenubarItem,
  MenubarSeparator,
  MenubarLabel,
  MenubarCheckboxItem,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarPortal,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarGroup,
  MenubarSub,
  MenubarShortcut,
}
</code></pre>
      </div>
    </div>
  </body>

</html>