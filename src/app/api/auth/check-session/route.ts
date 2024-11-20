import { createServerClient } from '@/utils/supabase'
import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

export async function GET() {
  const supabase = createServerClient(cookies())

  const {
    data: { user },
  } = await supabase.auth.getUser()

  return NextResponse.json({ user })
}
