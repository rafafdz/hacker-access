interface ButtonInterface {
  label: string
  onClick?: () => void // onClick es opcional
}

export default function Button({ label, onClick }: ButtonInterface) {
  return (
    <button
      onClick={onClick}
      className="rounded-[10px] bg-[#FFEC40] p-2 text-[14px] text-black hover:bg-[#F9BC12]"
    >
      {label}
    </button>
  )
}
