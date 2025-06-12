<html>
  
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="../style.css">
    <base target="_parent">
    <title data-trilium-title>src/components/command-input.tsx</title>
  </head>
  
  <body>
    <div class="content">
       <h1 data-trilium-h1>src/components/command-input.tsx</h1>

      <div class="ck-content"><pre><code class="language-text-plain">
"use client";

import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type SubmitHandler } from "react-hook-form";
import * as z from "zod";
import { Send } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";

const formSchema = z.object({
  command: z.string().min(1, "Command cannot be empty."),
});

type CommandFormValues = z.infer&lt;typeof formSchema&gt;;

interface CommandInputProps {
  onSubmit: (command: string) =&gt; void;
  isLoading?: boolean;
  placeholder?: string;
}

export function CommandInput({ onSubmit, isLoading = false, placeholder }: CommandInputProps) {
  const form = useForm&lt;CommandFormValues&gt;({
    resolver: zodResolver(formSchema),
    defaultValues: {
      command: "",
    },
  });

  const inputRef = React.useRef&lt;HTMLInputElement&gt;(null);

  React.useEffect(() =&gt; {
    // Only focus if not loading and a placeholder suggests interaction is possible
    if (!isLoading &amp;&amp; (placeholder?.includes("Enter command") || !placeholder) ) {
        inputRef.current?.focus();
    }
  }, [isLoading, placeholder]);

  const handleFormSubmit: SubmitHandler&lt;CommandFormValues&gt; = (data) =&gt; {
    onSubmit(data.command);
    form.reset();
    // Keep focus on input after submit, if not loading
    setTimeout(() =&gt; {
        if(!isLoading &amp;&amp; inputRef.current) inputRef.current?.focus();
    }, 0);
  };

  return (
    &lt;Form {...form}&gt;
      &lt;form onSubmit={form.handleSubmit(handleFormSubmit)} className="flex items-start gap-3"&gt;
        &lt;FormField
          control={form.control}
          name="command"
          render={({ field }) =&gt; (
            &lt;FormItem className="flex-grow"&gt;
              &lt;FormControl&gt;
                &lt;div className="relative flex items-center"&gt;
                  &lt;span className="absolute left-3 text-muted-foreground font-code select-none"&gt;$&lt;/span&gt;
                  &lt;Input
                    {...field}
                    ref={inputRef}
                    type="text"
                    placeholder={placeholder || "Enter command..."}
                    className="font-code pl-8 bg-card border-border focus:border-primary focus:ring-primary shadow-sm"
                    autoComplete="off"
                    disabled={isLoading}
                  /&gt;
                &lt;/div&gt;
              &lt;/FormControl&gt;
              &lt;FormMessage /&gt;
            &lt;/FormItem&gt;
          )}
        /&gt;
        &lt;Button type="submit" size="lg" disabled={isLoading} aria-label="Send command" className="shadow-sm"&gt;
          {isLoading &amp;&amp; form.formState.isSubmitting ? ( // Show spinner only on actual command submission
            &lt;div className="animate-spin rounded-full h-5 w-5 border-b-2 border-primary-foreground"&gt;&lt;/div&gt;
          ) : (
            &lt;Send className="h-5 w-5" /&gt;
          )}
          &lt;span className="ml-2 hidden sm:inline"&gt;Send&lt;/span&gt;
        &lt;/Button&gt;
      &lt;/form&gt;
    &lt;/Form&gt;
  );
}
</code></pre>
      </div>
    </div>
  </body>

</html>