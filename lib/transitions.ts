export type TransitionType = 'fade' | 'slide' | 'zoom' | 'none'

export const getTransitionClasses = (
  transitionType: TransitionType,
  duration: number
): string => {
  const durationMs = duration
  const durationS = duration / 1000

  const baseClasses = `transition-all duration-${Math.round(durationMs / 100) * 100}`

  switch (transitionType) {
    case 'fade':
      return `${baseClasses} opacity-100 animate-in fade-in duration-${Math.round(durationMs / 100) * 100}`
    case 'slide':
      return `${baseClasses} slide-in-from-right-96 animate-in duration-${Math.round(durationMs / 100) * 100}`
    case 'zoom':
      return `${baseClasses} zoom-in animate-in duration-${Math.round(durationMs / 100) * 100}`
    case 'none':
    default:
      return ''
  }
}

export const getTransitionStyle = (
  transitionType: TransitionType,
  duration: number
): React.CSSProperties => {
  const durationS = duration / 1000

  switch (transitionType) {
    case 'fade':
      return {
        animation: `fadeIn ${durationS}s ease-in-out`,
        opacity: 1,
      }
    case 'slide':
      return {
        animation: `slideInRight ${durationS}s ease-out`,
      }
    case 'zoom':
      return {
        animation: `zoomIn ${durationS}s ease-out`,
      }
    case 'none':
    default:
      return {}
  }
}

// CSS animations to be added to global styles
export const transitionKeyframes = `
  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  @keyframes slideInRight {
    from {
      transform: translateX(100%);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }

  @keyframes slideInUp {
    from {
      transform: translateY(100%);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }

  @keyframes zoomIn {
    from {
      transform: scale(0.8);
      opacity: 0;
    }
    to {
      transform: scale(1);
      opacity: 1;
    }
  }
`
