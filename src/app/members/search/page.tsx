'use client'
import { useState } from 'react'
import SearchFilterButton from '@/components/ui/SearchFilterButton'
import SearchBar from '@/components/ui/SearchBar'

export default function MemberSearch() {
  const [selectedButton, setSelectedButton] = useState<string>('registrados')

  const handleButtonClick = (label: string) => {
    setSelectedButton(label)
  }

  return (
    <div className="mx-auto flex max-w-3xl flex-col items-center justify-center space-y-4">
      <h1>Navbar</h1>
      <div className="flex flex-col items-center space-y-4">
        <div className="flex justify-center space-x-4">
          <SearchFilterButton
            label="registrados"
            count={230}
            isSelected={selectedButton === 'registrados'}
            onClick={() => handleButtonClick('registrados')}
          />
          <SearchFilterButton
            label="accedidos"
            count={115}
            isSelected={selectedButton === 'accedidos'}
            onClick={() => handleButtonClick('accedidos')}
          />
          <SearchFilterButton
            label="por acceder"
            count={115}
            isSelected={selectedButton === 'por acceder'}
            onClick={() => handleButtonClick('por acceder')}
          />
        </div>

        <div className="flex w-full justify-center">
          <SearchBar />
        </div>
      </div>
    </div>
  )
}
