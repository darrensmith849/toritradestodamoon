'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import { cn } from '@/lib/utils'

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

/** Seeded random walk with slight upward bias */
function generatePricePoints(count: number): number[] {
  const pts: number[] = [100]
  for (let i = 1; i < count; i++) {
    const delta = (Math.random() - 0.47) * 2.4 // slight upward bias
    pts.push(pts[i - 1] + delta)
  }
  return pts
}

/** Map a price value into the SVG y-coordinate space */
function priceToY(
  price: number,
  min: number,
  max: number,
  height: number,
  padding: number
): number {
  const range = max - min || 1
  return padding + ((max - price) / range) * (height - padding * 2)
}

/** Build an SVG polyline points string */
function buildPolyline(
  prices: number[],
  width: number,
  height: number,
  padding: number
): string {
  if (prices.length < 2) return ''
  const min = Math.min(...prices)
  const max = Math.max(...prices)
  const stepX = width / (prices.length - 1)
  return prices
    .map((p, i) => `${i * stepX},${priceToY(p, min, max, height, padding)}`)
    .join(' ')
}

/** Build the closed area-fill polygon (line + bottom edge) */
function buildAreaPolygon(
  prices: number[],
  width: number,
  height: number,
  padding: number
): string {
  if (prices.length < 2) return ''
  const line = buildPolyline(prices, width, height, padding)
  const stepX = width / (prices.length - 1)
  const lastX = (prices.length - 1) * stepX
  return `${line} ${lastX},${height} 0,${height}`
}

