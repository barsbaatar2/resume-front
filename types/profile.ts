export interface ProfileData {
    name: string
    about: string
    jobCategories: {
      primary: string
      secondary: string
    }
    contact: {
      phone: string
      email: string
      address: string
    }
    skills: string[]
    [key: string]: any
  }