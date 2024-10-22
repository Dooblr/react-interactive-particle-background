declare module "react-interactive-particle-background" {
  import { FC } from "react"

  export interface ParticleBackgroundProps {
    particleColor?: string
    particleSpeed?: number
    particleCount?: number
    attractionStrength?: number
    deflection?: boolean
    bokehEffect?: boolean
    backgroundGradient?: string // Allow customizable background gradient
    canvasZIndex?: number // Control the z-index of the canvas
    particleOpacity?: number // Customize particle transparency
    style? = Object
  }

  export const ParticleBackground: FC<ParticleBackgroundProps>
}
