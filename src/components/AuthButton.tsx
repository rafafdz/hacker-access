'use client'

import { useEffect, useState } from 'react'
import { createBrowserClient } from '@/utils/supabase'

const supabase = createBrowserClient()

export default function AuthButton() {
  const [user, setUser] = useState(null)

  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      setUser(user)
    }

    getUser()
  }, [])

  const signInWithGoogle = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
    })

    if (error) {
      console.error('Error logging in with Google:', error.message)
    }
  }

  const signOut = async () => {
    const { error } = await supabase.auth.signOut()
    if (error) {
      console.error('Error logging out:', error.message)
    } else {
      setUser(null)
    }
  }

  return user ? (
    <div className="flex items-center gap-4">
      Hey, {user.email}!
      <button
        onClick={signOut}
        className="bg-btn-background hover:bg-btn-background-hover rounded-md px-4 py-2 no-underline"
      >
        Logout
      </button>
    </div>
  ) : (
    <div className="flex items-center gap-4">
      <button
        onClick={signInWithGoogle}
        className="bg-btn-background hover:bg-btn-background-hover rounded-md px-4 py-2 no-underline"
      >
        Iniciar Sesión
      </button>
    </div>
  )
}
