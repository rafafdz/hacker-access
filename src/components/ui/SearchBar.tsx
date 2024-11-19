import { useState, useEffect, ChangeEvent } from 'react'
import Dropdown from './Dropdown'
import { createBrowserClient } from '@/utils/supabase'
import { useRouter } from 'next/navigation'
import { Member } from './interfaces'

interface SearchBarProps {
  selectedButton: string
}

export default function SearchBar({ selectedButton }: SearchBarProps) {
  const [isDropdownVisible, setIsDropdownVisible] = useState<boolean>(false)
  const [inputValue, setInputValue] = useState<string>('')
  const [members, setMembers] = useState<Member[]>([])
  const supabase = createBrowserClient()
  const router = useRouter()

  const filteredData = members
    .filter((option) =>
      option.full_name.toLowerCase().includes(inputValue.toLowerCase()),
    )
    .filter((option) => {
      if (selectedButton === 'registered') return true
      return selectedButton === 'accessed' ? option.accessed : !option.accessed
    })

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setInputValue(event.target.value)
    setIsDropdownVisible(event.target.value.length > 0)
  }

  const handleOptionClick = (token: string): void => {
    console.log(token)
    localStorage.setItem('lastSearch', inputValue)
    router.push(`/members/show/${token}`)
  }

  async function fetchData() {
    const { data, error } = await supabase.rpc('get_members')
    if (error) {
      console.log(error)
    } else {
      setMembers(data as Member[])
    }
  }

  useEffect(() => {
    fetchData()
    const lastSearch = localStorage.getItem('lastSearch')
    if (lastSearch) {
      setInputValue(lastSearch)
      setIsDropdownVisible(lastSearch.length > 0)
      localStorage.removeItem('lastSearch')
    }
  }, [])

  return (
    <div className="relative mx-auto flex w-full max-w-md flex-col items-center">
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        className="z-0 h-[45px] w-72 cursor-text rounded-[12px] border-[2px] border-[#2f303d] 
           bg-[#18181B] pl-[0.5rem] text-[#bdbecb] placeholder-[#bdbecb] outline-none transition-all 
           hover:shadow-[0_0_0_1.5px_#2f303d] focus:shadow-[0_0_0_1.5px_#2f303d] focus:ring-0"
        placeholder="Buscar..."
      />

      {isDropdownVisible && (
        <Dropdown
          filteredData={filteredData}
          handleOptionClick={handleOptionClick}
        />
      )}
    </div>
  )
}
