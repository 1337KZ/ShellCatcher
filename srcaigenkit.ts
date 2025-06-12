<html>
  
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="../style.css">
    <base target="_parent">
    <title data-trilium-title>src/ai/genkit.ts</title>
  </head>
  
  <body>
    <div class="content">
       <h1 data-trilium-h1>src/ai/genkit.ts</h1>

      <div class="ck-content"><pre><code class="language-text-plain">
import {genkit} from 'genkit';
import {googleAI} from '@genkit-ai/googleai';

export const ai = genkit({
  plugins: [googleAI()],
  model: 'googleai/gemini-2.0-flash',
});
</code></pre>
      </div>
    </div>
  </body>

</html>