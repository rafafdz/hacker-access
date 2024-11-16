import { useState, ChangeEvent } from 'react'
import Dropdown from './Dropdown'

interface SearchBarProps {
  selectedButton: string
}

export default function SearchBar({ selectedButton }: SearchBarProps) {
  const [isDropdownVisible, setIsDropdownVisible] = useState<boolean>(false)
  const [inputValue, setInputValue] = useState<string>('')
  const dummyData = [
    { name: 'John Doe', accessed: 1 },
    { name: 'Robert Oppenheimer', accessed: 0 },
    { name: 'Robinson Crusoe', accessed: 1 },
    { name: 'Richard Feynman', accessed: 0 },
    { name: 'John Von Neumann', accessed: 1 },
    { name: 'Jane Doe', accessed: 0 },
    { name: 'Albert Einstein', accessed: 1 },
    { name: 'Isaac Newton', accessed: 0 },
    { name: 'Nikola Tesla', accessed: 1 },
    { name: 'Ada Lovelace', accessed: 1 },
    { name: 'Grace Hopper', accessed: 0 },
    { name: 'Katherine Johnson', accessed: 1 },
    { name: 'Alan Turing', accessed: 0 },
    { name: 'Leonardo da Vinci', accessed: 1 },
    { name: 'Galileo Galilei', accessed: 0 },
    { name: 'Carl Sagan', accessed: 1 },
    { name: 'Marie Curie', accessed: 1 },
    { name: 'Niels Bohr', accessed: 0 },
    { name: 'Erwin Schrödinger', accessed: 1 },
    { name: 'Enrico Fermi', accessed: 0 },
  ]

  const filteredData = dummyData
    .filter((option) =>
      option.name.toLowerCase().includes(inputValue.toLowerCase()),
    )
    .filter((option) => {
      if (selectedButton === 'registered') return true
      return selectedButton === 'accessed'
        ? option.accessed === 1
        : option.accessed === 0
    })

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setInputValue(event.target.value)
    setIsDropdownVisible(event.target.value.length > 0)
  }

  const handleOptionClick = (option: string): void => {
    setInputValue(option)
    console.log(option)
  }

  return (
    <div className="relative mx-auto flex w-full max-w-md flex-col items-center">
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        className="z-0 h-[45px] w-80 cursor-text rounded-[12px] border-[2px] border-[#2f303d] 
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
