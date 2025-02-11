"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import {
  api,
  setAuthToken,
  fetchUserProfile,
  fetchUserSkills,
  createUserSkill,
  deleteUserSkill,
  updateUserProfile,
  uploadProfilePicture,
  fetchUserExperiences,
  createUserExperience,
  updateUserExperience,
  deleteUserExperience,
  generateResumeApi,
} from "./api"

type Skill = {
  id: number
  name: string
}

type Experience = {
  id: number
  name: string
  year: number
}

type User = {
  pdfDate: string | number | Date
  pdfData: any
  createdAt: string | number | Date
  id: number
  email: string
  firstName: string
  lastName: string
  phoneNumber: string
  avatar: string | null
  views: number
  follows: number
  workMode: string | null
  workType: string | null
  workCommitment: string | null
  rateValue: number
  rateType: string | null
  primaryJob: string | null
  secondaryJob: string | null
  address: string | null
  facebook: string | null
  instagram: string | null
  linkedin: string | null
  twitter: string | null
  aboutMe: string | null
  skills: Skill[]
  experiences: Experience[]
}

type AuthContextType = {
  user: User | null
  setUser: (user: User | null) => void
  logout: () => void
  isLoggedIn: boolean
  fetchProfile: () => Promise<void>
  generateResume: () => Promise<void>
  addSkill: (skillName: string) => Promise<void>
  removeSkill: (skillId: number) => Promise<void>
  updateProfile: (profileData: Partial<User>) => Promise<void>
  updateProfilePicture: (base64Image: string) => Promise<void>
  fetchExperiences: () => Promise<void>
  addExperience: (experienceData: { name: string; year: number }) => Promise<void>
  updateExperience: (experienceId: number, experienceData: { name: string; year: number }) => Promise<void>
  removeExperience: (experienceId: number) => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUserState] = useState<User | null>(null)
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  const setUser = (newUser: User | any) => {
    setUserState(newUser)
    setIsLoggedIn(!!newUser)
  }

  useEffect(() => {
    const token = localStorage.getItem("accessToken")
    if (token) {
      setAuthToken(token)
      fetchProfile()
    }
  }, [])

  const fetchProfile = async () => {
    try {
      const [userData, userSkills, userExperiences] = await Promise.all([
        fetchUserProfile(),
        fetchUserSkills(),
        fetchUserExperiences(),
      ])
      setUser({ ...userData, skills: userSkills, experiences: userExperiences })
    } catch (error) {
      console.error("Error fetching user data:", error)
      logout()
    }
  }

  const generateResume = async () => {
    try {
      const resume = await generateResumeApi();

      const [userData, userSkills, userExperiences] = await Promise.all([
        fetchUserProfile(),
        fetchUserSkills(),
        fetchUserExperiences(),
      ])
      setUser({ ...userData, skills: userSkills, experiences: userExperiences })
    } catch (error) {
      console.error("Error fetching user data:", error)
      logout()
    }
  }

  const logout = () => {
    setUser(null)
    setIsLoggedIn(false)
    localStorage.removeItem("accessToken")
    localStorage.removeItem("refreshToken")
    delete api.defaults.headers.common["Authorization"]
  }

  const addSkill = async (skillName: string) => {
    try {
      const newSkill = await createUserSkill(skillName)
      setUser((prevUser:any) => {
        if (prevUser) {
          return { ...prevUser, skills: [...prevUser.skills, newSkill] }
        }
        return prevUser
      })
    } catch (error) {
      console.error("Error adding skill:", error)
      throw error
    }
  }

  const removeSkill = async (skillId: number) => {
    try {
      await deleteUserSkill(skillId)
      setUser((prevUser:any) => {
        if (prevUser) {
          return { ...prevUser, skills: prevUser.skills.filter((skill:any) => skill.id !== skillId) }
        }
        return prevUser
      })
    } catch (error) {
      console.error("Error removing skill:", error)
      throw error
    }
  }

  const updateProfile = async (profileData: Partial<User>) => {
    try {
      const updatedUser = await updateUserProfile(profileData)
      setUser((prevUser:any) => {
        if (prevUser) {
          return { ...prevUser, ...updatedUser }
        }
        return prevUser
      })
    } catch (error) {
      console.error("Error updating profile:", error)
      throw error
    }
  }

  const updateProfilePicture = async (base64Image: string) => {
    try {
      const updatedUser = await uploadProfilePicture(base64Image)
      setUser((prevUser:any) => {
        if (prevUser) {
          return { ...prevUser, avatar: updatedUser.avatar }
        }
        return prevUser
      })
    } catch (error) {
      console.error("Error updating profile picture:", error)
      throw error
    }
  }

  const fetchExperiences = async () => {
    try {
      const experiences = await fetchUserExperiences()
      setUser((prevUser:any) => {
        if (prevUser) {
          return { ...prevUser, experiences }
        }
        return prevUser
      })
    } catch (error) {
      console.error("Error fetching experiences:", error)
      throw error
    }
  }

  const addExperience = async (experienceData: { name: string; year: number }) => {
    try {
      const newExperience = await createUserExperience(experienceData)
      setUser((prevUser:any) => {
        if (prevUser) {
          return { ...prevUser, experiences: [...prevUser.experiences, newExperience] }
        }
        return prevUser
      })
    } catch (error) {
      console.error("Error adding experience:", error)
      throw error
    }
  }

  const updateExperience = async (experienceId: number, experienceData: { name: string; year: number }) => {
    try {
      const updatedExperience = await updateUserExperience(experienceId, experienceData)
      setUser((prevUser:any) => {
        if (prevUser) {
          return {
            ...prevUser,
            experiences: prevUser.experiences.map((exp:any) => (exp.id === experienceId ? updatedExperience : exp)),
          }
        }
        return prevUser
      })
    } catch (error) {
      console.error("Error updating experience:", error)
      throw error
    }
  }

  const removeExperience = async (experienceId: number) => {
    try {
      await deleteUserExperience(experienceId)
      setUser((prevUser:any) => {
        if (prevUser) {
          return {
            ...prevUser,
            experiences: prevUser.experiences.filter((exp:any) => exp.id !== experienceId),
          }
        }
        return prevUser
      })
    } catch (error) {
      console.error("Error removing experience:", error)
      throw error
    }
  }

  const contextValue = {
    user,
    setUser,
    logout,
    isLoggedIn,
    fetchProfile,
    generateResume,
    addSkill,
    removeSkill,
    updateProfile,
    updateProfilePicture,
    fetchExperiences,
    addExperience,
    updateExperience,
    removeExperience,
  }

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

