<html>
  
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="../style.css">
    <base target="_parent">
    <title data-trilium-title>src/lib/shell-manager.ts</title>
  </head>
  
  <body>
    <div class="content">
       <h1 data-trilium-h1>src/lib/shell-manager.ts</h1>

      <div class="ck-content"><pre><code class="language-application-javascript-env-frontend">
// src/lib/shell-manager.ts

import type { Socket } from 'net';
import net from 'net';

interface ShellManagerState {
  server: net.Server | null;
  clientSocket: Socket | null;
  onDataCallback: ((type: 'data' | 'status', payload: string) =&gt; void) | null;
  isStopping: boolean;
}

const state: ShellManagerState = {
  server: null,
  clientSocket: null,
  onDataCallback: null,
  isStopping: false,
};

function emitEvent(type: 'data' | 'status', payload: string) {
  if (state.onDataCallback) {
    state.onDataCallback(type, payload);
  }
}

export function startListening(
  port: number,
  onReady: () =&gt; void,
  onError: (error: Error) =&gt; void
): void {
  if (state.server) {
    onError(new Error("Server is already listening."));
    return;
  }
  state.isStopping = false;

  state.server = net.createServer((socket) =&gt; {
    if (state.clientSocket) {
      console.log("Rejecting new connection, already have one client.");
      socket.write("Server busy, only one client allowed.\n");
      socket.end();
      return;
    }
    const clientAddress = `${socket.remoteAddress}:${socket.remotePort}`;
    console.log(`Reverse shell client connected: ${clientAddress}`);
    emitEvent('status', `CLIENT_CONNECTED:${clientAddress}`);
    state.clientSocket = socket;

    socket.on('data', (data) =&gt; {
      const output = data.toString();
      // console.log('Received from shell:', output);
      emitEvent('data', output);
    });

    socket.on('close', () =&gt; {
      console.log(`Reverse shell client disconnected: ${clientAddress}`);
      if (!state.isStopping) { // Avoid double event if we initiated stop
        emitEvent('status', 'CLIENT_DISCONNECTED');
      }
      state.clientSocket = null;
    });

    socket.on('error', (err) =&gt; {
      console.error(`Client socket error (${clientAddress}):`, err.message);
      if (!state.isStopping) {
        emitEvent('status', `CLIENT_ERROR:${err.message}`);
      }
      if (state.clientSocket === socket) {
        state.clientSocket = null;
      }
    });
  });

  state.server.on('error', (err: any) =&gt; {
    console.error('Server error:', err);
    state.server = null; // Ensure server is cleared on error
    emitEvent('status', `LISTENER_ERROR:${err.message}`);
    onError(err);
  });

  state.server.on('listening', () =&gt; {
    console.log(`Reverse shell listener started on port ${port}`);
    emitEvent('status', `LISTENING:${port}`);
    onReady();
  });

  state.server.listen(port);
}

export function sendCommandToShell(command: string): boolean {
  if (state.clientSocket &amp;&amp; !state.clientSocket.destroyed) {
    // console.log('Sending command to shell:', command);
    state.clientSocket.write(command + '\n'); // Add newline for shell commands
    return true;
  }
  return false;
}

export async function stopListening(): Promise&lt;void&gt; {
  console.log('Attempting to stop listener...');
  state.isStopping = true;
  return new Promise((resolve) =&gt; {
    if (state.clientSocket) {
      console.log('Destroying client socket...');
      state.clientSocket.destroy(); // Forcefully close
      state.clientSocket = null;
    }
    if (state.server) {
      state.server.close((err) =&gt; {
        if (err) {
            console.error("Error closing server:", err);
        }
        console.log('Reverse shell listener stopped.');
        state.server = null;
        emitEvent('status', 'LISTENER_STOPPED');
        state.isStopping = false;
        resolve();
      });
    } else {
      console.log('Listener was not running.');
      emitEvent('status', 'LISTENER_STOPPED'); // Ensure UI updates if it thought it was running
      state.isStopping = false;
      resolve();
    }
  });
}

export function isListening(): boolean {
  return !!state.server;
}

export function getConnectedClientAddress(): string | null {
    return state.clientSocket ? `${state.clientSocket.remoteAddress}:${state.clientSocket.remotePort}` : null;
}

export function setSessionDataCallback(callback: ((type: 'data' | 'status', payload: string) =&gt; void) | null) {
    state.onDataCallback = callback;
}
</code></pre>
      </div>
    </div>
  </body>

</html>