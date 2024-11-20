'use client'
import { useState, useEffect } from 'react'
import SearchFilterButton from '@/components/ui/SearchFilterButton'
import SearchBar from '@/components/ui/SearchBar'
import Navbar from '@/components/ui/Navbar/Navbar'

export default function MemberSearch() {
  const [selectedButton, setSelectedButton] = useState<string>('registered')
  const [registered, setRegistered] = useState<number>(0)
  const [accessed, setAccesed] = useState<number>(0)
  const [pendingAccess, setPendingAccess] = useState<number>(0)

  async function fetchData() {
    try {
      const response = await fetch('/api/kpi-summary')
      if (!response.ok) {
        throw new Error('Error fetching data')
      }
      const data = await response.json()
      setRegistered(data.registered || 0)
      setAccesed(data.accessed || 0)
      setPendingAccess(data.pending_access || 0)
    } catch (error) {
      console.error('Error fetching data:', error)
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
        <div className="flex w-full justify-center space-x-8">
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
