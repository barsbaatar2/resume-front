"use client"

import { useMediaQuery } from "@mui/material"
import { breakpointValues } from "./theme"

export function useBreakpoint() {
  const isXs = useMediaQuery(`(max-width:${breakpointValues.sm - 1}px)`)
  const isSm = useMediaQuery(`(min-width:${breakpointValues.sm}px) and (max-width:${breakpointValues.md - 1}px)`)
  const isMd = useMediaQuery(`(min-width:${breakpointValues.md}px) and (max-width:${breakpointValues.lg - 1}px)`)
  const isLg = useMediaQuery(`(min-width:${breakpointValues.lg}px) and (max-width:${breakpointValues.xl - 1}px)`)
  const isXl = useMediaQuery(`(min-width:${breakpointValues.xl}px)`)

  return { isXs, isSm, isMd, isLg, isXl }
}

