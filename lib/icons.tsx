// Optimized icon components to reduce bundle size
// Only import the icons we actually use

// Lucide React icons - tree-shakeable
export { 
  Search, 
  Menu, 
  X, 
  SquareChevronLeft,
  ChevronDown,
  Calendar,
  Trophy,
  ChevronLeft,
  ChevronRight,
  ArrowLeft,
  Facebook,
  Twitter,
  Instagram,
  Youtube
} from 'lucide-react'

// React Icons - only import specific icons
export { 
  FaSnapchat, 
  FaTiktok,
  FaYoutube,
  FaFacebook,
  FaXTwitter,
  FaInstagram
} from 'react-icons/fa6'

export { FaFacebook as FaFacebookAlt } from 'react-icons/fa'

// Re-export commonly used icons with shorter names
export { Search as SearchIcon } from 'lucide-react'
export { Menu as MenuIcon } from 'lucide-react'
export { X as CloseIcon } from 'lucide-react'
