<html>
  
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="../style.css">
    <base target="_parent">
    <title data-trilium-title>src/components/ui/chart.tsx</title>
  </head>
  
  <body>
    <div class="content">
       <h1 data-trilium-h1>src/components/ui/chart.tsx</h1>

      <div class="ck-content"><pre><code class="language-application-javascript-env-frontend">
"use client"

import * as React from "react"
import * as RechartsPrimitive from "recharts"

import { cn } from "@/lib/utils"

// Format: { THEME_NAME: CSS_SELECTOR }
const THEMES = { light: "", dark: ".dark" } as const

export type ChartConfig = {
  [k in string]: {
    label?: React.ReactNode
    icon?: React.ComponentType
  } &amp; (
    | { color?: string; theme?: never }
    | { color?: never; theme: Record&lt;keyof typeof THEMES, string&gt; }
  )
}

type ChartContextProps = {
  config: ChartConfig
}

const ChartContext = React.createContext&lt;ChartContextProps | null&gt;(null)

function useChart() {
  const context = React.useContext(ChartContext)

  if (!context) {
    throw new Error("useChart must be used within a &lt;ChartContainer /&gt;")
  }

  return context
}

const ChartContainer = React.forwardRef&lt;
  HTMLDivElement,
  React.ComponentProps&lt;"div"&gt; &amp; {
    config: ChartConfig
    children: React.ComponentProps&lt;
      typeof RechartsPrimitive.ResponsiveContainer
    &gt;["children"]
  }
&gt;(({ id, className, children, config, ...props }, ref) =&gt; {
  const uniqueId = React.useId()
  const chartId = `chart-${id || uniqueId.replace(/:/g, "")}`

  return (
    &lt;ChartContext.Provider value={{ config }}&gt;
      &lt;div
        data-chart={chartId}
        ref={ref}
        className={cn(
          "flex aspect-video justify-center text-xs [&amp;_.recharts-cartesian-axis-tick_text]:fill-muted-foreground [&amp;_.recharts-cartesian-grid_line[stroke='#ccc']]:stroke-border/50 [&amp;_.recharts-curve.recharts-tooltip-cursor]:stroke-border [&amp;_.recharts-dot[stroke='#fff']]:stroke-transparent [&amp;_.recharts-layer]:outline-none [&amp;_.recharts-polar-grid_[stroke='#ccc']]:stroke-border [&amp;_.recharts-radial-bar-background-sector]:fill-muted [&amp;_.recharts-rectangle.recharts-tooltip-cursor]:fill-muted [&amp;_.recharts-reference-line_[stroke='#ccc']]:stroke-border [&amp;_.recharts-sector[stroke='#fff']]:stroke-transparent [&amp;_.recharts-sector]:outline-none [&amp;_.recharts-surface]:outline-none",
          className
        )}
        {...props}
      &gt;
        &lt;ChartStyle id={chartId} config={config} /&gt;
        &lt;RechartsPrimitive.ResponsiveContainer&gt;
          {children}
        &lt;/RechartsPrimitive.ResponsiveContainer&gt;
      &lt;/div&gt;
    &lt;/ChartContext.Provider&gt;
  )
})
ChartContainer.displayName = "Chart"

const ChartStyle = ({ id, config }: { id: string; config: ChartConfig }) =&gt; {
  const colorConfig = Object.entries(config).filter(
    ([, config]) =&gt; config.theme || config.color
  )

  if (!colorConfig.length) {
    return null
  }

  return (
    &lt;style
      dangerouslySetInnerHTML={{
        __html: Object.entries(THEMES)
          .map(
            ([theme, prefix]) =&gt; `
${prefix} [data-chart=${id}] {
${colorConfig
  .map(([key, itemConfig]) =&gt; {
    const color =
      itemConfig.theme?.[theme as keyof typeof itemConfig.theme] ||
      itemConfig.color
    return color ? `  --color-${key}: ${color};` : null
  })
  .join("\n")}
}
`
          )
          .join("\n"),
      }}
    /&gt;
  )
}

