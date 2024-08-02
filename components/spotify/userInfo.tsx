"use client"

import { useState, useEffect } from 'react'

import { User } from '@/lib/types/userType'
import { Skeleton } from '../ui/skeleton'
import axios from 'axios'

import { Session } from 'next-auth'

function userInfo(params: { session: Session }) {

    const [user, setUser] = useState<User | null>(null)
    const [error, setError] = useState<string>("")
    const [isLoading, setIsLoading] = useState(true)

    const fetchUserId = async () => {
        try {
            const res = await axios.get<User>("https://api.spotify.com/v1/me", {
                headers: {
                    Authorization: 'Bearer ' + params.session?.accessToken
                }
            })

            const data = res.data

            setUser(data)

            console.log(data)

            if (data) {
                setIsLoading(false)
            }

        } catch (error) {
            if (axios.isAxiosError(error)) {
                setError(error.message)
                setIsLoading(false)
            } else {
                setError("An Unexpected error occured")
                setIsLoading(false)
            }
        }
    }

    useEffect(() => {
        fetchUserId()
    }, [])

    if (isLoading) {
        return (
            <div className="flex items-center justify-center w-full h-screen">

                <div>
                    <div className=' w-max ml-auto mr-auto'>
                        <span className="loading loading-ring loading-lg text-white text-center"></span>
                    </div>

                    <div className="flex w-52 flex-col gap-4 mt-10">
                        <div className="skeleton h-32 w-full"></div>
                        <div className="skeleton h-4 w-28"></div>
                        <div className="skeleton h-4 w-full"></div>
                        <div className="skeleton h-4 w-full"></div>
                    </div>
                </div>

            </div>
        )
    } else if (error) {
        return <div className=' text-white'>Failed to load user data: {error}</div>
    } else if (!user) {
        return <div className=' text-white'>No Data (User)</div>
    } else {
        return (
            <div>
                <img src={`${user.images[0].url}`} alt="" />
                <p className=' text-white'>Name: {user.display_name}</p>
                <p className=' text-white'>Email: {user.email}</p>
                <p className=' text-white'> 😜: {JSON.stringify(user)}</p>
            </div>
        )
    }
}

export default userInfo