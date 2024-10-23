declare module "react-interactive-particle-background" {
  import { FC } from "react"

  export interface ParticleBackgroundProps {
    particleColor?: string
    particleSpeed?: number
    particleCount?: number
    attractionStrength?: number
    deflection?: boolean
    bokehEffect?: boolean
    backgroundGradient?: string
    canvasZIndex?: number
    particleOpacity?: number
    maxDistance?: number // <-- Added new prop here
    style?: React.CSSProperties
  }

  export const ParticleBackground: FC<ParticleBackgroundProps>
}
