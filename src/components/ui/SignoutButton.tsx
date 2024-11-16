import SignoutIcon from './SignoutIcon'

export default function SignoutButton() {
  const handleClick = () => {
    console.log('Sign out')
  }
  return (
    <button onClick={handleClick} className="px-3 py-2">
      <SignoutIcon />
    </button>
  )
}
