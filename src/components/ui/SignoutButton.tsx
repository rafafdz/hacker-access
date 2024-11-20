import { GoSignOut } from 'react-icons/go'

interface SignoutButtonProps {
  onClick: () => void
}

export default function SignoutButton({ onClick }: SignoutButtonProps) {
  return (
    <button onClick={onClick} className="px-3 py-2">
      <GoSignOut className="h-6 w-6 hover:text-slate-200" />
    </button>
  )
}
