import React from 'react'

interface SearchFilterButtonProps {
  count: number
  label: string
  isSelected: boolean
  onClick: () => void
}

const SearchFilterButton: React.FC<SearchFilterButtonProps> = ({
  count,
  label,
  isSelected,
  onClick,
}) => {
  return (
    <button
      onClick={onClick}
      className={`m-1 h-[70px] w-[70px] rounded-xl border-2 bg-transparent ${
        isSelected ? 'border-[#00B700]' : 'border-[#FFEC40]'
      }`}
    >
      <h1>{count}</h1>
      <p className="text-[8px]">{label}</p>
    </button>
  )
}

export default SearchFilterButton
