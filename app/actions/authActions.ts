"use server"

import { signIn } from "@/auth"
import { signInSchema } from "@/lib/definitions"
import { AuthError } from "next-auth"
import { z } from "zod"

export async function handleCredentialsSignIn({ email, password }: z.infer<typeof signInSchema>) {
  try {
    await signIn("credentials", { email, password, redirect: false}) 
    return {
      success: true,    
      message: "Authentication successul"    
    }  
  }
  catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin": 
          return {
            success: false,   
            message: "Invalid credentials"    
          }
        default:
          return {
            success: false,   
            message: "Something went wrong"    
          }
      }    
    } 
  }
}
