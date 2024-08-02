"use server"

import { signIn } from "@/auth"
export async function signin() {

    // Auth.js Spotify login

    await signIn("spotify", { redirectTo: "/" })
    
    // -------------------------------------------- //
}