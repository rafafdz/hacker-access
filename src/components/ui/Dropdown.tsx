import React from 'react'

interface DropdownProps {
  filteredData: { name: string; accessed: number }[]
  handleOptionClick: (optionName: string) => void
}

const Dropdown: React.FC<DropdownProps> = ({
  filteredData,
  handleOptionClick,
}) => {
  return (
    <ul className="absolute top-[50px] max-h-96 w-80 overflow-y-auto rounded-[8px] bg-zinc-700 shadow-lg">
      {filteredData.map((option, index) => (
        <li
          key={index}
          onClick={() => handleOptionClick(option.name)}
          className="cursor-pointer px-4 py-4 text-[#bdbecb] hover:bg-[#2f303d]"
        >
          {option.accessed === 1 ? '✅' : '❌'} {option.name}
          <p className="text-[12px]">hacker</p>
        </li>
      ))}
      {filteredData.length === 0 && (
        <li className="px-4 py-2 text-[#bdbecb]">
          No se encontraron resultados
        </li>
      )}
    </ul>
  )
}

export default Dropdown
