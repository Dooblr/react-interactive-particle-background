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
    maxDistance?: number // Allow customizable max distance
    bokehStrength?: number // Control the strength of the bokeh effect
    style?: React.CSSProperties
  }

  export const ParticleBackground: FC<ParticleBackgroundProps>
}
