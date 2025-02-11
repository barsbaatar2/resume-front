import { Box, Typography, Container } from "@mui/material"
import Header from "./header"

export default function ApplicationsPage() {
  return (
    <Box sx={{ bgcolor: "background.default", minHeight: "100vh" }}>
      <Header />
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          My Applications
        </Typography>
        <Typography variant="body1">
          This is where you can view and manage your applications. Content coming soon.
        </Typography>
      </Container>
    </Box>
  )
}

