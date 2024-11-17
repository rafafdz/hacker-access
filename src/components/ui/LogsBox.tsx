'use client'
import { useState, useEffect } from 'react'
import { createBrowserClient } from '@/utils/supabase'
import { AccessLog, LogsBoxProps } from './interfaces'

const formatDate = (dateString: string): string => {
  const date = new Date(dateString)
  const day = date.getDate().toString().padStart(2, '0')
  const month = (date.getMonth() + 1).toString().padStart(2, '0')
  const hours = date.getHours().toString().padStart(2, '0')
  const minutes = date.getMinutes().toString().padStart(2, '0')
  return `${day}/${month}/${hours}:${minutes}`
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

export default function LogsBox({ id }: LogsBoxProps) {
  const supabase = createBrowserClient()
  const [logs, setLogs] = useState<AccessLog[]>([])

  async function fetchData() {
    const { data, error } = await supabase.rpc('get_accesses_by_member_id', {
      member_id: id,
    })
    if (error) {
      console.error(error)
    } else {
      const transformedData = transformToCamelCase(data)
      setLogs(transformedData)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <div className="flex h-40 max-h-40 w-72 flex-col items-center overflow-y-auto rounded-lg border border-zinc-700 bg-zinc-900 p-4 shadow-inner">
      {logs.length > 0 ? (
        logs.map((log) => (
          <p key={log.accessId} className="mb-2 text-xs text-slate-400">
            {formatDate(log.createdAt)} @ {log.entryName}
          </p>
        ))
      ) : (
        <p className="text-xs text-[#a3a3b6]">No hay accesos registrados.</p>
      )}
    </div>
  )
}
