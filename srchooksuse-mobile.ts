<html>
  
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="../style.css">
    <base target="_parent">
    <title data-trilium-title>src/hooks/use-mobile.ts</title>
  </head>
  
  <body>
    <div class="content">
       <h1 data-trilium-h1>src/hooks/use-mobile.ts</h1>

      <div class="ck-content"><pre><code class="language-application-javascript-env-frontend">import * as React from "react"

const MOBILE_BREAKPOINT = 768

export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState&lt;boolean | undefined&gt;(undefined)

  React.useEffect(() =&gt; {
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)
    const onChange = () =&gt; {
      setIsMobile(window.innerWidth &lt; MOBILE_BREAKPOINT)
    }
    mql.addEventListener("change", onChange)
    setIsMobile(window.innerWidth &lt; MOBILE_BREAKPOINT)
    return () =&gt; mql.removeEventListener("change", onChange)
  }, [])

  return !!isMobile
}
</code></pre>
      </div>
    </div>
  </body>

</html>