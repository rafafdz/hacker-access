import { useState, ChangeEvent, MouseEvent } from 'react'
import Dropdown from './Dropdown'

export default function SearchBar() {
  const [isDropdownVisible, setIsDropdownVisible] = useState<boolean>(false)
  const [inputValue, setInputValue] = useState<string>('')
  const dummyData: string[] = [
    'John Doe',
    'Robert Oppenheimer',
    'Robinson Crusoe',
    'Richard Feynmann',
    'John Von Neumann',
    'John Doe',
    'John Doe',
    'John Doe',
    'John Doe',
    'John Doe',
    'John Doe',
    'John Doe',
    'John Doe',
    'John Doe',
    'John Doe',
    'John Doe',
    'John Doe',
    'John Doe',
    'John Doe',
    'John Doe',
    'John Doe',
  ]

  const filteredData: string[] = dummyData.filter((option) =>
    option.toLowerCase().includes(inputValue.toLowerCase()),
  )

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setInputValue(event.target.value)
    setIsDropdownVisible(event.target.value.length > 0)
  }

  const handleOptionClick = (option: string): void => {
    /*
      Acá podría agregarse el envío del id del usuario a la vista members-show para obtener toda la info.
      También quizás agregar la parte del código donde se guarda la búsqueda en local storage
    */
    setInputValue(option)
    //setIsDropdownVisible(false)
    console.log(option)
  }

  return (
    <div className="relative mx-auto flex w-full max-w-md flex-col items-center">
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        className="duration-[0.25s] ease-[cubic-bezier(0.19,_1,_0.22,_1)] z-0 h-[45px] w-80 cursor-text rounded-[12px] border-[2px] border-[#2f303d] 
                           bg-[#18181B] pl-[0.5rem] text-[#bdbecb] placeholder-[#bdbecb] outline-none transition-all hover:shadow-[0_0_0_1.5px_#2f303d] 
                           focus:shadow-[0_0_0_1.5px_#2f303d] focus:ring-0"
        placeholder="Buscar..."
      />

      {isDropdownVisible && (
        <Dropdown
          filteredData={filteredData}
          handleOptionClick={handleOptionClick}
        />
      )}
    </div>
  )
}
