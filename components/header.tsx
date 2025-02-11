"use client"

import { useState } from "react"
import Image from "next/image"
import {
  AppBar,
  Box,
  Button,
  IconButton,
  Toolbar,
  Container,
  Drawer,
  List,
  ListItem,
  ListItemText,
  useMediaQuery,
  useTheme,
} from "@mui/material"
import { Language as LanguageIcon, Person, Login, Logout, Menu as MenuIcon } from "@mui/icons-material"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { useAuth } from "@/lib/auth-context"

export default function Header() {
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { user, logout, isLoggedIn } = useAuth()
  const router = useRouter()
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down("md"))
  const [language, setLanguage] = useState("en")

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen)
  }

  const handleLogout = () => {
    logout()
    router.push("/login")
  }

  const menuItems = [
    { label: "Home", path: "/" },
    { label: "Job & Projects", path: "/jobs" },
    { label: "My Applications", path: "/applications" },
  ]

  const renderMenuItems = () => (
    <>
      {menuItems.map((item) => (
        <Link key={item.path} href={item.path} passHref>
          <Button
            color="inherit"
            sx={{
              color: pathname === item.path ? "primary.main" : "grey.900",
              fontWeight: 500,
            }}
          >
            {item.label}
          </Button>
        </Link>
      ))}
    </>
  )

  const renderMobileMenuItems = () => (
    <List>
      {menuItems.map((item) => (
        <ListItem
          key={item.path}
          component={Link}
          href={item.path}
          sx={{
            color: pathname === item.path ? "primary.main" : "grey.900",
          }}
        >
          <ListItemText primary={item.label} />
        </ListItem>
      ))}
    </List>
  )

  return (
    <AppBar position="static" color="default" elevation={0} sx={{ borderBottom: "1px solid", borderColor: "grey.200" }}>
      <Container maxWidth="lg">
        <Toolbar disableGutters sx={{ display: "flex", justifyContent: "space-between", height: 64 }}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Link href="/" passHref>
              <Box
                component="a"
                sx={{ display: "flex", alignItems: "center", textDecoration: "none", color: "inherit" }}
              >
                <Image
                  src="/icon.png"
                  alt="Lambda"
                  width={120}
                  height={28}
                  style={{
                    objectFit: "contain",
                  }}
                />
              </Box>
            </Link>
            {!isMobile && <Box sx={{ display: "flex", gap: 4, ml: 6 }}>{renderMenuItems()}</Box>}
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            {isMobile ? (
              <IconButton edge="start" color="inherit" aria-label="menu" onClick={toggleMobileMenu}>
                <MenuIcon />
              </IconButton>
            ) : (
              <>
                <Button
                  onClick={() => setLanguage(language === "en" ? "mn" : "en")}
                  startIcon={<LanguageIcon />}
                  sx={{
                    color: "grey.900",
                    textTransform: "none",
                    fontWeight: 500,
                    borderRadius: "8px",
                    px: 2,
                    "&:hover": {
                      bgcolor: "grey.200",
                    },
                  }}
                >
                  {language === "en" ? "EN" : "MN"}
                </Button>
              </>
            )}
            {isLoggedIn ? (
              <>
                <Link href="/profile" passHref>
                  <IconButton
                    sx={{
                      width: 40,
                      height: 40,
                      bgcolor: "background.paper",
                      border: "1px solid",
                      borderColor: "grey.200",
                      "&:hover": {
                        bgcolor: "grey.50",
                      },
                    }}
                  >
                    <Person />
                  </IconButton>
                </Link>
                <IconButton onClick={handleLogout} color="inherit">
                  <Logout />
                </IconButton>
              </>
            ) : (
              <Link href="/login" passHref>
                <IconButton color="inherit">
                  <Login />
                </IconButton>
              </Link>
            )}
          </Box>
        </Toolbar>
      </Container>
      <Drawer anchor="right" open={mobileMenuOpen} onClose={toggleMobileMenu}>
        <Box sx={{ width: 250 }} role="presentation" onClick={toggleMobileMenu} onKeyDown={toggleMobileMenu}>
          {renderMobileMenuItems()}
          {/*Removed MenuItem here*/}
        </Box>
      </Drawer>
    </AppBar>
  )
}

