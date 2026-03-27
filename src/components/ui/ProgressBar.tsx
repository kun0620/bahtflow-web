// src/components/ui/ProgressBar.tsx
export default function ProgressBar({ value, color }: any) {
  return (
    <div className="w-full bg-outline-variant/20 h-1 rounded-full mt-3 overflow-hidden">
      <div className={`${color} h-full`} style={{ width: `${value}%` }} />
    </div>
  )
}