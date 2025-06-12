<html>
  
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="../style.css">
    <base target="_parent">
    <title data-trilium-title>src/app/layout.tsx</title>
  </head>
  
  <body>
    <div class="content">
       <h1 data-trilium-h1>src/app/layout.tsx</h1>

      <div class="ck-content"><pre><code class="language-text-plain">
import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import { Inter, Source_Code_Pro } from 'next/font/google';

// Configure Inter font
const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter', // Optional: if you want to use it as a CSS variable
  weight: ['400', '700'],
});

// Configure Source Code Pro font
const sourceCodePro = Source_Code_Pro({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-source-code-pro', // Optional
  weight: ['400', '500'],
});

export const metadata: Metadata = {
  title: 'Reverse Shell Catcher',
  description: 'Web interface to listen for and control reverse shells.',
};

export default function RootLayout({
  children,
}: Readonly&lt;{
  children: React.ReactNode;
}&gt;) {
  return (
    &lt;html lang="en" className={`${inter.variable} ${sourceCodePro.variable}`}&gt;
      &lt;head&gt;
        {/* Google Fonts are now handled by next/font, no direct &lt;link&gt; tags needed in head here unless for other resources */}
      &lt;/head&gt;
      &lt;body className="font-body antialiased"&gt;
        {children}
        &lt;Toaster /&gt;
      &lt;/body&gt;
    &lt;/html&gt;
  );
}
</code></pre>
      </div>
    </div>
  </body>

</html>