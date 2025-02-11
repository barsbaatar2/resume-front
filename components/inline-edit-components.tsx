"use client"

import { useState, useRef, useEffect } from "react"
import { TextField, Typography, Box, Chip, Button, Select, MenuItem, Autocomplete } from "@mui/material"
import { Save as SaveIcon, Close as CloseIcon, Add as AddIcon } from "@mui/icons-material"
import type React from "react"
import { fetchAllSkills } from "@/lib/api"
import type { SelectChangeEvent } from "@mui/material"

interface InlineEditProps {
  value: string
  onSave: (value: string) => Promise<void> | any
  label?: string
  style?: React.CSSProperties
}

export function InlineEditText({ value, onSave, label, style }: InlineEditProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [editedValue, setEditedValue] = useState(value)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (isEditing) {
      inputRef.current?.focus()
    }
  }, [isEditing])

  const handleSave = async () => {
    if (editedValue !== value) {
      await onSave(editedValue)
    }
    setIsEditing(false)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSave()
    } else if (e.key === "Escape") {
      setIsEditing(false)
      setEditedValue(value)
    }
  }

  if (isEditing) {
    return (
      <Box display="flex" flexDirection="column">
        {label && (
          <Typography variant="caption" color="textSecondary" sx={{ mb: 1 }}>
            {label}
          </Typography>
        )}
        <TextField
          inputRef={inputRef}
          value={editedValue}
          onChange={(e) => setEditedValue(e.target.value)}
          onBlur={handleSave}
          onKeyDown={handleKeyDown}
          variant="standard"
          fullWidth
          size="small"
        />
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
        wordBreak: "break-word",
      }}
    >
      <Typography variant="body1" style={style ?? { fontWeight: "500" }}>
        {label && <span style={{ fontWeight: "normal", display: "block", fontSize: 14 }}>{label}: </span>}
        {value}
      </Typography>
    </Box>
  )
}

interface InlineEditTextAreaProps extends InlineEditProps {
  rows?: number
}

export function InlineEditTextArea({ value, onSave, label, rows = 4 }: InlineEditTextAreaProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [editedValue, setEditedValue] = useState(value)

  const handleSave = async () => {
    if (editedValue !== value) {
      await onSave(editedValue)
    }
    setIsEditing(false)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.ctrlKey && e.key === "Enter") {
      handleSave()
    } else if (e.key === "Escape") {
      setIsEditing(false)
      setEditedValue(value)
    }
  }

  if (isEditing) {
    return (
      <Box>
        {label && (
          <Typography variant="caption" color="textSecondary" sx={{ mb: 1 }}>
            {label}
          </Typography>
        )}
        <TextField
          value={editedValue}
          onChange={(e) => setEditedValue(e.target.value)}
          onBlur={handleSave}
          onKeyDown={handleKeyDown}
          variant="outlined"
          fullWidth
          multiline
          rows={rows}
        />
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
      <Typography variant="body1" sx={{ wordBreak: "break-word" }}>
        {value}
      </Typography>
    </Box>
  )
}

interface InlineEditSkillsProps {
  skills: string[]
  onSave: (skills: string[]) => Promise<void>
}

export function InlineEditSkills({ skills, onSave }: InlineEditSkillsProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [editedSkills, setEditedSkills] = useState(skills)
  const [newSkill, setNewSkill] = useState("")
  const [allSkills, setAllSkills] = useState<string[]>([])

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleAddSkill()
    }
  }

  useEffect(() => {
    const loadAllSkills = async () => {
      try {
        const fetchedSkills = await fetchAllSkills()
        setAllSkills(fetchedSkills)
      } catch (error) {
        console.error("Failed to fetch all skills:", error)
      }
    }
    loadAllSkills()
  }, [])

  const handleAddSkill = () => {
    if (newSkill && !editedSkills.includes(newSkill)) {
      setEditedSkills([...editedSkills, newSkill])
      setNewSkill("")
    }
  }

  const handleRemoveSkill = (skill: string) => {
    setEditedSkills(editedSkills.filter((s) => s !== skill))
  }

  const handleSave = async () => {
    if (JSON.stringify(editedSkills) !== JSON.stringify(skills)) {
      await onSave(editedSkills)
    }
    setIsEditing(false)
  }

  if (isEditing) {
    return (
      <Box>
        <Box display="flex" flexWrap="wrap" gap={1} mb={2}>
          {editedSkills.map((skill) => (
            <Chip key={skill} label={skill} onDelete={() => handleRemoveSkill(skill)} />
          ))}
        </Box>
        <Box display="flex" gap={1} mb={2}>
          <Autocomplete
            value={newSkill}
            onChange={(event, newValue) => {
              setNewSkill(newValue || "")
            }}
            inputValue={newSkill}
            onInputChange={(event, newInputValue) => {
              setNewSkill(newInputValue)
            }}
            options={allSkills.filter((skill) => !editedSkills.includes(skill))}
            renderInput={(params) => <TextField {...params} label="Add a skill" size="small" />}
            onKeyDown={handleKeyDown}
            freeSolo
            fullWidth
          />
          <Button onClick={handleAddSkill} startIcon={<AddIcon />}>
            Add
          </Button>
        </Box>
        <Button variant="contained" onClick={handleSave} startIcon={<SaveIcon />}>
          Done
        </Button>
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
      <Box display="flex" flexWrap="wrap" gap={1} justifyContent={{ xs: "center", sm: "flex-start" }}>
        {skills.map((skill) => (
          <Chip key={skill} label={skill} />
        ))}
      </Box>
    </Box>
  )
}

interface InlineEditDropdownProps {
  value: string
  options: string[]
  onSave: (value: string) => Promise<void>
  label: string
}

export function InlineEditDropdown({ value, options, onSave, label }: InlineEditDropdownProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [editedValue, setEditedValue] = useState(value)

  const handleChange = (event: SelectChangeEvent<string>) => {
    setEditedValue(event.target.value as string)
  }

  const handleSave = async () => {
    if (editedValue !== value) {
      await onSave(editedValue)
    }
    setIsEditing(false)
  }

  if (isEditing) {
    return (
      <Box display="flex" flexDirection="column">
        {label && (
          <Typography variant="caption" color="textSecondary" sx={{ mb: 1, fontSize: 12 }}>
            {label}
          </Typography>
        )}
        <Select
          value={editedValue}
          onChange={handleChange}
          onBlur={handleSave}
          variant="standard"
          fullWidth
          size="small"
        >
          {options.map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </Select>
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
        wordBreak: "break-word",
      }}
    >
      <Typography variant="body1" style={{ fontWeight: "bold" }}>
        <span style={{ display: "block", fontSize: 14, fontWeight: "normal" }}>{label}: </span>
        {value}
      </Typography>
    </Box>
  )
}

