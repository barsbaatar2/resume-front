"use client"

import { Box, Container, Typography, Grid, Card, Button, TextField, InputAdornment } from "@mui/material"
import { Search as SearchIcon } from "@mui/icons-material"
import Header from "./header"

export default function JobsPage() {
  return (
    <Box sx={{ bgcolor: "background.default", minHeight: "100vh" }}>
      <Header />
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Box sx={{ mb: 4 }}>
          <Typography variant="h4" sx={{ mb: 3 }}>
            Job & Projects
          </Typography>
          <TextField
            fullWidth
            placeholder="Search for jobs..."
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
            sx={{ maxWidth: 480 }}
          />
        </Box>

        <Grid container spacing={3}>
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <Grid item xs={12} md={6} lg={4} key={item}>
              <Card sx={{ p: 3 }}>
                <Typography variant="h6" sx={{ mb: 1 }}>
                  Senior Frontend Developer
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  Company Name • Full Time • Remote
                </Typography>
                <Typography variant="body2" sx={{ mb: 3 }}>
                  We are looking for an experienced Frontend Developer to join our team...
                </Typography>
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <Typography variant="body2" color="text.secondary">
                    Posted 2 days ago
                  </Typography>
                  <Button variant="outlined">Apply Now</Button>
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  )
}

