import React, { useEffect, useRef } from "react"
import "./ParticleCanvas.scss"

interface Point {
  x: number
  y: number
  vx: number
  vy: number
  dia: number
}

const ParticleCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const points = useRef<Point[]>([]) // Ref to avoid rerender on points change
  const mousePoint = useRef<Point | null>(null) // Mouse point as a reference to track the mouse

  // Params ====================================================
  const maxDist = 250
  const particleColor = "255,255,255"

  // Generate points based on the canvas size
  const generatePoints = (amount: number) => {
    points.current = [] // Reset points array
    const canvas = canvasRef.current
    if (canvas) {
      for (let i = 0; i < amount; i++) {
        points.current.push({
          x: Math.random() * (canvas.width + maxDist) - maxDist / 2,
          y: Math.random() * (canvas.height + maxDist) - maxDist / 2,
          vx: Math.random() * 1 - 0.5,
          vy: Math.random() * 1 - 0.5,
          dia: Math.random() * 3 + 1,
        })
      }
    }
  }

  // Draw a single point
  const draw = (ctx: CanvasRenderingContext2D, obj: Point) => {
    ctx.beginPath()
    ctx.fillStyle = `rgb(${particleColor})`
    ctx.arc(obj.x, obj.y, obj.dia || 2, 0, 2 * Math.PI)
    ctx.closePath()
    ctx.fill()
  }

  // Update the point's position based on velocity
  const update = (obj: Point, canvasWidth: number, canvasHeight: number) => {
    obj.x += obj.vx
    obj.y += obj.vy
    if (obj.x > canvasWidth + maxDist / 2) obj.x = -(maxDist / 2)
    else if (obj.x < -(maxDist / 2)) obj.x = canvasWidth + maxDist / 2
    if (obj.y > canvasHeight + maxDist / 2) obj.y = -(maxDist / 2)
    else if (obj.y < -(maxDist / 2)) obj.y = canvasHeight + maxDist / 2
  }

  // Handle collisions between points and mouse or other points
  const collision = (
    ctx: CanvasRenderingContext2D,
    obj: Point,
    dist: number
  ) => {
    points.current.forEach((p) => {
      if (obj !== p) {
        const temp = Math.sqrt(
          Math.pow(obj.x - p.x, 2) + Math.pow(obj.y - p.y, 2)
        )
        if (temp < dist) {
          ctx.beginPath()
          ctx.moveTo(obj.x, obj.y)
          ctx.strokeStyle = `rgba(${particleColor},${
            0.8 * Math.pow((dist - temp) / dist, 5)
          })`
          ctx.lineTo(p.x, p.y)
          ctx.closePath()
          ctx.stroke()
        }
      }
    })
  }

  // Main animation loop
  const pointFun = (ctx: CanvasRenderingContext2D) => {
    const canvas = canvasRef.current
    if (canvas) {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // If mouse exists, treat it as a point and interact with other points
      if (mousePoint.current) {
        collision(ctx, mousePoint.current, maxDist * 2) // Larger distance for the mouse
        draw(ctx, mousePoint.current)
      }

      points.current.forEach((p) => {
        collision(ctx, p, maxDist)
        draw(ctx, p)
        update(p, canvas.width, canvas.height)
      })
    }
  }

  // Resize the canvas to fit the window
  const resizeCanvas = () => {
    const canvas = canvasRef.current
    if (canvas) {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      generatePoints(80) // Re-generate points when resizing
    }
  }

  // Mouse move handler, track mouse as a point
  const handleMouseMove = (event: MouseEvent) => {
    const canvas = canvasRef.current
    if (canvas) {
      const rect = canvas.getBoundingClientRect()
      mousePoint.current = {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top,
        vx: 0, // Mouse doesn't have velocity
        vy: 0,
        dia: 4, // Make the mouse point slightly larger
      }
    }
  }

  // useEffect hook to handle component lifecycle
  useEffect(() => {
    const canvas = canvasRef.current
    if (canvas) {
      const ctx = canvas.getContext("2d")
      if (ctx) {
        resizeCanvas()
        window.addEventListener("resize", resizeCanvas)
        canvas.addEventListener("mousemove", handleMouseMove)

        const interval = setInterval(() => pointFun(ctx), 16) // Animation loop

        return () => {
          clearInterval(interval)
          window.removeEventListener("resize", resizeCanvas)
          canvas.removeEventListener("mousemove", handleMouseMove)
        }
      }
    }
  }, []) // Empty dependency array to run effect once on mount

  return (
    <div className="particle-container">
      <canvas id="canvas" ref={canvasRef} className="canvas" />
    </div>
  )
}

export default ParticleCanvas
