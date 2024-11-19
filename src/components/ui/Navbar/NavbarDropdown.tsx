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
  return (
    <div
      className={`w-54 absolute left-1 top-full z-50 mt-1 transform rounded-md border border-border bg-background shadow-lg transition-all duration-200 ${
        isOpen
          ? 'translate-y-0 scale-100 opacity-100'
          : 'pointer-events-none -translate-y-2 scale-95 opacity-0'
      }`}
    >
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
