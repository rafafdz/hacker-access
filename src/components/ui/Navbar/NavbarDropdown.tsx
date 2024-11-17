import { Entry } from '../interfaces'

interface NavbarDropdownProps {
  options: Entry[]
  onOptionClick: (option: Entry) => void
  isOpen: boolean
  selectedOption: Entry | null
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
            onClick={() => onOptionClick(option)}
            className={`cursor-pointer px-4 py-2 text-sm transition-colors duration-150 ease-in-out hover:bg-muted ${
              selectedOption?.id === option.id
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
