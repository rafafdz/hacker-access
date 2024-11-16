import { useState, ChangeEvent } from 'react'
import Dropdown from './Dropdown'

interface SearchBarProps {
  selectedButton: string
}

export default function SearchBar({ selectedButton }: SearchBarProps) {
  const [isDropdownVisible, setIsDropdownVisible] = useState<boolean>(false)
  const [inputValue, setInputValue] = useState<string>('')
  const dummyData = [
    { name: 'John Doe', value: 1 },
    { name: 'Robert Oppenheimer', value: 0 },
    { name: 'Robinson Crusoe', value: 1 },
    { name: 'Richard Feynman', value: 0 },
    { name: 'John Von Neumann', value: 1 },
    { name: 'Jane Doe', value: 0 },
    { name: 'Albert Einstein', value: 1 },
    { name: 'Isaac Newton', value: 0 },
    { name: 'Nikola Tesla', value: 1 },
    { name: 'Ada Lovelace', value: 1 },
    { name: 'Grace Hopper', value: 0 },
    { name: 'Katherine Johnson', value: 1 },
    { name: 'Alan Turing', value: 0 },
    { name: 'Leonardo da Vinci', value: 1 },
    { name: 'Galileo Galilei', value: 0 },
    { name: 'Carl Sagan', value: 1 },
    { name: 'Marie Curie', value: 1 },
    { name: 'Niels Bohr', value: 0 },
    { name: 'Erwin Schrödinger', value: 1 },
    { name: 'Enrico Fermi', value: 0 },
  ]

  const filteredData = dummyData
    .filter((option) =>
      option.name.toLowerCase().includes(inputValue.toLowerCase()),
    )
    .filter((option) => {
      if (selectedButton === 'registrados') return true
      return selectedButton === 'accedidos'
        ? option.value === 1
        : option.value === 0
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
        className="input-base input-border"
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
