interface ButtonInterface {
  label: string
  onClick?: () => void
  disabled: boolean
}

export default function Button({ label, onClick, disabled }: ButtonInterface) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`rounded-[10px] p-2 px-8 text-[14px] text-black ${
        disabled ? 'bg-gray-400' : 'bg-[#FFEC40] hover:bg-[#F9BC12]'
      }`}
    >
      {label}
    </button>
  )
}
