"use server"

import React from 'react'

import { auth } from '@/auth'
import { redirect } from 'next/navigation'

import UserInfo from '@/components/spotify/userInfo'

async function page() {
  const session = await auth()

  if (session && session.user && session.accessToken) {
    return (

      // User dashboard
      <div>

        <UserInfo session={session} />

      </div>

    )
  } else {
    redirect("/signin")
  }
}

export default page