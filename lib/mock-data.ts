import type { ProfileData } from "@/types/profile"

export const mockProfile: ProfileData = {
  name: "Bilguudei Battumur",
  joinDate: "2024/02/12",
  talentId: "112",
  views: 112,
  followers: 113,
  workMode: "Yes",
  workType: "Remote",
  workCommitment: "Project-based",
  rate: {
    value: 35,
    frequency: "hourly",
  },
  jobCategories: {
    primary: "Engineer / UX Marketing",
    secondary: "Senior Product Manager",
  },
  contact: {
    phone: "95160215",
    email: "bilguudei0121@gmail.com",
    address: "UlanBator, MONGOLIA",
  },
  social: {
    facebook: "#",
    linkedin: "#",
    instagram: "#",
    twitter: "#",
  },
  about: `I started in mobile development before the invention of the iPhone in a mom-and-pop games company creating the first multiplayer cellphone games for Qualcomm's BREW platform in C and C++. Since then, I've done freelance and speculative work in many languages, especially Java and Kotlin, and created a few apps which can be seen on my app store page, demonstrating the use of Amazon Web Services S3, Lambda, and Cognito integration, TextToSpeech and SoundPool/MediaPlayer resources, and a custom and user-customizable InputMethodService (built-in keyboard), among other things.`,
  skills: ["Figma", "Design system", "Product design", "Design thinking", "Design thinking", "Design thinking"],
  experience: {
    years: 14,
    companies: ["Mobicom", "Yahoo", "Dell"],
  },
}

