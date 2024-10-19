// src/types/react-interactive-particle-background.d.ts
declare module "react-interactive-particle-background" {
  // Replace these with actual definitions based on how the library works
  export interface ParticleBackgroundConfig {
    color?: string
    size?: number
    // Add any other configuration options available
  }

  export class ParticleBackground {
    constructor(config: ParticleBackgroundConfig)
    start(): void
    stop(): void
    // Add any other methods or properties used in your code
  }

  // Export other necessary parts of the library
}
