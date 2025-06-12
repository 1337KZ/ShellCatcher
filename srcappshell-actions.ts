<html>
  
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="../style.css">
    <base target="_parent">
    <title data-trilium-title>src/app/shell-actions.ts</title>
  </head>
  
  <body>
    <div class="content">
       <h1 data-trilium-h1>src/app/shell-actions.ts</h1>

      <div class="ck-content"><pre><code class="language-text-plain">
// src/app/shell-actions.ts
'use server';

import {
  startListening as managerStartListening,
  sendCommandToShell as managerSendCommand,
  stopListening as managerStopListening,
  isListening as managerIsListening,
  getConnectedClientAddress as managerGetClientAddress,
} from '@/lib/shell-manager';
import { revalidatePath } from 'next/cache';

// This function forces revalidation, which can help update UI state read by server components.
// For real-time, SSE is primary, but this can sync up after actions.
function revalidateHomePage() {
  revalidatePath('/', 'layout'); // revalidate all data on the page
}

export async function startListenerAction(port: number): Promise&lt;{ success: boolean; message: string }&gt; {
  if (managerIsListening()) {
    return { success: false, message: "Listener is already active." };
  }
  try {
    await new Promise&lt;void&gt;((resolve, reject) =&gt; {
        managerStartListening(
            port,
            () =&gt; { // onReady (listening)
                revalidateHomePage();
                resolve();
            },
            (error) =&gt; { // onError (server error)
                revalidateHomePage();
                reject(error);
            }
        );
    });
    return { success: true, message: `Attempting to listen on port ${port}...` };
  } catch (error: any) {
    return { success: false, message: `Failed to start listener: ${error.message}` };
  }
}

export async function sendCommandAction(command: string): Promise&lt;{ success: boolean; message: string }&gt; {
  if (!managerIsListening() || !managerGetClientAddress()) {
    return { success: false, message: "Not connected to any shell." };
  }
  const success = managerSendCommand(command);
  if (success) {
    // Command output will come via SSE
    return { success: true, message: `Command sent.` };
  } else {
    return { success: false, message: "Failed to send command. No client connected?" };
  }
}

export async function stopListenerAction(): Promise&lt;{ success: boolean; message: string }&gt; {
  if (!managerIsListening()) {
    // return { success: false, message: "Listener is not active." };
    // Allow stopping even if UI thinks it's running but backend somehow isn't
  }
  try {
    await managerStopListening();
    revalidateHomePage();
    return { success: true, message: "Listener stopped." };
  } catch (error: any) {
    revalidateHomePage(); // revalidate even on error to sync state
    return { success: false, message: `Failed to stop listener: ${error.message}` };
  }
}

export async function getListenerStatusAction(): Promise&lt;{
  isListening: boolean;
  listeningPort: number | null; // This is tricky, shell-manager doesn't explicitly store port after start
  clientAddress: string | null;
}&gt; {
  // Note: Getting the actual listeningPort after the fact if not stored is non-trivial.
  // The UI will manage the port it tried to start on.
  return {
    isListening: managerIsListening(),
    listeningPort: null, // UI should hold the target port
    clientAddress: managerGetClientAddress(),
  };
}
</code></pre>
      </div>
    </div>
  </body>

</html>