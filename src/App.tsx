import React from "react"
import ParticleBackground from "./components/ParticleBackground"

function App() {
  return (
    <>
      <ParticleBackground
        particleColor="255, 255, 255"
        particleSpeed={2.0}
        attractionStrength={1}
        deflection={true}
        bokehEffect={false}
        canvasZIndex={-1000}
        particleOpacity={0.8}
        maxDistance={300}
      />
    </>
  )
}

export default App
