"use client"

import { useBreakpoint } from "@/lib/useBreakpoint"

export function ResponsiveComponent() {
  const { isXs, isSm } = useBreakpoint()
  const isMobile = isXs || isSm

  return <div>{isMobile ? "Mobile View" : "Desktop View"}</div>
}

