// Performance utilities to prevent forced reflows and improve performance

// Cache for DOM measurements to avoid repeated queries
const measurementCache = new Map<string, number>()

// Debounce utility for expensive operations
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null
  
  return (...args: Parameters<T>) => {
    if (timeout) clearTimeout(timeout)
    timeout = setTimeout(() => func(...args), wait)
  }
}

// Throttle utility for scroll and resize events
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean
  
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args)
      inThrottle = true
      setTimeout(() => inThrottle = false, limit)
    }
  }
}

// Safe DOM measurement with caching
export function getCachedMeasurement(
  element: HTMLElement | null,
  property: 'offsetWidth' | 'offsetHeight' | 'scrollWidth' | 'scrollHeight' | 'clientWidth' | 'clientHeight',
  cacheKey?: string
): number {
  if (!element) return 0
  
  const key = cacheKey || `${element.tagName}-${property}`
  
  if (measurementCache.has(key)) {
    return measurementCache.get(key)!
  }
  
  const value = element[property]
  measurementCache.set(key, value)
  
  // Clear cache after a short time to allow for dynamic changes
  setTimeout(() => measurementCache.delete(key), 100)
  
  return value
}

// Batch DOM updates to prevent multiple reflows
export function batchDOMUpdates(updates: (() => void)[]): void {
  requestAnimationFrame(() => {
    updates.forEach(update => update())
  })
}

// Safe scrollIntoView with RAF
export function safeScrollIntoView(
  element: HTMLElement | null,
  options?: ScrollIntoViewOptions
): void {
  if (!element) return
  
  requestAnimationFrame(() => {
    element.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
      ...options
    })
  })
}

// Safe window dimension queries
export function getWindowDimensions(): { width: number; height: number } {
  if (typeof window === 'undefined') {
    return { width: 1024, height: 768 } // SSR fallback
  }
  
  return {
    width: window.innerWidth,
    height: window.innerHeight
  }
}

// Optimized resize observer
export function createResizeObserver(
  callback: (entries: ResizeObserverEntry[]) => void
): ResizeObserver | null {
  if (typeof window === 'undefined' || !window.ResizeObserver) {
    return null
  }
  
  return new ResizeObserver(
    throttle((entries: ResizeObserverEntry[]) => {
      requestAnimationFrame(() => callback(entries))
    }, 16) // ~60fps
  )
}

// Clear measurement cache
export function clearMeasurementCache(): void {
  measurementCache.clear()
}

// Performance monitoring
export function measurePerformance<T>(
  name: string,
  fn: () => T
): T {
  if (typeof window === 'undefined' || !window.performance) {
    return fn()
  }
  
  const start = performance.now()
  const result = fn()
  const end = performance.now()
  
  // Performance measurement - removed console.log to reduce main-thread work
  // Use performance.mark/measure API for production monitoring instead
  return result
}
