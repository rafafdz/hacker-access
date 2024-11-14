import Button from '@/components/ui/Button'
import LogsBox from '@/components/ui/LogsBox'
import LeftArrow from '@/components/ui/LeftArrow'

export default function MemberShow() {
  return (
    <div className="flex min-h-[500px] flex-col items-center justify-center space-y-4">
      <LeftArrow />
      <div className="flex flex-col items-center justify-center space-y-2">
        <h1 className="text-3xl">John Doe</h1>
        <h2 className="text-xl">hacker</h2>
        <p>19.123.456-7</p>
        <p>Equipo 7</p>
      </div>
      <div>
        <LogsBox />
      </div>
      <Button label="Registrar Entrada" />
    </div>
  )
}
