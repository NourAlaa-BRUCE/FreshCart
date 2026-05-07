import * as z from "zod"

export const loginSchema = z.object({

  email: z.email("Invalid email address").nonempty("Email is required"),
  password: z.string()
    .regex(
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
      "Password must contain at least 8 characters, including uppercase, lowercase, number, and special character"
    ),  
})

export type SigninType = z.infer<typeof loginSchema>