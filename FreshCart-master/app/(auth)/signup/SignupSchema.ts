import * as z from "zod"

export const SignupSchema = z.object({
  name: z.string()
    .min(2, "Name must be at least 2 characters")
    .max(100),

  email: z.string()
    .email("Invalid email address")
    .nonempty("Email is required"),

  password: z.string()
    .regex(
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
      "Password must contain at least 8 characters, including uppercase, lowercase, number, and special character"
    ),

  rePassword: z.string()
    .regex(
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
      "Password must contain at least 8 characters, including uppercase, lowercase, number, and special character"
    ),

  phone: z.string()
    .min(10, "Phone number must be at least 10 characters")
    .max(15, "Phone number must be at most 15 characters")
})
.refine((data) => data.password === data.rePassword, {
  message: "Passwords don't match",
  path: ["rePassword"]
})

export type SignupType = z.infer<typeof SignupSchema>