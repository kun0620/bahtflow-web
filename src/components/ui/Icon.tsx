// src/components/ui/Icon.tsx
interface IconProps {
  name: string
  size?: number
  className?: string
  filled?: boolean
}

export function Icon({ name, size = 24, className = '', filled = false }: IconProps) {
  return (
    <span
      className={`material-symbols-outlined ${filled ? 'filled' : ''} ${className}`}
      style={{
        fontSize: size,
        fontVariationSettings: filled ? "'FILL' 1, 'wght' 400" : "'FILL' 0, 'wght' 400"
      }}
      role="img"
      aria-label={name}
    >
      {name}
    </span>
  )
}
