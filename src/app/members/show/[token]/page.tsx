'use client'
import Button from '@/components/ui/Button'
import LogsBox from '@/components/ui/LogsBox'
import LeftArrow from '@/components/ui/LeftArrow'
import { useParams } from 'next/navigation'
import { createBrowserClient } from '@/utils/supabase'
import { useState, useEffect } from 'react'

// Test with url http://localhost:3000/members/show/token123

interface Member {
  id: number
  full_name: string
  email: string
  token: string
  external_member_id: string
  member_type_name: string
  accesses: number
}

export default function MemberShow() {
  const { token } = useParams()
  const supabase = createBrowserClient()
  const [member, setMember] = useState<Member | null>(null)

  async function fetchData() {
    const { data, error } = await supabase.rpc('get_member_by_token', {
      token: token,
    })
    if (error) {
      console.error(error)
    } else {
      setMember(data as Member)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <div className="flex min-h-[500px] flex-col items-center justify-center space-y-6">
      {member ? (
        <>
          <LeftArrow />
          <div className="flex flex-col items-center justify-center space-y-2">
            <h1 className="text-3xl">{member.full_name}</h1>
            <div className="rounded-xl border border-[#2f303d] bg-[#18181B] px-2 py-1">
              <h2 className="text-sm text-[#c3c3da]">
                {member.member_type_name}
              </h2>
            </div>
          </div>
          <div className="flex flex-col items-center">
            <p className="text-[#c3c3da]">
              {member.external_member_id || 'No ID provided'}
            </p>
            <p className="text-[#c3c3da]">Accesos: {member.accesses}</p>
          </div>
          <div>
            <LogsBox id={member.id} />
          </div>
          <Button label="Registrar Entrada" />
        </>
      ) : (
        <p>Cargando...</p>
      )}
    </div>
  )
}
