// src/components/modals/SuccessModal.tsx
import { Icon } from '../ui/Icon'

interface SuccessModalProps {
  isOpen: boolean
  title: string
  description: string
  buttonText?: string
  onButtonClick: () => void
}

export function SuccessModal({
  isOpen,
  title,
  description,
  buttonText = 'Continue',
  onButtonClick,
}: SuccessModalProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-surface-lowest rounded-2xl shadow-2xl max-w-sm w-full space-y-6 p-8 text-center">

        {/* Green Checkmark */}
        <div className="flex justify-center">
          <div className="w-16 h-16 rounded-full bg-secondary-container flex items-center justify-center animate-pulse">
            <Icon name="check_circle" size={36} className="text-secondary" />
          </div>
        </div>

        {/* Content */}
        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-on-surface font-headline">
            {title}
          </h2>
          <p className="text-sm text-on-surface-variant">
            {description}
          </p>
        </div>

        {/* Button */}
        <button
          onClick={onButtonClick}
          className="w-full px-6 py-3 bg-secondary text-on-secondary rounded-full font-bold font-headline hover:bg-secondary opacity-90 hover:opacity-100 transition-opacity flex items-center justify-center gap-2"
        >
          {buttonText}
          <Icon name="arrow_forward" size={18} className="text-on-secondary" />
        </button>

      </div>
    </div>
  )
}
