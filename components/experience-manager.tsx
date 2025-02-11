"use client"

import React, { useState } from "react"
import { Box, Typography, Grid, IconButton, TextField, Button, Divider } from "@mui/material"
import { Edit as EditIcon, Delete as DeleteIcon } from "@mui/icons-material"
import { useAuth } from "@/lib/auth-context"

export function ExperienceManager() {
  const { user, addExperience, updateExperience, removeExperience } = useAuth()
  const [editingId, setEditingId] = useState<number | null>(null)
  const [editForm, setEditForm] = useState<{ name: string; year: number } | null>(null)

  const handleStartEdit = (id: number) => {
    const experience = user?.experiences.find((exp) => exp.id === id)
    if (experience) {
      setEditingId(id)
      setEditForm({ name: experience.name, year: experience.year })
    }
  }

  const handleSave = async () => {
    if (editingId && editForm) {
      await updateExperience(editingId, editForm)
      setEditingId(null)
      setEditForm(null)
    }
  }

  return (
    <Box>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
        <Typography variant="h6">Experience</Typography>
        {/* <IconButton size="small">
          <EditIcon />
        </IconButton> */}
      </Box>

      {user?.experiences.map((experience, index) => (
        <React.Fragment key={experience.id}>
        <Grid container spacing={3} key={experience.id} sx={{ mb: 2 }} alignItems={"center"}>
          <Grid item xs={12} sm={6}>
            <Typography variant="caption" color="text.secondary" display="block" gutterBottom>
              Number of Years:
            </Typography>
            {editingId === experience.id ? (
              <TextField
                value={editForm?.year || ""}
                onChange={(e) =>
                  setEditForm((prev) => (prev ? { ...prev, year: Number.parseInt(e.target.value) } : null))
                }
                onBlur={handleSave}
                variant="standard"
                type="number"
                fullWidth
              />
            ) : (
              <Typography sx={{ cursor: "pointer" }} onClick={() => handleStartEdit(experience.id)}>
                {experience.year} years.
              </Typography>
            )}
          </Grid>
          <Grid item xs={12} sm={5}>
            <Typography variant="caption" color="text.secondary" display="block" gutterBottom>
              Companies and Projects:
            </Typography>
            {editingId === experience.id ? (
              <TextField
                value={editForm?.name || ""}
                onChange={(e) => setEditForm((prev) => (prev ? { ...prev, name: e.target.value } : null))}
                onBlur={handleSave}
                variant="standard"
                fullWidth
              />
            ) : (
              <Typography sx={{ cursor: "pointer" }} onClick={() => handleStartEdit(experience.id)}>
                {experience.name}
              </Typography>
            )}
          </Grid>
          {editingId === experience.id ? (
            <Grid item xs={12} sm={1}>
              <IconButton size="small" onClick={() => removeExperience(experience.id)}>
                <DeleteIcon />
              </IconButton>
            </Grid>
          ) : null}
        </Grid>
        {index < user.experiences.length - 1 && <Divider sx={{ my: 2 }} />}

        </React.Fragment>
      ))}

      {user?.experiences.length === 0 && <Typography color="text.secondary">No experiences added yet.</Typography>}

      <Button
        startIcon={<EditIcon />}
        onClick={() => {
          const newId = Math.max(0, ...(user?.experiences?.map((e) => e.id) || [])) + 1
          addExperience({ name: "", year: 0 })
          handleStartEdit(newId)
        }}
        sx={{ mt: 2 }}
      >
        Add Experience
      </Button>
    </Box>
  )
}

