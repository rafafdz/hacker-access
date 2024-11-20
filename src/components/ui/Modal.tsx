interface ModalProps {
  title?: string
  description?: string
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
}

export default function Modal({
  title = 'Confirmación',
  description = '¿Estás seguro de realizar esta acción?',
  isOpen,
  onClose,
  onConfirm,
}: ModalProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="flex w-[90%] max-w-md flex-col items-center rounded-lg bg-[#18181B] p-6 shadow-lg">
        <h2 className="mb-4 text-lg font-bold text-white">{title}</h2>
        <p className="mb-6 text-sm text-[#c3c3da]">{description}</p>
        <div className="flex justify-center space-x-4">
          <button
            className="rounded-md border border-transparent bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700"
            onClick={onClose}
          >
            Cancelar
          </button>
          <button
            className="rounded-md border border-transparent bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-700"
            onClick={onConfirm}
          >
            Confirmar
          </button>
        </div>
      </div>
    </div>
  )
}
