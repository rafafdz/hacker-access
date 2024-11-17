import React from 'react'
import { Member } from './interfaces'

interface DropdownProps {
  filteredData: Member[]
  handleOptionClick: (optionName: string) => void
}

const Dropdown: React.FC<DropdownProps> = ({
  filteredData,
  handleOptionClick,
}) => {
  return (
    <ul className="absolute top-[50px] max-h-96 w-80 overflow-y-auto rounded-[8px] bg-zinc-700 shadow-lg">
      {filteredData.map((option) => (
        <li
          key={option.token}
          onClick={() => handleOptionClick(option.token)}
          className="cursor-pointer px-4 py-4 text-[#bdbecb] hover:bg-[#2f303d]"
        >
          {option.accessed ? '✅' : '❌'} {option.full_name}
          <p className="text-[12px]">{option.member_type_name}</p>
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