const ChartTooltip = RechartsPrimitive.Tooltip

const ChartTooltipContent = React.forwardRef&lt;
  HTMLDivElement,
  React.ComponentProps&lt;typeof RechartsPrimitive.Tooltip&gt; &amp;
    React.ComponentProps&lt;"div"&gt; &amp; {
      hideLabel?: boolean
      hideIndicator?: boolean
      indicator?: "line" | "dot" | "dashed"
      nameKey?: string
      labelKey?: string
    }
&gt;(
  (
    {
      active,
      payload,
      className,
      indicator = "dot",
      hideLabel = false,
      hideIndicator = false,
      label,
      labelFormatter,
      labelClassName,
      formatter,
      color,
      nameKey,
      labelKey,
    },
    ref
  ) =&gt; {
    const { config } = useChart()

    const tooltipLabel = React.useMemo(() =&gt; {
      if (hideLabel || !payload?.length) {
        return null
      }

      const [item] = payload
      const key = `${labelKey || item.dataKey || item.name || "value"}`
      const itemConfig = getPayloadConfigFromPayload(config, item, key)
      const value =
        !labelKey &amp;&amp; typeof label === "string"
          ? config[label as keyof typeof config]?.label || label
          : itemConfig?.label

      if (labelFormatter) {
        return (
          &lt;div className={cn("font-medium", labelClassName)}&gt;
            {labelFormatter(value, payload)}
          &lt;/div&gt;
        )
      }

      if (!value) {
        return null
      }

      return &lt;div className={cn("font-medium", labelClassName)}&gt;{value}&lt;/div&gt;
    }, [
      label,
      labelFormatter,
      payload,
      hideLabel,
      labelClassName,
      config,
      labelKey,
    ])

    if (!active || !payload?.length) {
      return null
    }

    const nestLabel = payload.length === 1 &amp;&amp; indicator !== "dot"

    return (
      &lt;div
        ref={ref}
        className={cn(
          "grid min-w-[8rem] items-start gap-1.5 rounded-lg border border-border/50 bg-background px-2.5 py-1.5 text-xs shadow-xl",
          className
        )}
      &gt;
        {!nestLabel ? tooltipLabel : null}
        &lt;div className="grid gap-1.5"&gt;
          {payload.map((item, index) =&gt; {
            const key = `${nameKey || item.name || item.dataKey || "value"}`
            const itemConfig = getPayloadConfigFromPayload(config, item, key)
            const indicatorColor = color || item.payload.fill || item.color

            return (
              &lt;div
                key={item.dataKey}
                className={cn(
                  "flex w-full flex-wrap items-stretch gap-2 [&amp;&gt;svg]:h-2.5 [&amp;&gt;svg]:w-2.5 [&amp;&gt;svg]:text-muted-foreground",
                  indicator === "dot" &amp;&amp; "items-center"
                )}
              &gt;
                {formatter &amp;&amp; item?.value !== undefined &amp;&amp; item.name ? (
                  formatter(item.value, item.name, item, index, item.payload)
                ) : (
                  &lt;&gt;
                    {itemConfig?.icon ? (
                      &lt;itemConfig.icon /&gt;
                    ) : (
                      !hideIndicator &amp;&amp; (
                        &lt;div
                          className={cn(
                            "shrink-0 rounded-[2px] border-[--color-border] bg-[--color-bg]",
                            {
                              "h-2.5 w-2.5": indicator === "dot",
                              "w-1": indicator === "line",
                              "w-0 border-[1.5px] border-dashed bg-transparent":
                                indicator === "dashed",
                              "my-0.5": nestLabel &amp;&amp; indicator === "dashed",
                            }
                          )}
                          style={
                            {
                              "--color-bg": indicatorColor,
                              "--color-border": indicatorColor,
                            } as React.CSSProperties
                          }
                        /&gt;
                      )
                    )}
                    &lt;div
                      className={cn(
                        "flex flex-1 justify-between leading-none",
                        nestLabel ? "items-end" : "items-center"
                      )}
                    &gt;
                      &lt;div className="grid gap-1.5"&gt;
                        {nestLabel ? tooltipLabel : null}
                        &lt;span className="text-muted-foreground"&gt;
                          {itemConfig?.label || item.name}
                        &lt;/span&gt;
                      &lt;/div&gt;
                      {item.value &amp;&amp; (
                        &lt;span className="font-mono font-medium tabular-nums text-foreground"&gt;
                          {item.value.toLocaleString()}
                        &lt;/span&gt;
                      )}
                    &lt;/div&gt;
                  &lt;/&gt;
                )}
              &lt;/div&gt;
            )
          })}
        &lt;/div&gt;
      &lt;/div&gt;
    )
  }
)
ChartTooltipContent.displayName = "ChartTooltip"

