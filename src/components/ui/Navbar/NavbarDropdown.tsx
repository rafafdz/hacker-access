import { ChevronDown } from 'lucide-react'

interface NavbarDropdownProps {
  options: { name: string; id: number }[]
  onOptionClick: (optionName: string) => void
  isOpen: boolean
  selectedOption: string
}

export default function NavbarDropdown({
  options,
  onOptionClick,
  isOpen,
  selectedOption,
}: NavbarDropdownProps) {
  if (!isOpen) return null

  return (
    <div className="w-54 absolute left-0 top-full z-50 mt-1 rounded-md border border-border bg-background shadow-lg">
      <ul className="py-1">
        {options.map((option) => (
          <li
            key={option.id}
            onClick={() => onOptionClick(option.name)}
            className={`cursor-pointer px-4 py-2 text-sm transition-colors duration-150 ease-in-out hover:bg-muted ${
              selectedOption === option.name
                ? 'bg-muted text-primary'
                : 'text-foreground'
            }`}
          >
            {option.name}
          </li>
        ))}
      </ul>
    </div>
  )
}
