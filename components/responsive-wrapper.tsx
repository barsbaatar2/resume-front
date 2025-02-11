"use client"

import type { ReactNode } from "react"
import { useBreakpoint } from "@/lib/useBreakpoint"

interface ResponsiveWrapperProps {
  mobileContent: ReactNode
  desktopContent: ReactNode
}

export function ResponsiveWrapper({ mobileContent, desktopContent }: ResponsiveWrapperProps) {
  const { isXs, isSm } = useBreakpoint()
  const isMobile = isXs || isSm

  return isMobile ? mobileContent : desktopContent
}

