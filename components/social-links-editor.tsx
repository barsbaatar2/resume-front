"use client"

import { Box, Grid } from "@mui/material"
import { Facebook, LinkedIn, Instagram, Twitter } from "@mui/icons-material"
import { InlineEditText } from "./inline-edit-components"
import { useAuth } from "@/lib/auth-context"

export function SocialLinksEditor() {
  const { user, updateProfile } = useAuth()

  const handleSave = async (field: string, value: string) => {
    await updateProfile({ [field]: value })
  }

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={6}>
        <Box display="flex" alignItems="center" gap={1}>
          <Facebook />
          <InlineEditText
            value={user?.facebook || ""}
            onSave={(value) => handleSave("facebook", value)}
            label="Facebook"
            style={{ flexGrow: 1 }}
          />
        </Box>
      </Grid>
      <Grid item xs={12} sm={6}>
        <Box display="flex" alignItems="center" gap={1}>
          <LinkedIn />
          <InlineEditText
            value={user?.linkedin || ""}
            onSave={(value) => handleSave("linkedin", value)}
            label="LinkedIn"
            style={{ flexGrow: 1 }}
          />
        </Box>
      </Grid>
      <Grid item xs={12} sm={6}>
        <Box display="flex" alignItems="center" gap={1}>
          <Instagram />
          <InlineEditText
            value={user?.instagram || ""}
            onSave={(value) => handleSave("instagram", value)}
            label="Instagram"
            style={{ flexGrow: 1 }}
          />
        </Box>
      </Grid>
      <Grid item xs={12} sm={6}>
        <Box display="flex" alignItems="center" gap={1}>
          <Twitter />
          <InlineEditText
            value={user?.twitter || ""}
            onSave={(value) => handleSave("twitter", value)}
            label="Twitter"
            style={{ flexGrow: 1 }}
          />
        </Box>
      </Grid>
    </Grid>
  )
}