const ChartLegend = RechartsPrimitive.Legend

const ChartLegendContent = React.forwardRef&lt;
  HTMLDivElement,
  React.ComponentProps&lt;"div"&gt; &amp;
    Pick&lt;RechartsPrimitive.LegendProps, "payload" | "verticalAlign"&gt; &amp; {
      hideIcon?: boolean
      nameKey?: string
    }
&gt;(
  (
    { className, hideIcon = false, payload, verticalAlign = "bottom", nameKey },
    ref
  ) =&gt; {
    const { config } = useChart()

    if (!payload?.length) {
      return null
    }

    return (
      &lt;div
        ref={ref}
        className={cn(
          "flex items-center justify-center gap-4",
          verticalAlign === "top" ? "pb-3" : "pt-3",
          className
        )}
      &gt;
        {payload.map((item) =&gt; {
          const key = `${nameKey || item.dataKey || "value"}`
          const itemConfig = getPayloadConfigFromPayload(config, item, key)

          return (
            &lt;div
              key={item.value}
              className={cn(
                "flex items-center gap-1.5 [&amp;&gt;svg]:h-3 [&amp;&gt;svg]:w-3 [&amp;&gt;svg]:text-muted-foreground"
              )}
            &gt;
              {itemConfig?.icon &amp;&amp; !hideIcon ? (
                &lt;itemConfig.icon /&gt;
              ) : (
                &lt;div
                  className="h-2 w-2 shrink-0 rounded-[2px]"
                  style={{
                    backgroundColor: item.color,
                  }}
                /&gt;
              )}
              {itemConfig?.label}
            &lt;/div&gt;
          )
        })}
      &lt;/div&gt;
    )
  }
)
ChartLegendContent.displayName = "ChartLegend"

// Helper to extract item config from a payload.
function getPayloadConfigFromPayload(
  config: ChartConfig,
  payload: unknown,
  key: string
) {
  if (typeof payload !== "object" || payload === null) {
    return undefined
  }

  const payloadPayload =
    "payload" in payload &amp;&amp;
    typeof payload.payload === "object" &amp;&amp;
    payload.payload !== null
      ? payload.payload
      : undefined

  let configLabelKey: string = key

  if (
    key in payload &amp;&amp;
    typeof payload[key as keyof typeof payload] === "string"
  ) {
    configLabelKey = payload[key as keyof typeof payload] as string
  } else if (
    payloadPayload &amp;&amp;
    key in payloadPayload &amp;&amp;
    typeof payloadPayload[key as keyof typeof payloadPayload] === "string"
  ) {
    configLabelKey = payloadPayload[
      key as keyof typeof payloadPayload
    ] as string
  }

  return configLabelKey in config
    ? config[configLabelKey]
    : config[key as keyof typeof config]
}

export {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
  ChartStyle,
}
</code></pre>
      </div>
    </div>
  </body>

</html>