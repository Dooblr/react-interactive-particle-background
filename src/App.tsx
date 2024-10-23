import React from "react"
import ParticleBackground from "./components/ParticleBackground"

function App() {
  return (
    <>
      <ParticleBackground
        particleColor="255, 255, 255"
        particleSpeed={1.0}
        attractionStrength={1}
        deflection={true}
        bokehEffect={true}
        bokehStrength={100}
        canvasZIndex={-1000}
        particleOpacity={0.8}
        maxDistance={200}
      />
    </>
  )
}

export default App
