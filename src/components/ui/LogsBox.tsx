'use client'
import { AccessLog } from './interfaces'

const formatDate = (dateString: string): string => {
  const date = new Date(dateString)
  const day = date.getDate().toString().padStart(2, '0')
  const month = (date.getMonth() + 1).toString().padStart(2, '0')
  const hours = date.getHours().toString().padStart(2, '0')
  const minutes = date.getMinutes().toString().padStart(2, '0')
  return `${day}/${month}/${hours}:${minutes}`
}

export default function LogsBox({ logs }: { logs: AccessLog[] }) {
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
