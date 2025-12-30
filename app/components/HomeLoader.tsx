import { Loader2 } from "lucide-react"

export const HomeLoader = () => {
  return (
    <div className="bg-[#0a0e27] min-h-screen flex items-center justify-center">
      <div className="flex flex-col items-center space-y-4">
        <Loader2 className="w-12 h-12 text-[#d4a574] animate-spin" />
        
      </div>
    </div>
  )
}

