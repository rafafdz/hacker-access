import { GoSignOut } from 'react-icons/go'

export default function SignoutButton() {
  const handleClick = () => {
    console.log('Sign out')
  }
  return (
    <button onClick={handleClick} className="px-3 py-2">
      <GoSignOut className="h-6 w-6 hover:text-slate-200" />
    </button>
  )
}
