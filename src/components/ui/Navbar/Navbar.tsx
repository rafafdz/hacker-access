import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import NavbarDropdown from './NavbarDropdown'
import SignoutButton from '../SignoutButton'

export default function Navbar() {
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [selectedOption, setSelectedOption] = useState('Puerta Principal')
  const filteredData = [
    { name: 'Puerta Principal', id: 1 },
    { name: 'Entrada Principal', id: 2 },
    { name: 'Puerto Trasera', id: 3 },
    { name: 'Subterraneo', id: 4 },
  ]

  const handleOptionClick = (optionName: string) => {
    setSelectedOption(optionName)
    setDropdownOpen(false)
  }

  return (
    <nav className="bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="relative">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex w-48 items-center justify-between rounded-md border-black px-3 py-2 text-sm font-medium text-[#bdbecb] text-foreground outline-none hover:text-primary"
            >
              {selectedOption}
              <ChevronDown className="ml-2 h-4 w-4" />
            </button>
            <NavbarDropdown
              options={filteredData}
              onOptionClick={handleOptionClick}
              isOpen={dropdownOpen}
              selectedOption={selectedOption}
            />
          </div>

          <div className="ml-auto flex items-center space-x-4">
            <SignoutButton />
          </div>
        </div>
      </div>
    </nav>
  )
}
