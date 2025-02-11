"use client"

import type React from "react"
import { useState } from "react"
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Stack,
  Typography,
  Chip,
  Box,
  IconButton,
} from "@mui/material"
import { Close as CloseIcon, Add as AddIcon } from "@mui/icons-material"
import type { ProfileData } from "@/types/profile"

interface EditProfileModalProps {
  open: boolean
  onClose: () => void
  profile: ProfileData
  onSave: (updatedProfile: ProfileData) => void
}

export default function EditProfileModal({ open, onClose, profile, onSave }: EditProfileModalProps) {
  const [editedProfile, setEditedProfile] = useState<ProfileData>(profile)
  const [newSkill, setNewSkill] = useState("")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setEditedProfile((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleNestedChange = (category: string, field: string, value: string) => {
    setEditedProfile((prev) => ({
      ...prev,
      [category]: {
        ...prev[category],
        [field]: value,
      },
    }))
  }

  const handleAddSkill = () => {
    if (newSkill.trim() !== "") {
      setEditedProfile((prev) => ({
        ...prev,
        skills: [...prev.skills, newSkill.trim()],
      }))
      setNewSkill("")
    }
  }

  const handleRemoveSkill = (skillToRemove: string) => {
    setEditedProfile((prev) => ({
      ...prev,
      skills: prev.skills.filter((skill) => skill !== skillToRemove),
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave(editedProfile)
  }

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle>
        Edit Your Profile
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent>
          <Stack spacing={3}>
            <TextField label="Name" name="name" value={editedProfile.name} onChange={handleChange} fullWidth />
            <TextField
              label="About Me"
              name="about"
              value={editedProfile.about}
              onChange={handleChange}
              multiline
              rows={4}
              fullWidth
            />
            <Typography variant="h6">Job Categories</Typography>
            <TextField
              label="Primary Job Category"
              name="primary"
              value={editedProfile.jobCategories.primary}
              onChange={(e) => handleNestedChange("jobCategories", "primary", e.target.value)}
              fullWidth
            />
            <TextField
              label="Secondary Job Category"
              name="secondary"
              value={editedProfile.jobCategories.secondary}
              onChange={(e) => handleNestedChange("jobCategories", "secondary", e.target.value)}
              fullWidth
            />
            <Typography variant="h6">Contact Information</Typography>
            <TextField
              label="Phone"
              name="phone"
              value={editedProfile.contact.phone}
              onChange={(e) => handleNestedChange("contact", "phone", e.target.value)}
              fullWidth
            />
            <TextField
              label="Email"
              name="email"
              value={editedProfile.contact.email}
              onChange={(e) => handleNestedChange("contact", "email", e.target.value)}
              fullWidth
            />
            <TextField
              label="Address"
              name="address"
              value={editedProfile.contact.address}
              onChange={(e) => handleNestedChange("contact", "address", e.target.value)}
              fullWidth
            />
            <Typography variant="h6">Skills</Typography>
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
              {editedProfile.skills.map((skill, index) => (
                <Chip key={index} label={skill} onDelete={() => handleRemoveSkill(skill)} />
              ))}
            </Box>
            <Box sx={{ display: "flex", gap: 1 }}>
              <TextField
                label="Add a new skill"
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
                fullWidth
              />
              <Button variant="contained" onClick={handleAddSkill} startIcon={<AddIcon />}>
                Add
              </Button>
            </Box>
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button type="submit" variant="contained">
            Save Changes
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  )
}

