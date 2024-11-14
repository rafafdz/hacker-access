import Button from '@/components/ui/Button'
import LogsBox from '@/components/ui/LogsBox'
import LeftArrow from '@/components/ui/LeftArrow'

export default function MemberShow() {
  return (
    <div className="flex min-h-[500px] flex-col items-center justify-center space-y-6">
      <LeftArrow />
      <div className="flex flex-col items-center justify-center space-y-2">
        <h1 className="text-3xl">John Doe</h1>
        <div className="rounded-xl border border-[#2f303d] bg-[#18181B] px-2 py-1">
          <h2 className="text-sm text-[#c3c3da]">hacker</h2>
        </div>
      </div>
      <div className="flex flex-col items-center">
        <p className="text-[#c3c3da]">19.123.456-7</p>
        <p className="text-[#c3c3da]">Equipo 7</p>
      </div>
      <div>
        <LogsBox />
      </div>
      <Button label="Registrar Entrada" />
    </div>
  )
}
