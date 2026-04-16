import { useCallback, useState } from 'react'

export function usePremium() {
  const [isPremium, setIsPremium] = useState(false)

  const checkFeature = useCallback(
    (featureName: string): boolean => {
      if (!isPremium) {
        console.log(`[VerseFlow Premium] ${featureName} requires premium tier`)
        return false
      }
      return true
    },
    [isPremium]
  )

  const upgradeRequired = useCallback((featureName: string) => {
    return {
      available: isPremium,
      featureName,
      message: `${featureName} is available with VerseFlow Premium`,
    }
  }, [isPremium])

  return {
    isPremium,
    setIsPremium,
    checkFeature,
    upgradeRequired,
  }
}
