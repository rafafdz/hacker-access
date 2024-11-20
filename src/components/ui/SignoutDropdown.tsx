interface SignoutDropdownProps {
  userName: string
  onClose: () => void
}

export default function SignoutDropdown({
  userName,
  onClose,
}: SignoutDropdownProps) {
  return (
    <div className="absolute right-1 top-full mt-2 w-48 rounded-md border bg-background shadow-lg">
      <ul className="py-2">
        <li className="px-4 py-2 text-sm text-foreground">{userName}</li>
        <li
          className="cursor-pointer px-4 py-2 text-sm text-foreground hover:bg-muted"
          onClick={onClose}
        >
          Salir
        </li>
      </ul>
    </div>
  )
}
