"use client"

import { useState } from "react"
import { Box, Container, Typography, TextField, Button, Link as MuiLink, Alert } from "@mui/material"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Header from "./header"
import { login, setAuthToken } from "@/lib/api"
import { useAuth } from "@/lib/auth-context"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const router = useRouter()
  const { setUser, fetchProfile } = useAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    try {
      const response = await login({ email, password })
      setAuthToken(response.accessToken)
      localStorage.setItem("accessToken", response.accessToken)
      localStorage.setItem("refreshToken", response.refreshToken)
      await fetchProfile()
      router.push("/profile")
    } catch (error) {
      console.error("Login failed:", error)
      setError("Invalid email or password. Please try again.")
    }
  }

  return (
    <Box sx={{ bgcolor: "background.default", minHeight: "100vh" }}>
      <Header />
      <Container maxWidth="xs" sx={{ pt: 8 }}>
        <Typography variant="h4" component="h1" gutterBottom align="center">
          Log in
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
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
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
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
            Log In
          </Button>
          <Box sx={{ textAlign: "center" }}>
            <Link href="/register" passHref>
              <MuiLink variant="body2">{"Don't have an account? Sign Up"}</MuiLink>
            </Link>
          </Box>
        </Box>
      </Container>
    </Box>
  )
}

