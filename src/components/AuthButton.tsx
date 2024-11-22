'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { createBrowserClient } from '@/utils/supabase'
import { User } from '@supabase/supabase-js' // Import the User type
import { defaultUrl } from '@/utils/config'

const supabase = createBrowserClient()

export default function AuthButton() {
  const [user, setUser] = useState<User | null>(null) // Define the state type
  const [loading, setLoading] = useState<boolean>(true)
  const router = useRouter()

  useEffect(() => {
    const getUser = async () => {
      // Call the endpoint to check the session
      try {
        const response = await fetch('/api/auth/check-session')
        const data = await response.json()

        // If the session is active, set the user
        if (data.user) {
          setUser(data.user)
        } else {
          setUser(null)
        }
      } catch (error) {
        console.log(error)
      } finally {
        setLoading(false)
      }
    }

    getUser()
  }, [])

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_, session) => {
      if (session?.user) {
        setUser(session.user)
      } else {
        setUser(null)
      }
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [])

  useEffect(() => {
    if (user) {
      router.push('/members/search')
    }
  }, [user, router])

  const signInWithGoogle = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${defaultUrl}/login`,
      },
    })

    if (error) {
      console.error('Error logging in with Google:', error.message)
    }
  }

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <div className="flex items-center gap-4">
      <button
        onClick={signInWithGoogle}
        className="rounded-[10px] bg-[#FFEC40] p-2 px-8 text-[14px] text-black hover:bg-[#F9BC12]"
      >
        Iniciar Sesión
      </button>
    </div>
  )
}
