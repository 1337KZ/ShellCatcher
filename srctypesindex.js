<html>
  
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="../style.css">
    <base target="_parent">
    <title data-trilium-title>src/types/index.js</title>
  </head>
  
  <body>
    <div class="content">
       <h1 data-trilium-h1>src/types/index.js</h1>

      <div class="ck-content"><pre><code class="language-application-javascript-env-frontend">export interface LogEntry {
  id: string;
  type: 'command' | 'output' | 'error' | 'system' | 'status';
  content: string;
  timestamp: string; // ISO string for date
}</code></pre>
      </div>
    </div>
  </body>

</html>