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
        bokehEffect={false} // TODO: not functioning properly yet
        canvasZIndex={-1000}
        particleOpacity={0.8}
      />
    </>
  )
}

export default App
