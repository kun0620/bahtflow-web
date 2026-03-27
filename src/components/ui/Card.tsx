// src/components/ui/Card.tsx
export default function Card({ children, className = '' }: any) {
  return (
    <div className={`bg-surface-lowest rounded-xl p-6 ${className}`}>
      {children}
    </div>
  )
}