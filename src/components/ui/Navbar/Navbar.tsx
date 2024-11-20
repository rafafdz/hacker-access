'use client'
import { useState, useEffect } from 'react'
import { ChevronDown } from 'lucide-react'
import NavbarDropdown from './NavbarDropdown'
import SignoutButton from '../SignoutButton'
import SignoutDropdown from '../SignoutDropdown'
import { createBrowserClient } from '@/utils/supabase'
import { Entry } from '../interfaces'

export default function Navbar() {
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [signoutDropdownOpen, setSignoutDropdownOpen] = useState(false)
  const [selectedOption, setSelectedOption] = useState<Entry | null>(null)
  const [entries, setEntries] = useState<Entry[]>([])
  const supabase = createBrowserClient()
  const dummyUserName = 'Robert Oppenheimer' // TODO: cambiar a user data

  const handleOptionClick = (option: Entry) => {
    setSelectedOption(option)
    setDropdownOpen(false)
    localStorage.setItem('entrie', option.id.toString())
  }

  async function fetchData() {
    const { data, error } = await supabase.from('entries').select('*')
    if (error) {
      console.error('Error fetching entries:', error)
    } else {
      console.log('Fetched entries:', data)
      setEntries(data as Entry[])

      const storedExternalId = localStorage.getItem('entrie')

      if (storedExternalId) {
        console.log('Existe localstorage')
        console.log(storedExternalId)
        const matchedEntry = (data as Entry[]).find(
          (entry) => entry.id.toString() === storedExternalId,
        )
        if (matchedEntry) {
          setSelectedOption(matchedEntry)
        }
      } else if (data?.length) {
        const defaultEntry = data[0] as Entry
        setSelectedOption(defaultEntry)
        localStorage.setItem('entrie', defaultEntry.id.toString())
      }
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <nav className="bg-background">
      <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="relative mr-14">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex w-48 items-center justify-between rounded-md border-black px-3 py-2 text-sm font-medium text-[#bdbecb] text-foreground outline-none hover:text-primary"
            >
              {selectedOption?.name ?? 'Seleccionar Entrada'}
              <ChevronDown className="ml-2 h-4 w-4" />
            </button>
            <NavbarDropdown
              options={entries}
              onOptionClick={handleOptionClick}
              isOpen={dropdownOpen}
              selectedOption={selectedOption}
            />
          </div>

          <div className="relative flex items-center space-x-4">
            <SignoutButton
              onClick={() => setSignoutDropdownOpen(!signoutDropdownOpen)}
            />
            {signoutDropdownOpen && (
              <SignoutDropdown
                userName={dummyUserName}
                onClose={() => setSignoutDropdownOpen(false)}
              />
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}
