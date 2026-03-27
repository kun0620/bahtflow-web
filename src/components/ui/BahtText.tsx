// src/components/ui/BahtText.tsx
export default function BahtText({
  amount,
  className = '',
}: { amount: number; className?: string }) {
  return (
    <span className={`tabular-nums ${className}`}>
      ฿ {amount.toLocaleString('th-TH')}
    </span>
  )
}