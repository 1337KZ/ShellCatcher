<html>
  
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="../style.css">
    <base target="_parent">
    <title data-trilium-title>src/app/page.tsx</title>
  </head>
  
  <body>
    <div class="content">
       <h1 data-trilium-h1>src/app/page.tsx</h1>

      <div class="ck-content"><pre><code class="language-text-plain">
"use client";

import * as React from "react";
import { CommandInput } from "@/components/command-input";
import { TerminalDisplay } from "@/components/terminal-display";
import type { LogEntry } from "@/types";
import { useToast } from "@/hooks/use-toast";
import { HardDriveDownload, Play, StopCircle, Wifi, WifiOff, Server } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  startListenerAction,
  sendCommandAction,
  stopListenerAction,
  getListenerStatusAction
} from "./shell-actions";

export default function ReverseShellPage() {
  const [logEntries, setLogEntries] = React.useState&lt;LogEntry[]&gt;([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [isProcessingCommand, setIsProcessingCommand] = React.useState(false);
  const [port, setPort] = React.useState("4444");
  const [isListening, setIsListening] = React.useState(false);
  const [connectedClient, setConnectedClient] = React.useState&lt;string | null&gt;(null);
  const [appHostname, setAppHostname] = React.useState&lt;string | null&gt;(null);
  const eventSourceRef = React.useRef&lt;EventSource | null&gt;(null);
  const { toast } = useToast();

  const addLogEntry = React.useCallback((content: string, type: LogEntry['type']) =&gt; {
    setLogEntries((prev) =&gt; [
      ...prev,
      { id: crypto.randomUUID(), content, type, timestamp: new Date().toISOString() },
    ]);
  }, []);

  React.useEffect(() =&gt; {
    // Determine hostname on client side
    if (typeof window !== "undefined") {
      setAppHostname(window.location.hostname);
    }

    // Fetch initial status when component mounts
    const fetchStatus = async () =&gt; {
      setIsLoading(true);
      try {
        const status = await getListenerStatusAction();
        setIsListening(status.isListening);
        setConnectedClient(status.clientAddress);
        if (status.isListening) {
          addLogEntry("Listener was already active. Client: " + (status.clientAddress || "None"), "system");
          connectToSse();
        }
      } catch (e: any) {
        addLogEntry(`Error fetching initial status: ${e.message}`, "error");
      }
      setIsLoading(false);
    };
    fetchStatus();

    return () =&gt; {
      if (eventSourceRef.current) {
        eventSourceRef.current.close();
      }
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const connectToSse = React.useCallback(() =&gt; {
    if (eventSourceRef.current) {
      eventSourceRef.current.close();
    }
    const es = new EventSource("/api/shell-events");
    eventSourceRef.current = es;

    es.onopen = () =&gt; {
      console.log("SSE connection opened.");
    };

    es.addEventListener('data', (event) =&gt; {
      const data = JSON.parse(event.data);
      addLogEntry(data, "output");
    });

    es.addEventListener('status', (event) =&gt; {
      const statusPayload = JSON.parse(event.data);
      let message = statusPayload;
      if (typeof statusPayload === 'object' &amp;&amp; statusPayload.message) {
        message = statusPayload.message;
      }

      if (typeof message === 'string') {
        if (message.startsWith("LISTENING:")) {
          const listeningPort = message.split(":")[1];
          setIsListening(true);
          setPort(listeningPort); // Update port state if listener confirms a different one (e.g. from initial status)
          addLogEntry(`Successfully listening on port ${listeningPort}. Waiting for connection...`, "status");
        } else if (message.startsWith("CLIENT_CONNECTED:")) {
          const clientAddr = message.split(":")[1];
          setConnectedClient(clientAddr);
          addLogEntry(`Client connected: ${clientAddr}`, "status");
        } else if (message === "CLIENT_DISCONNECTED") {
          addLogEntry("Client disconnected.", "status");
          setConnectedClient(null);
        } else if (message === "LISTENER_STOPPED") {
          addLogEntry("Listener stopped.", "status");
          setIsListening(false);
          setConnectedClient(null);
          if (eventSourceRef.current) eventSourceRef.current.close();
        } else if (message.startsWith("LISTENER_ERROR:") || message.startsWith("CLIENT_ERROR:")) {
          addLogEntry(message, "error");
          setIsListening(false);
          setConnectedClient(null);
        } else if (message === "SSE_STREAM_OPENED") {
          addLogEntry("Real-time event stream connected.", "system");
        } else {
          addLogEntry(message, "system");
        }
      }
    });

    es.onerror = (err) =&gt; {
      console.error("SSE error:", err);
      addLogEntry("Error with real-time event stream. It might have closed.", "error");
      if (es) es.close();
    };
  }, [addLogEntry]);


  const handleStartListening = async () =&gt; {
    if (!/^\d+$/.test(port) || parseInt(port, 10) &lt;= 0 || parseInt(port, 10) &gt; 65535) {
      toast({ title: "Invalid Port", description: "Port must be a number between 1 and 65535.", variant: "destructive" });
      return;
    }
    setIsLoading(true);
    addLogEntry(`Attempting to start listener on port ${port}...`, "system");
    const result = await startListenerAction(parseInt(port, 10));
    if (result.success) {
      connectToSse();
      toast({ title: "Listener Action", description: result.message });
    } else {
      addLogEntry(`Failed to start listener: ${result.message}`, "error");
      toast({ title: "Listener Error", description: result.message, variant: "destructive" });
    }
    setIsLoading(false);
  };

  const handleStopListening = async () =&gt; {
    setIsLoading(true);
    addLogEntry("Attempting to stop listener...", "system");
    const result = await stopListenerAction();
    if (result.success) {
      toast({ title: "Listener Action", description: result.message });
    } else {
      addLogEntry(`Failed to stop listener: ${result.message}`, "error");
      toast({ title: "Listener Error", description: result.message, variant: "destructive" });
    }
    setIsLoading(false);
  };

  const handleCommandSubmit = async (command: string) =&gt; {
    if (!isListening || !connectedClient) {
      addLogEntry("Cannot send command: Not listening or no client connected.", "error");
      return;
    }
    setIsProcessingCommand(true);
    addLogEntry(command, "command");
    const result = await sendCommandAction(command);
    if (!result.success) {
      addLogEntry(`Error sending command: ${result.message}`, "error");
      toast({ title: "Command Error", description: result.message, variant: "destructive" });
    }
    setIsProcessingCommand(false);
  };

  return (
    &lt;div className="container mx-auto px-4 py-6 sm:px-6 sm:py-8 md:px-8 md:py-12 flex flex-col min-h-screen bg-background text-foreground"&gt;
      &lt;header className="mb-6 md:mb-8 text-center sm:text-left"&gt;
        &lt;div className="flex items-center justify-center sm:justify-start gap-3 mb-2"&gt;
          &lt;HardDriveDownload className="h-10 w-10 text-primary" /&gt;
          &lt;h1 className="text-3xl sm:text-4xl font-headline font-bold text-primary"&gt;
            Reverse Shell Catcher
          &lt;/h1&gt;
        &lt;/div&gt;
        &lt;p className="text-sm sm:text-base text-muted-foreground"&gt;
          Enter a port and start listening for incoming reverse shell connections.
        &lt;/p&gt;
      &lt;/header&gt;

      &lt;section className="mb-6 md:mb-8 p-4 border rounded-lg shadow-sm bg-card"&gt;
        &lt;div className="flex flex-col sm:flex-row gap-4 items-end"&gt;
          &lt;div className="flex-grow"&gt;
            &lt;Label htmlFor="port-input" className="mb-1 block text-sm font-medium text-muted-foreground"&gt;
              Listening Port
            &lt;/Label&gt;
            &lt;Input
              id="port-input"
              type="number"
              value={port}
              onChange={(e) =&gt; setPort(e.target.value)}
              placeholder="e.g., 4444"
              disabled={isLoading || isListening}
              className="font-code"
            /&gt;
          &lt;/div&gt;
          {!isListening ? (
            &lt;Button onClick={handleStartListening} disabled={isLoading} size="lg" className="w-full sm:w-auto"&gt;
              &lt;Play className="mr-2 h-5 w-5" /&gt;
              Start Listening
            &lt;/Button&gt;
          ) : (
            &lt;Button onClick={handleStopListening} disabled={isLoading} variant="destructive" size="lg" className="w-full sm:w-auto"&gt;
              &lt;StopCircle className="mr-2 h-5 w-5" /&gt;
              Stop Listening
            &lt;/Button&gt;
          )}
        &lt;/div&gt;
        &lt;div className="mt-4 text-sm text-muted-foreground flex items-center gap-2"&gt;
          {isListening ? &lt;Wifi className="h-5 w-5 text-green-500" /&gt; : &lt;WifiOff className="h-5 w-5 text-red-500" /&gt;}
          &lt;span&gt;Status: {isListening ? `Listening on port ${port}` : "Not listening"}&lt;/span&gt;
          {isListening &amp;&amp; connectedClient &amp;&amp; &lt;span className="font-semibold text-primary"&gt;| Connected to: {connectedClient}&lt;/span&gt;}
          {isListening &amp;&amp; !connectedClient &amp;&amp; &lt;span className="italic"&gt;| Waiting for connection...&lt;/span&gt;}
        &lt;/div&gt;
        {appHostname &amp;&amp; (
          &lt;div className="mt-3 p-3 bg-secondary/50 rounded-md text-sm"&gt;
            &lt;div className="flex items-center gap-2 font-medium"&gt;
              &lt;Server className="h-4 w-4 text-primary"/&gt;
              &lt;span&gt;Connection Target:&lt;/span&gt;
            &lt;/div&gt;
            &lt;p className="mt-1 font-code text-primary"&gt;
              {appHostname}:{port}
            &lt;/p&gt;
            &lt;p className="mt-1 text-xs text-muted-foreground/80"&gt;
              Use this address and port on your target machine to establish the reverse shell.
            &lt;/p&gt;
          &lt;/div&gt;
        )}
      &lt;/section&gt;

      &lt;main className="flex-grow flex flex-col gap-4 md:gap-6"&gt;
        &lt;CommandInput
          onSubmit={handleCommandSubmit}
          isLoading={isProcessingCommand || !connectedClient}
          placeholder={connectedClient ? "Enter command for remote shell..." : "Waiting for connection..."}
        /&gt;
        &lt;TerminalDisplay entries={logEntries} /&gt;
      &lt;/main&gt;

      &lt;footer className="mt-8 md:mt-12 pt-6 border-t border-border text-center text-xs sm:text-sm text-muted-foreground"&gt;
        &lt;p&gt;&amp;copy; {new Date().getFullYear()} Reverse Shell Catcher. Use responsibly.&lt;/p&gt;
        &lt;p&gt;This tool is for educational and authorized penetration testing purposes only.&lt;/p&gt;
      &lt;/footer&gt;
    &lt;/div&gt;
  );
}
</code></pre>
      </div>
    </div>
  </body>

</html>