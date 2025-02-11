"use client"

import { serverFunction } from "@/lib/server-actions"

export function ClientComponent() {
  const handleClick = async () => {
    await serverFunction()
  }

  return <button onClick={handleClick}>Perform Server Action</button>
}

