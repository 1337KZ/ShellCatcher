<html>
  
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="../style.css">
    <base target="_parent">
    <title data-trilium-title>src/app/api/shell-events/route.ts</title>
  </head>
  
  <body>
    <div class="content">
       <h1 data-trilium-h1>src/app/api/shell-events/route.ts</h1>

      <div class="ck-content"><pre><code class="language-text-plain">
// /src/app/api/shell-events/route.ts
import { setSessionDataCallback } from '@/lib/shell-manager';
import type { NextRequest } from 'next/server';

export const dynamic = 'force-dynamic'; // Crucial for SSE

export async function GET(request: NextRequest) {
  const stream = new ReadableStream({
    start(controller) {
      const sendEvent = (type: 'data' | 'status', payload: any) =&gt; {
        const message = `event: ${type}\ndata: ${JSON.stringify(payload)}\n\n`;
        try {
          controller.enqueue(message);
        } catch (e) {
          console.error("Error enqueuing SSE message:", e);
          // Consider closing if controller is no longer valid
        }
      };

      setSessionDataCallback((type, payload) =&gt; {
        sendEvent(type, payload);
      });

      // Initial event to confirm connection
      sendEvent('status', 'SSE_STREAM_OPENED');

      // Keep alive ping (optional, but good for some proxies/browsers)
      const keepAliveInterval = setInterval(() =&gt; {
        try {
          controller.enqueue(': keep-alive\n\n');
        } catch (e) {
          console.error("Error sending keep-alive:", e);
          clearInterval(keepAliveInterval);
          // If this fails, controller might be dead, clean up
          setSessionDataCallback(null);
          try { controller.close(); } catch {}
        }
      }, 20000); // Every 20 seconds

      request.signal.addEventListener('abort', () =&gt; {
        console.log('SSE client disconnected (abort signal).');
        setSessionDataCallback(null);
        clearInterval(keepAliveInterval);
        try { controller.close(); } catch (e) {}
      });
    },
    cancel() {
      console.log('SSE stream cancelled by client.');
      setSessionDataCallback(null);
      // No need to clear interval here as abort would have handled it if it was a request abort
      // or if controller.close() is called, it's done.
    },
  });

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/event-stream; charset=utf-8',
      'Cache-Control': 'no-cache, no-transform',
      'Connection': 'keep-alive',
      'X-Accel-Buffering': 'no', // For Nginx
    },
  });
}
</code></pre>
      </div>
    </div>
  </body>

</html>