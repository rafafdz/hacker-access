'use client'
import { useState } from 'react'
import { createBrowserClient } from '@/utils/supabase'
import { useRouter } from 'next/navigation'

/*
const setCookie = (name: string, value: string, days: number) => {
  const date = new Date();
  date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000); // Expiration in days
  const expires = `expires=${date.toUTCString()}`;
  document.cookie = `${name}=${encodeURIComponent(value)}; ${expires}; path=/; Secure; SameSite=Strict`;
};
*/

export default function LoginPage() {
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const supabase = createBrowserClient()
  const router = useRouter()

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault() // Prevents default form submission

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
      })

      if (error) {
        console.error('Error fetching data:', error.message)
      } else if (data?.session) {
        const accessToken = data.session.access_token
        console.log(accessToken)

        // Store JWT in a cookie with a 7-day expiration
        //setCookie('supabase-auth-token', accessToken, 7);

        // Redirect to /home after successful login
        router.push('/members/search')
      }
    } catch (error) {
      console.error('Error:', error)
    }
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center space-y-6">
      <div className="text-center">
        <h1 className="text-3xl">Platanus</h1>
        <h1 className="text-3xl">Hack</h1>
      </div>
      <form className="flex flex-col" onSubmit={handleLogin}>
        <label htmlFor="email" className="mb-2 text-gray-300">
          Email
        </label>
        <input
          className="m-[5px] h-[40px] w-full rounded-md bg-gray-700 px-3 text-white focus:outline-none focus:ring-2 focus:ring-gray-500"
          type="text"
          id="email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <label htmlFor="password" className="mb-2 text-gray-300">
          Contraseña
        </label>
        <input
          className="m-[5px] h-[40px] w-full rounded-md bg-gray-700 px-3 text-white focus:outline-none focus:ring-2 focus:ring-gray-500"
          type="password"
          id="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className="mt-2 text-center capitalize text-red-500"></div>
        <div className="mt-6 flex justify-center">
          <button type="submit">Iniciar Sesión</button>
        </div>
      </form>
    </div>
  )
}
