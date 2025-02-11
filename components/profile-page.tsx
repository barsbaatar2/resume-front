"use client"

import { useState, useEffect } from "react"
import { Box, Card, Container, Link, Stack, Tab, Tabs, Typography, Grid, Button } from "@mui/material"
import { Facebook, Instagram, LinkedIn, Twitter } from "@mui/icons-material"
import Header from "./header"
import type { ProfileData } from "@/types/profile"
import { InlineEditText, InlineEditTextArea, InlineEditSkills, InlineEditDropdown } from "./inline-edit-components"
import { InlineEditRate } from "./inline-edit-rate"
import { useAuth } from "@/lib/auth-context"
import { useRouter } from "next/navigation"
import { ProfilePictureUpload } from "./profile-picture-upload"
import { ExperienceManager } from "./experience-manager"
import { SocialLinksEditor } from "./social-links-editor"

const workModeOptions = ["Yes", "No", "Flexible"]
const workTypeOptions = ["Remote", "On-site", "Hybrid"]
const workCommitmentOptions = ["Full-time", "Part-time", "Project-based", "Freelance"]

export default function ProfilePage() {
  const [tab, setTab] = useState("resume")
  const [loading, setLoading] = useState(false)
  const { user, isLoggedIn, fetchProfile, addSkill, removeSkill, updateProfile, generateResume } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isLoggedIn) {
      router.push("/login")
    } else if (!user) {
      fetchProfile()
    }
  }, [isLoggedIn, user, router, fetchProfile])

  const handleUpdateField = async (field: keyof ProfileData, value: any) => {
    try {
      if (field === "skills") {
        return
      } else {
        await updateProfile({ [field]: value })
      }
    } catch (error) {
      console.error("Failed to update profile:", error)
    }
  }

  const handleUpdateSkills = async (skills: string[]) => {
    try {
      const currentSkills = user?.skills || []
      const skillsToAdd = skills.filter((skill) => !currentSkills.some((s) => s.name === skill))
      const skillsToRemove = currentSkills.filter((skill) => !skills.includes(skill.name))

      for (const skill of skillsToAdd) {
        await addSkill(skill)
      }

      for (const skill of skillsToRemove) {
        await removeSkill(skill.id)
      }
    } catch (error) {
      console.error("Failed to update skills:", error)
    }
  }

  const handleUpdateRate = async (value: number, frequency: "hourly" | "daily" | "weekly" | "monthly") => {
    try {
      await updateProfile({ rateValue: value, rateType: frequency })
    } catch (error) {
      console.error("Failed to update rate:", error)
    }
  }

  if (!isLoggedIn || !user) {
    return null;
  }

  return (
    <Box sx={{ bgcolor: "background.default", minHeight: "100vh" }}>
      <Header />
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Typography variant="h5" sx={{ mb: 3, fontWeight: 700 }}>
          Profile
        </Typography>

        {/* Main Profile Card - Full Width */}
        <Card sx={{ mb: 2, borderRadius: '16px' }}>
          <Box
            sx={{
              p: 3,
              display: "flex",
              gap: 3,
              flexDirection: { xs: "column", sm: "row" },
              alignItems: { xs: "center", sm: "flex-start" },
            }}
          >
            <ProfilePictureUpload />
            <Box sx={{ flex: 1, width: "100%", textAlign: { xs: "center", sm: "left" } }}>
              <InlineEditText
                value={`${user.firstName} ${user.lastName}`}
                style={{ fontSize: "30px", fontWeight: 600 }}
                onSave={(value) => {
                  const [firstName, ...lastNameParts] = value.split(" ")
                  const lastName = lastNameParts.join(" ")
                  handleUpdateField("firstName", firstName)
                  handleUpdateField("lastName", lastName)
                }}
              />
              <Stack
                direction={{ xs: "column", sm: "row" }}
                spacing={{ xs: 2, sm: 4 }}
                sx={{ mt: 1, justifyContent: { xs: "center", sm: "flex-start" } }}
              >
                <Box>
                  <Typography variant="caption" color="text.secondary">
                    Joined
                  </Typography>
                  <Typography style={{ fontWeight: 600 }}>{new Date(user.createdAt).toLocaleDateString()}</Typography>
                </Box>
                <Box>
                  <Typography variant="caption" color="text.secondary">
                    Lambda Talent ID
                  </Typography>
                  <Typography style={{ fontWeight: 600 }}>{user.id}</Typography>
                </Box>
                <Box>
                  <Typography variant="caption" color="text.secondary">
                    Viewed
                  </Typography>
                  <Typography style={{ fontWeight: 600 }}>{user.views} times</Typography>
                </Box>
                <Box>
                  <Typography variant="caption" color="text.secondary">
                    Followed by
                  </Typography>
                  <Typography style={{ fontWeight: 600 }}>{user.follows} companies</Typography>
                </Box>
              </Stack>
            </Box>
          </Box>
        </Card>

        {/* Work Information and Main Content Grid */}
        <Grid container spacing={2}>
          {/* Left Sidebar - Work Information */}
          <Grid item xs={12} md={3}>
            <Card sx={{ p: 3, height: "fit-content" }}>
              <Stack spacing={3}>
                <InlineEditDropdown
                  label="Work Mode"
                  value={user.workMode || ""}
                  options={workModeOptions}
                  onSave={(value) => handleUpdateField("workMode", value)}
                />
                <InlineEditDropdown
                  label="Work Type"
                  value={user.workType || ""}
                  options={workTypeOptions}
                  onSave={(value) => handleUpdateField("workType", value)}
                />
                <InlineEditDropdown
                  label="Work Commitment"
                  value={user.workCommitment || ""}
                  options={workCommitmentOptions}
                  onSave={(value) => handleUpdateField("workCommitment", value)}
                />
                <InlineEditRate
                  label="Rate"
                  value={user.rateValue}
                  frequency={user.rateType as "hourly" | "daily" | "weekly" | "monthly"}
                  onSave={handleUpdateRate}
                />
              </Stack>
            </Card>
          </Grid>

          {/* Main Content Area */}
          <Grid item xs={12} md={9}>
            {/* Personal Information */}

            <Card sx={{ p: 3, mb: 2 }}>

              <Tabs
                value={tab}
                onChange={(_, v) => setTab(v)}
                sx={{
                  borderBottom: 1,
                  borderColor: "divider",
                }}
              >
                <Tab value="resume" label="Resume" style={{ fontWeight: 'bold', fontSize: 16 }} />
                <Tab value="portfolio" label="Portfolio" style={{ fontWeight: 'bold', fontSize: 16 }} disabled />
              </Tabs>

              <Box sx={{ p: 3 }}>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    flexDirection: { xs: "column", sm: "row" },
                    gap: 2,
                  }}
                >
                  {user.pdfData ? (
                    <Box sx={{ display: "flex", flexDirection: "column", alignItems: { xs: "center", sm: "flex-start" }, textAlign: { xs: "center", sm: "left" } }}>
                      <Link target="_blank" rel="noopener noreferrer" href={`https://test.ionsapp.com${user.pdfData}`}>
                        <Typography sx={{ wordBreak: "break-all" }}>
                          {user.pdfData.split("/").pop()}
                        </Typography>
                      </Link>
                      <Typography color="text.secondary" sx={{ fontSize: 14 }}>
                        {new Date(user.pdfDate).toLocaleString()}
                      </Typography>
                    </Box>
                  ) : (
                    <Box />
                  )}

                  <Button
                    variant="contained"
                    sx={{ minWidth: 120, mt: { xs: 1, sm: 0 } }}
                    onClick={async () => {
                      setLoading(true);
                      await generateResume();
                      setLoading(false);
                    }}
                    disabled={loading}
                  >
                    {loading ? "Loading..." : user.pdfData ? "Update" : "Generate"}
                  </Button>
                </Box>
              </Box>

            </Card>
            <Card sx={{ p: 3, mb: 2 }}>
              <Typography variant="h6" sx={{ mb: 2 }}>
                Personal Information
              </Typography>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <InlineEditText
                    label="Primary Job Category"
                    value={user.primaryJob || ""}
                    onSave={(value) => handleUpdateField("primaryJob", value)}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <InlineEditText
                    label="Secondary Job Category"
                    value={user.secondaryJob || ""}
                    onSave={(value) => handleUpdateField("secondaryJob", value)}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <InlineEditText
                    label="Phone"
                    value={user.phoneNumber || ""}
                    onSave={(value) => handleUpdateField("phoneNumber", value)}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <InlineEditText
                    label="Email"
                    value={user.email}
                    onSave={(value) => handleUpdateField("email", value)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <InlineEditText
                    label="Address"
                    value={user.address || ""}
                    onSave={(value) => handleUpdateField("address", value)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <SocialLinksEditor />
                </Grid>
              </Grid>
            </Card>

            {/* About Me */}
            <Card sx={{ p: 3, mb: 2 }}>
              <Typography variant="h6" sx={{ mb: 2 }}>
                About Me
              </Typography>
              <InlineEditTextArea value={user.aboutMe || ""} onSave={(value) => handleUpdateField("aboutMe", value)} />
            </Card>

            {/* Skills */}
            <Card sx={{ p: 3, mb: 2 }}>
              <Typography variant="h6" sx={{ mb: 2 }}>
                Skills
              </Typography>
              <InlineEditSkills skills={user.skills.map((skill) => skill.name)} onSave={handleUpdateSkills} />
            </Card>

            {/* Experience */}
            <Card sx={{ p: 3 }}>
              <ExperienceManager />
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Box>
  )
}

