import { Box, Typography, Container } from "@mui/material"
import Header from "./header"

export default function HomePage() {
  return (
    <Box sx={{ bgcolor: "background.default", minHeight: "100vh" }}>
      <Header />
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Home Page
        </Typography>
        <Typography variant="body1">Welcome to the home page. This is a placeholder for the main content.</Typography>
      </Container>
    </Box>
  )
}

