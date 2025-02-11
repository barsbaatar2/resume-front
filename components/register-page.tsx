"use client"

import { useState } from "react"
import { Box, Container, Typography, TextField, Button, Link as MuiLink, Alert } from "@mui/material"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Header from "./header"
import { signUp } from "@/lib/api"

export default function RegisterPage() {
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    try {
      await signUp({ email, firstName, lastName, password })
      router.push("/login")
    } catch (error) {
      console.error("Registration failed:", error)
      setError("Registration failed. Please try again.")
    }
  }

  return (
    <Box sx={{ bgcolor: "background.default", minHeight: "100vh" }}>
      <Header />
      <Container maxWidth="xs" sx={{ pt: 8 }}>
        <Typography variant="h4" component="h1" gutterBottom align="center">
          Sign up
        </Typography>
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="firstName"
            label="First Name"
            name="firstName"
            autoComplete="given-name"
            autoFocus
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="lastName"
            label="Last Name"
            name="lastName"
            autoComplete="family-name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="new-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
            Sign Up
          </Button>
          <Box sx={{ textAlign: "center" }}>
            <Link href="/login" passHref>
              <MuiLink variant="body2">{"Already have an account? Log in"}</MuiLink>
            </Link>
          </Box>
        </Box>
      </Container>
    </Box>
  )
}