/** Generate random volume bars */
function generateVolumeBars(count: number): number[] {
  return Array.from({ length: count }, () => 0.15 + Math.random() * 0.85)
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

const POINT_COUNT = 48
const VOLUME_COUNT = 24
const SVG_PADDING = 12

interface AnimatedPriceChartProps {
  className?: string
  height?: number
}

export function AnimatedPriceChart({
  className,
  height = 200,
}: AnimatedPriceChartProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [svgWidth, setSvgWidth] = useState(400)
  const [prices, setPrices] = useState<number[]>(() =>
    generatePricePoints(POINT_COUNT)
  )
  const [volumes, setVolumes] = useState<number[]>(() =>
    generateVolumeBars(VOLUME_COUNT)
  )

  // Track container width
  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    const ro = new ResizeObserver((entries) => {
      for (const entry of entries) {
        setSvgWidth(entry.contentRect.width)
      }
    })
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  // Animate: push a new price, shift the array
  const tick = useCallback(() => {
    setPrices((prev) => {
      const last = prev[prev.length - 1]
      const delta = (Math.random() - 0.47) * 2.4
      const next = [...prev.slice(1), last + delta]
      return next
    })
    setVolumes((prev) => {
      const next = [...prev.slice(1), 0.15 + Math.random() * 0.85]
      return next
    })
  }, [])

  useEffect(() => {
    const id = setInterval(tick, 1500)
    return () => clearInterval(id)
  }, [tick])

  // Derived values
  const polyline = buildPolyline(prices, svgWidth, height, SVG_PADDING)
  const areaPolygon = buildAreaPolygon(prices, svgWidth, height, SVG_PADDING)
  const min = Math.min(...prices)
  const max = Math.max(...prices)
  const currentPrice = prices[prices.length - 1]
  const prevPrice = prices[prices.length - 2]
  const trending = currentPrice >= prevPrice

  // Current dot position
  const dotXClamped = svgWidth - 1
  const dotY = priceToY(currentPrice, min, max, height, SVG_PADDING)

  // Grid lines
  const gridCount = 5
  const gridLines = Array.from({ length: gridCount }, (_, i) => {
    const y =
      SVG_PADDING +
      (i / (gridCount - 1)) * (height - SVG_PADDING * 2)
    return y
  })

  // Volume bar dimensions
  const volumeH = 28

  return (
    <div ref={containerRef} className={cn('w-full relative', className)}>
      {/* Main chart SVG */}
      <svg
        width="100%"
        height={height}
        viewBox={`0 0 ${svgWidth} ${height}`}
        preserveAspectRatio="none"
        className="overflow-visible"
      >
        <defs>
          {/* Area gradient */}
          <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
            <stop
              offset="0%"
              stopColor={trending ? 'rgb(52,211,153)' : 'rgb(248,113,113)'}
              stopOpacity="0.12"
            />
            <stop
              offset="100%"
              stopColor={trending ? 'rgb(52,211,153)' : 'rgb(248,113,113)'}
              stopOpacity="0"
            />
          </linearGradient>
          {/* Glow filter */}
          <filter id="lineGlow" x="-10%" y="-10%" width="120%" height="120%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Horizontal grid lines */}
        {gridLines.map((y, i) => (
          <line
            key={i}
            x1={0}
            y1={y}
            x2={svgWidth}
            y2={y}
            stroke="rgba(255,255,255,0.04)"
            strokeWidth={1}
          />
        ))}

        {/* --- Trend lines (hint at analysis, don't reveal strategy) --- */}
        {(() => {
          // Simple moving average (smoothed line)
          const maWindow = 10
          const maPoints = prices.map((_, i) => {
            const start = Math.max(0, i - maWindow + 1)
            const slice = prices.slice(start, i + 1)
            return slice.reduce((a, b) => a + b, 0) / slice.length
          })
          const maLine = maPoints
            .map((p, i) => {
              const x = (i / (prices.length - 1)) * svgWidth
              const y = priceToY(p, min, max, height, SVG_PADDING)
              return `${x},${y}`
            })
            .join(' ')

          // Support line — connects two recent lows
          const recentPrices = prices.slice(-30)
          const recentMin = Math.min(...recentPrices)
          const supportY = priceToY(recentMin + 0.3, min, max, height, SVG_PADDING)

          // Resistance line — connects two recent highs
          const recentMax = Math.max(...recentPrices)
          const resistY = priceToY(recentMax - 0.3, min, max, height, SVG_PADDING)

          return (
            <>
              {/* Moving average line */}
              <polyline
                points={maLine}
                fill="none"
                stroke="rgba(245,185,60,0.25)"
                strokeWidth={1}
                strokeDasharray="4 3"
                style={{ transition: 'all 0.8s ease-out' }}
              />
              {/* Support line */}
              <line
                x1={svgWidth * 0.3}
                y1={supportY}
                x2={svgWidth}
                y2={supportY - 4}
                stroke="rgba(52,211,153,0.18)"
                strokeWidth={1}
                strokeDasharray="6 4"
              />
              {/* Resistance line */}
              <line
                x1={svgWidth * 0.25}
                y1={resistY}
                x2={svgWidth}
                y2={resistY + 3}
                stroke="rgba(248,113,113,0.15)"
                strokeWidth={1}
                strokeDasharray="6 4"
              />
              {/* Tiny labels */}
              <text
                x={svgWidth * 0.31}
                y={supportY + 10}
                fill="rgba(52,211,153,0.3)"
                fontSize="8"
                fontFamily="monospace"
              >
                S
              </text>
              <text
                x={svgWidth * 0.26}
                y={resistY - 4}
                fill="rgba(248,113,113,0.3)"
                fontSize="8"
                fontFamily="monospace"
              >
                R
              </text>
              <text
                x={8}
                y={priceToY(maPoints[maPoints.length - 1], min, max, height, SVG_PADDING) - 4}
                fill="rgba(245,185,60,0.3)"
                fontSize="8"
                fontFamily="monospace"
              >
                MA
              </text>
            </>
          )
        })()}

        {/* Area fill */}
        <polygon points={areaPolygon} fill="url(#areaGrad)" />

        {/* Price line (glow) */}
        <polyline
          points={polyline}
          fill="none"
          stroke={trending ? 'rgb(52,211,153)' : 'rgb(248,113,113)'}
          strokeWidth={2.5}
          strokeLinecap="round"
          strokeLinejoin="round"
          filter="url(#lineGlow)"
          style={{ transition: 'all 0.8s ease-out' }}
        />

        {/* Price line (crisp) */}
        <polyline
          points={polyline}
          fill="none"
          stroke={trending ? 'rgb(52,211,153)' : 'rgb(248,113,113)'}
          strokeWidth={1.5}
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{ transition: 'all 0.8s ease-out' }}
        />

        {/* Pulsing dot at current price */}
        <circle
          cx={dotXClamped}
          cy={dotY}
          r={6}
          fill={trending ? 'rgb(52,211,153)' : 'rgb(248,113,113)'}
          opacity={0.25}
          style={{ transition: 'all 0.8s ease-out' }}
        >
          <animate
            attributeName="r"
            values="4;8;4"
            dur="2s"
            repeatCount="indefinite"
          />
          <animate
            attributeName="opacity"
            values="0.3;0.1;0.3"
            dur="2s"
            repeatCount="indefinite"
          />
        </circle>
        <circle
          cx={dotXClamped}
          cy={dotY}
          r={3}
          fill={trending ? 'rgb(52,211,153)' : 'rgb(248,113,113)'}
          style={{ transition: 'all 0.8s ease-out' }}
        />
      </svg>

      {/* Current price label */}
      <div
        className="absolute right-0 flex items-center gap-1.5 pointer-events-none"
        style={{
          top: dotY - 10,
          transition: 'top 0.8s ease-out',
        }}
      >
        <div
          className={cn(
            'px-2 py-0.5 rounded text-[11px] font-body font-semibold tabular-nums',
            trending
              ? 'bg-success/15 text-success'
              : 'bg-danger/15 text-danger'
          )}
        >
          ${currentPrice.toFixed(2)}
        </div>
      </div>

      {/* Volume bars */}
      <div className="flex items-end gap-[2px] mt-1" style={{ height: volumeH }}>
        {volumes.map((v, i) => (
          <div
            key={i}
            className="flex-1 rounded-sm"
            style={{
              height: `${v * 100}%`,
              backgroundColor:
                i === volumes.length - 1
                  ? trending
                    ? 'rgba(52,211,153,0.25)'
                    : 'rgba(248,113,113,0.25)'
                  : 'rgba(255,255,255,0.06)',
              transition: 'height 0.8s ease-out',
            }}
          />
        ))}
      </div>
    </div>
  )
}
