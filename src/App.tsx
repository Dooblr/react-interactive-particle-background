import { useState } from "react"
import ParticleCanvas from "./ParticleCanvas"

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <ParticleCanvas />
    </>
  )
}

export default App
