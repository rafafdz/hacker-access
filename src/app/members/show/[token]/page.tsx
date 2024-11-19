'use client'
import Button from '@/components/ui/Button'
import Modal from '@/components/ui/Modal'
import LogsBox from '@/components/ui/LogsBox'
import LeftArrow from '@/components/ui/LeftArrow'
import { useParams } from 'next/navigation'
import { createBrowserClient } from '@/utils/supabase'
import { useState, useEffect } from 'react'
import { AccessLog } from '@/components/ui/interfaces'
import { getCurrentDateTime } from '@/utils/current-date'

interface Member {
  id: number
  full_name: string
  email: string
  token: string
  external_member_id: string
  member_type_name: string
  accesses: number
}

const transformToCamelCase = (data: any[]): AccessLog[] => {
  return data.map((log) => ({
    accessId: log.access_id,
    createdAt: log.created_at,
    entryId: log.entry_id,
    entryName: log.entry_name,
    userId: log.user_id,
  }))
}

export default function MemberShow() {
  const { token } = useParams()
  const supabase = createBrowserClient()
  const [member, setMember] = useState<Member | null>(null)
  const [logs, setLogs] = useState<AccessLog[]>([])
  const [showRegister, setShowRegister] = useState<boolean>(false)

  async function fetchData() {
    try {
      const { data: memberData, error: memberError } = await supabase.rpc(
        'get_member_by_token',
        { token: token },
      )
      if (memberError) throw memberError
      setMember(memberData as Member)

      const { data: logsData, error: logsError } = await supabase.rpc(
        'get_accesses_by_member_id',
        { member_id: memberData.id },
      )
      if (logsError) throw logsError
      const transformedData = transformToCamelCase(logsData)
      setLogs(transformedData)
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }

  const handleRegister = () => {
    setShowRegister(true)
  }

  const confirmRegister = async () => {
    setShowRegister(false)
    const entryId = localStorage.getItem('entrie')
    const currentDate = getCurrentDateTime()

    console.log('Miembro:', member?.full_name)
    console.log('Entry ID:', entryId)
    console.log('Hora actual:', currentDate)
    console.log('Access Logs:', logs)
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
            <LogsBox logs={logs} />
          </div>
          <Button label="Registrar Entrada" onClick={handleRegister} />
        </>
      ) : (
        <p>Cargando...</p>
      )}
      <Modal
        isOpen={showRegister}
        title="Confirmar Registro"
        description="¿Estás seguro de registrar este acceso?"
        onClose={() => setShowRegister(false)}
        onConfirm={confirmRegister}
      />
    </div>
  )
}
