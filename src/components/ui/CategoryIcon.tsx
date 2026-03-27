import { Icon } from './Icon'
import type { Category } from '../../types'

interface CategoryIconProps {
  category?: Category
  size?: 'sm' | 'md' | 'lg'
}

const sizes = {
  sm: { wrap: 'w-9 h-9', icon: 18 },
  md: { wrap: 'w-11 h-11', icon: 22 },
  lg: { wrap: 'w-14 h-14', icon: 26 },
}

export function CategoryIcon({ category, size = 'md' }: CategoryIconProps) {
  const s = sizes[size]
  if (!category) {
    return (
      <div className={`${s.wrap} rounded-2xl bg-surface-container-high flex items-center justify-center`}>
        <Icon name="receipt_long" className="text-outline" size={s.icon} />
      </div>
    )
  }
  return (
    <div className={`${s.wrap} rounded-2xl ${category.color} flex items-center justify-center flex-shrink-0`}>
      <Icon name={category.icon} className={category.iconColor} size={s.icon} />
    </div>
  )
}
