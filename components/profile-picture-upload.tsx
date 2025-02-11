import type React from "react"
import { useState, useRef } from "react"
import { Avatar, Box, Typography } from "@mui/material"
import { useAuth } from "@/lib/auth-context"

const MAX_FILE_SIZE = 5 * 1024 * 1024 // 5MB

export function ProfilePictureUpload() {
  const { user, updateProfilePicture } = useAuth()
  const [error, setError] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    if (file.size > MAX_FILE_SIZE) {
      setError("File size exceeds 5MB limit")
      return
    }

    try {
      const base64 = await convertToBase64(file)
      await updateProfilePicture(base64)
      setError(null)
    } catch (err) {
      setError("Failed to upload image")
      console.error(err)
    }
  }

  const convertToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => resolve(reader.result as string)
      reader.onerror = (error) => reject(error)
    })
  }

  return (
    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      <input type="file" accept="image/*" style={{ display: "none" }} ref={fileInputRef} onChange={handleFileChange} />
      <Avatar
        src={user?.avatar || "/placeholder.svg?height=80&width=80"}
        sx={{ width: 80, height: 80, mb: 2, cursor: "pointer" }}
        onClick={() => fileInputRef.current?.click()}
      />
      {error && (
        <Typography color="error" variant="body2" sx={{ mt: 1 }}>
          {error}
        </Typography>
      )}
    </Box>
  )
}

