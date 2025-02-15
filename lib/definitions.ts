import { object, string } from "zod"

export type User = {
    id: "string"
    name: "string"
    email: "string"
    role: "string"
}

export const baseSchema = object({
  email: string({ required_error: "Email is required" })
    .min(1, "Email is required")
    .email("Invalid email")
});

export const signInSchema = baseSchema.extend({
  password: string({ required_error: "Password is required" })
    .min(7, "Password must be more than 7 characters")
    .max(32, "Password must be less than 32 characters")
});

export const emailOnlySchema = baseSchema;