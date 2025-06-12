<html>
  
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="../style.css">
    <base target="_parent">
    <title data-trilium-title>src/components/ui/form.tsx</title>
  </head>
  
  <body>
    <div class="content">
       <h1 data-trilium-h1>src/components/ui/form.tsx</h1>

      <div class="ck-content"><pre><code class="language-application-javascript-env-frontend">
"use client"

import * as React from "react"
import * as LabelPrimitive from "@radix-ui/react-label"
import { Slot } from "@radix-ui/react-slot"
import {
  Controller,
  FormProvider,
  useFormContext,
  type ControllerProps,
  type FieldPath,
  type FieldValues,
} from "react-hook-form"

import { cn } from "@/lib/utils"
import { Label } from "@/components/ui/label"

const Form = FormProvider

type FormFieldContextValue&lt;
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath&lt;TFieldValues&gt; = FieldPath&lt;TFieldValues&gt;
&gt; = {
  name: TName
}

const FormFieldContext = React.createContext&lt;FormFieldContextValue&gt;(
  {} as FormFieldContextValue
)

const FormField = &lt;
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath&lt;TFieldValues&gt; = FieldPath&lt;TFieldValues&gt;
&gt;({
  ...props
}: ControllerProps&lt;TFieldValues, TName&gt;) =&gt; {
  return (
    &lt;FormFieldContext.Provider value={{ name: props.name }}&gt;
      &lt;Controller {...props} /&gt;
    &lt;/FormFieldContext.Provider&gt;
  )
}

const useFormField = () =&gt; {
  const fieldContext = React.useContext(FormFieldContext)
  const itemContext = React.useContext(FormItemContext)
  const { getFieldState, formState } = useFormContext()

  const fieldState = getFieldState(fieldContext.name, formState)

  if (!fieldContext) {
    throw new Error("useFormField should be used within &lt;FormField&gt;")
  }

  const { id } = itemContext

  return {
    id,
    name: fieldContext.name,
    formItemId: `${id}-form-item`,
    formDescriptionId: `${id}-form-item-description`,
    formMessageId: `${id}-form-item-message`,
    ...fieldState,
  }
}

type FormItemContextValue = {
  id: string
}

const FormItemContext = React.createContext&lt;FormItemContextValue&gt;(
  {} as FormItemContextValue
)

const FormItem = React.forwardRef&lt;
  HTMLDivElement,
  React.HTMLAttributes&lt;HTMLDivElement&gt;
&gt;(({ className, ...props }, ref) =&gt; {
  const id = React.useId()

  return (
    &lt;FormItemContext.Provider value={{ id }}&gt;
      &lt;div ref={ref} className={cn("space-y-2", className)} {...props} /&gt;
    &lt;/FormItemContext.Provider&gt;
  )
})
FormItem.displayName = "FormItem"

const FormLabel = React.forwardRef&lt;
  React.ElementRef&lt;typeof LabelPrimitive.Root&gt;,
  React.ComponentPropsWithoutRef&lt;typeof LabelPrimitive.Root&gt;
&gt;(({ className, ...props }, ref) =&gt; {
  const { error, formItemId } = useFormField()

  return (
    &lt;Label
      ref={ref}
      className={cn(error &amp;&amp; "text-destructive", className)}
      htmlFor={formItemId}
      {...props}
    /&gt;
  )
})
FormLabel.displayName = "FormLabel"

const FormControl = React.forwardRef&lt;
  React.ElementRef&lt;typeof Slot&gt;,
  React.ComponentPropsWithoutRef&lt;typeof Slot&gt;
&gt;(({ ...props }, ref) =&gt; {
  const { error, formItemId, formDescriptionId, formMessageId } = useFormField()

  return (
    &lt;Slot
      ref={ref}
      id={formItemId}
      aria-describedby={
        !error
          ? `${formDescriptionId}`
          : `${formDescriptionId} ${formMessageId}`
      }
      aria-invalid={!!error}
      {...props}
    /&gt;
  )
})
FormControl.displayName = "FormControl"

const FormDescription = React.forwardRef&lt;
  HTMLParagraphElement,
  React.HTMLAttributes&lt;HTMLParagraphElement&gt;
&gt;(({ className, ...props }, ref) =&gt; {
  const { formDescriptionId } = useFormField()

  return (
    &lt;p
      ref={ref}
      id={formDescriptionId}
      className={cn("text-sm text-muted-foreground", className)}
      {...props}
    /&gt;
  )
})
FormDescription.displayName = "FormDescription"

const FormMessage = React.forwardRef&lt;
  HTMLParagraphElement,
  React.HTMLAttributes&lt;HTMLParagraphElement&gt;
&gt;(({ className, children, ...props }, ref) =&gt; {
  const { error, formMessageId } = useFormField()
  const body = error ? String(error?.message ?? "") : children

  if (!body) {
    return null
  }

  return (
    &lt;p
      ref={ref}
      id={formMessageId}
      className={cn("text-sm font-medium text-destructive", className)}
      {...props}
    &gt;
      {body}
    &lt;/p&gt;
  )
})
FormMessage.displayName = "FormMessage"

export {
  useFormField,
  Form,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
  FormField,
}
</code></pre>
      </div>
    </div>
  </body>

</html>