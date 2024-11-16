'use client'
import { useState, useEffect } from 'react'
import SearchFilterButton from '@/components/ui/SearchFilterButton'
import SearchBar from '@/components/ui/SearchBar'
import { createBrowserClient } from '@/utils/supabase'
import Navbar from '@/components/ui/Navbar/Navbar'

export default function MemberSearch() {
  const [selectedButton, setSelectedButton] = useState<string>('registered')
  const supabase = createBrowserClient()
  const [registered, setRegistered] = useState<number>(0)
  const [accessed, setAccesed] = useState<number>(0)
  const [pendingAccess, setPendingAccess] = useState<number>(0)

  async function fetchData() {
    const { data, error } = await supabase.rpc('get_kpi_summary')
    if (error) {
      console.error(error)
    } else {
      console.log(data)
      if (data) {
        setRegistered(data.registrados || 0)
        setAccesed(data.accedidos || 0)
        setPendingAccess(data.por_acceder || 0) // Después cambiar los nombres de los atributos a la versión en inglés
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
      <Navbar />
      <div className="flex flex-col items-center space-y-4">
        <div className="flex justify-center space-x-4">
          <SearchFilterButton
            label="registrados"
            count={registered}
            isSelected={selectedButton === 'registered'}
            onClick={() => handleButtonClick('registered')}
          />
          <SearchFilterButton
            label="accedidos"
            count={accessed}
            isSelected={selectedButton === 'accessed'}
            onClick={() => handleButtonClick('accessed')}
          />
          <SearchFilterButton
            label="por acceder"
            count={pendingAccess}
            isSelected={selectedButton === 'pending_access'}
            onClick={() => handleButtonClick('pending_access')}
          />
        </div>

        <div className="flex w-full justify-center">
          <SearchBar selectedButton={selectedButton} />
        </div>
      </div>
    </div>
  )
}
