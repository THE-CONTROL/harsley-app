import { handlers } from "@/auth";

export const { GET, POST } = handlers
export const authRoutes: string[] = ["/signin", "/signup"]
export const apiAuthPrefix: string = "/api/auth"
export const DEFAULT_LOGIN_REDIRECT: string = "/"
export const LOGIN_ROUTE: string = "/signin"
