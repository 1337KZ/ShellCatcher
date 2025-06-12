<html>
  
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="../style.css">
    <base target="_parent">
    <title data-trilium-title>src/components/ui/tables.tsx</title>
  </head>
  
  <body>
    <div class="content">
       <h1 data-trilium-h1>src/components/ui/tables.tsx</h1>

      <div class="ck-content"><pre><code class="language-application-javascript-env-frontend">
import * as React from "react"

import { cn } from "@/lib/utils"

const Table = React.forwardRef&lt;
  HTMLTableElement,
  React.HTMLAttributes&lt;HTMLTableElement&gt;
&gt;(({ className, ...props }, ref) =&gt; (
  &lt;div className="relative w-full overflow-auto"&gt;
    &lt;table
      ref={ref}
      className={cn("w-full caption-bottom text-sm", className)}
      {...props}
    /&gt;
  &lt;/div&gt;
))
Table.displayName = "Table"

const TableHeader = React.forwardRef&lt;
  HTMLTableSectionElement,
  React.HTMLAttributes&lt;HTMLTableSectionElement&gt;
&gt;(({ className, ...props }, ref) =&gt; (
  &lt;thead ref={ref} className={cn("[&amp;_tr]:border-b", className)} {...props} /&gt;
))
TableHeader.displayName = "TableHeader"

const TableBody = React.forwardRef&lt;
  HTMLTableSectionElement,
  React.HTMLAttributes&lt;HTMLTableSectionElement&gt;
&gt;(({ className, ...props }, ref) =&gt; (
  &lt;tbody
    ref={ref}
    className={cn("[&amp;_tr:last-child]:border-0", className)}
    {...props}
  /&gt;
))
TableBody.displayName = "TableBody"

const TableFooter = React.forwardRef&lt;
  HTMLTableSectionElement,
  React.HTMLAttributes&lt;HTMLTableSectionElement&gt;
&gt;(({ className, ...props }, ref) =&gt; (
  &lt;tfoot
    ref={ref}
    className={cn(
      "border-t bg-muted/50 font-medium [&amp;&gt;tr]:last:border-b-0",
      className
    )}
    {...props}
  /&gt;
))
TableFooter.displayName = "TableFooter"

const TableRow = React.forwardRef&lt;
  HTMLTableRowElement,
  React.HTMLAttributes&lt;HTMLTableRowElement&gt;
&gt;(({ className, ...props }, ref) =&gt; (
  &lt;tr
    ref={ref}
    className={cn(
      "border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted",
      className
    )}
    {...props}
  /&gt;
))
TableRow.displayName = "TableRow"

const TableHead = React.forwardRef&lt;
  HTMLTableCellElement,
  React.ThHTMLAttributes&lt;HTMLTableCellElement&gt;
&gt;(({ className, ...props }, ref) =&gt; (
  &lt;th
    ref={ref}
    className={cn(
      "h-12 px-4 text-left align-middle font-medium text-muted-foreground [&amp;:has([role=checkbox])]:pr-0",
      className
    )}
    {...props}
  /&gt;
))
TableHead.displayName = "TableHead"

const TableCell = React.forwardRef&lt;
  HTMLTableCellElement,
  React.TdHTMLAttributes&lt;HTMLTableCellElement&gt;
&gt;(({ className, ...props }, ref) =&gt; (
  &lt;td
    ref={ref}
    className={cn("p-4 align-middle [&amp;:has([role=checkbox])]:pr-0", className)}
    {...props}
  /&gt;
))
TableCell.displayName = "TableCell"

const TableCaption = React.forwardRef&lt;
  HTMLTableCaptionElement,
  React.HTMLAttributes&lt;HTMLTableCaptionElement&gt;
&gt;(({ className, ...props }, ref) =&gt; (
  &lt;caption
    ref={ref}
    className={cn("mt-4 text-sm text-muted-foreground", className)}
    {...props}
  /&gt;
))
TableCaption.displayName = "TableCaption"

export {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
}
</code></pre>
      </div>
    </div>
  </body>

</html>