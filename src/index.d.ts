declare module "react-interactive-particle-background" {
  import { FC } from "react";

  interface ParticleBackgroundProps {
    particleColor?: string;
    particleSpeed?: number;
  }

  export const ParticleBackground: FC<ParticleBackgroundProps>;
}
