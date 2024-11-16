'use client'
import { useState, useEffect } from 'react'
import SearchFilterButton from '@/components/ui/SearchFilterButton'
import SearchBar from '@/components/ui/SearchBar'
import { createBrowserClient } from '@/utils/supabase'

export default function MemberSearch() {
  const [selectedButton, setSelectedButton] = useState<string>('registrados')
  const supabase = createBrowserClient()
  const [registrados, setRegistrados] = useState<number>(0)
  const [accedidos, setAccedidos] = useState<number>(0)
  const [porAcceder, setPorAcceder] = useState<number>(0)

  async function fetchData() {
    const { data, error } = await supabase.rpc('get_kpi_summary')
    if (error) {
      console.error(error)
    } else {
      console.log(data)
      if (data) {
        setRegistrados(data.registrados || 0)
        setAccedidos(data.accedidos || 0)
        setPorAcceder(data.por_acceder || 0)
      }
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  const handleButtonClick = (label: string) => {
    setSelectedButton(label)
  }

  return (
    <div className="mx-auto flex max-w-3xl flex-col items-center justify-center space-y-4">
      <div className="flex flex-col items-center space-y-4">
        <div className="flex justify-center space-x-4">
          <SearchFilterButton
            label="registrados"
            count={registrados}
            isSelected={selectedButton === 'registrados'}
            onClick={() => handleButtonClick('registrados')}
          />
          <SearchFilterButton
            label="accedidos"
            count={accedidos}
            isSelected={selectedButton === 'accedidos'}
            onClick={() => handleButtonClick('accedidos')}
          />
          <SearchFilterButton
            label="por acceder"
            count={porAcceder}
            isSelected={selectedButton === 'por acceder'}
            onClick={() => handleButtonClick('por acceder')}
          />
        </div>

        <div className="flex w-full justify-center">
          <SearchBar selectedButton={selectedButton} />
        </div>
      </div>
    </div>
  )
}
