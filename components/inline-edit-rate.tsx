"use client"

import { useState } from "react"
import { Box, TextField, Select, MenuItem, Typography, type SelectChangeEvent } from "@mui/material"

interface InlineEditRateProps {
  value: number
  frequency: "hourly" | "daily" | "weekly" | "monthly"
  onSave: (value: number, frequency: "hourly" | "daily" | "weekly" | "monthly") => Promise<void>
  label: string
}

export function InlineEditRate({ value, frequency, onSave, label }: InlineEditRateProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [editedValue, setEditedValue] = useState(value)
  const [editedFrequency, setEditedFrequency] = useState(frequency)

  const handleSave = async () => {
    if (editedValue !== value || editedFrequency !== frequency) {
      await onSave(editedValue, editedFrequency)
    }
    setIsEditing(false)
  }

  const handleValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEditedValue(Number(event.target.value))
  }

  const handleFrequencyChange = (event: SelectChangeEvent<"hourly" | "daily" | "weekly" | "monthly">) => {
    setEditedFrequency(event.target.value as "hourly" | "daily" | "weekly" | "monthly")
  }

  if (isEditing) {
    return (
      <Box display="flex" flexDirection="column">
        {label && (
          <Typography variant="caption" color="textSecondary" sx={{ mb: 1 }}>
            {label}
          </Typography>
        )}
        <Box display="flex" alignItems="center" gap={1}>
          <TextField
            value={editedValue}
            onChange={handleValueChange}
            onBlur={handleSave}
            variant="standard"
            type="number"
            size="small"
            sx={{ width: "80px" }}
          />
          <Select
            value={editedFrequency}
            onChange={handleFrequencyChange}
            onBlur={handleSave}
            variant="standard"
            size="small"
          >
            <MenuItem value="hourly">/ hour</MenuItem>
            <MenuItem value="daily">/ day</MenuItem>
            <MenuItem value="weekly">/ week</MenuItem>
            <MenuItem value="monthly">/ month</MenuItem>
          </Select>
        </Box>
      </Box>
    )
  }

  return (
    <Box
      onClick={() => setIsEditing(true)}
      sx={{
        cursor: "pointer",
        "&:hover": {
          backgroundColor: "action.hover",
          borderRadius: 1,
        },
        p: 1,
        width: "100%",
      }}
    >
      <Typography variant="body1" style={{ fontWeight: "bold" }}>
        <span style={{ fontWeight: "normal", display: "block", fontSize: 14 }}>{label}: </span>
        {`₮${value} / ${frequency}`}
      </Typography>
    </Box>
  )
}

