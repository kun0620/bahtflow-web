// src/components/ui/Pill.tsx
export default function Pill({ children }: any) {
  return (
    <span className="px-3 py-1 rounded-full text-xs font-bold bg-secondary-container text-on-secondary-container flex items-center gap-1">
      {children}
    </span>
  )
}