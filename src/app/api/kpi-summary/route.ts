import { NextResponse } from 'next/server'
import { createServerClient } from '@/utils/supabase'
import { cookies } from 'next/headers'

export async function GET() {
  const supabase = createServerClient(cookies())

  const { data, error } = await supabase.rpc('get_kpi_summary')
  if (error) {
    console.error('Error fetching KPI summary:', error)
    return NextResponse.json(
      { error: 'Failed to fetch KPI summary' },
      { status: 500 },
    )
  }

  return NextResponse.json(data)
}
