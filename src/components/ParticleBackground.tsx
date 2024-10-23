import React, { useEffect, useRef } from "react"
import "./ParticleBackground.scss"

interface Point {
  x: number
  y: number
  vx: number
  vy: number
  dia: number
}

interface ParticleBackgroundProps {
  particleColor?: string
  particleSpeed?: number
  particleCount?: number
  attractionStrength?: number
  deflection?: boolean
  bokehEffect?: boolean
  backgroundGradient?: string
  canvasZIndex?: number
  particleOpacity?: number
  maxDistance?: number
  bokehStrength?: number // Added bokeh strength prop
  style?: React.CSSProperties
}

const ParticleBackground: React.FC<ParticleBackgroundProps> = ({
  particleColor = "255,255,255",
  particleSpeed = 0.5,
  particleCount = 80,
  attractionStrength = 2.0,
  deflection = true,
  bokehEffect = false,
  backgroundGradient = "linear-gradient(to bottom, #000, #000)",
  canvasZIndex = -1090,
  particleOpacity = 1,
  style = {},
  maxDistance = 200,
  bokehStrength = 1000, // Default bokeh strength
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const points = useRef<Point[]>([])
  const mousePoint = useRef<Point | null>(null)

  // Generate points based on the canvas size
  const generatePoints = (amount: number) => {
    const canvas = canvasRef.current
    if (canvas) {
      points.current = Array.from({ length: amount }, () => ({
        x: Math.random() * (canvas.width + maxDistance) - maxDistance / 2,
        y: Math.random() * (canvas.height + maxDistance) - maxDistance / 2,
        vx: (Math.random() * 1 - 0.5) * particleSpeed,
        vy: (Math.random() * 1 - 0.5) * particleSpeed,
        dia: Math.random() * 3 + 1,
      }))
    }
  }

  // Draw particles with optional bokeh effect
  const draw = (ctx: CanvasRenderingContext2D, obj: Point) => {
    ctx.save()

    if (bokehEffect) {
      const alpha = Math.min(1, obj.dia / 3)
      ctx.globalAlpha = alpha * particleOpacity
      ctx.shadowColor = `rgba(${particleColor}, ${ctx.globalAlpha})`
      ctx.shadowBlur = bokehStrength // Use the bokehStrength prop for shadow blur
    } else {
      ctx.globalAlpha = particleOpacity
    }

    ctx.fillStyle = `rgb(${particleColor})`
    ctx.beginPath()
    ctx.arc(obj.x, obj.y, obj.dia, 0, 2 * Math.PI)
    ctx.fill()

    ctx.restore() // Restore context state
  }

  // Update the point's position based on velocity and mouse interaction
  const update = (obj: Point, canvasWidth: number, canvasHeight: number) => {
    if (mousePoint.current) {
      const distX = mousePoint.current.x - obj.x
      const distY = mousePoint.current.y - obj.y
      const distance = Math.sqrt(distX * distX + distY * distY)

      if (distance < maxDistance) {
        const force = attractionStrength / distance
        const dirX = distX / distance
        const dirY = distY / distance
        const attraction = deflection ? -force : force

        obj.vx += dirX * attraction
        obj.vy += dirY * attraction
      }
    }

    obj.x += obj.vx
    obj.y += obj.vy
    if (obj.x > canvasWidth + maxDistance / 2) obj.x = -(maxDistance / 2)
    else if (obj.x < -(maxDistance / 2)) obj.x = canvasWidth + maxDistance / 2
    if (obj.y > canvasHeight + maxDistance / 2) obj.y = -(maxDistance / 2)
    else if (obj.y < -(maxDistance / 2)) obj.y = canvasHeight + maxDistance / 2
  }

  // Handle collisions between points
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

      if (mousePoint.current) {
        collision(ctx, mousePoint.current, maxDistance * 2)
        draw(ctx, mousePoint.current)
      }

      points.current.forEach((p) => {
        collision(ctx, p, maxDistance)
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
      generatePoints(particleCount)
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
        vx: 0,
        vy: 0,
        dia: 4,
      }
    }
  }

  // useEffect hook to initialize canvas and animation
  useEffect(() => {
    const canvas = canvasRef.current
    if (canvas) {
      const ctx = canvas.getContext("2d")
      if (ctx) {
        resizeCanvas()
        window.addEventListener("resize", resizeCanvas)
        canvas.addEventListener("mousemove", handleMouseMove)

        const interval = setInterval(() => pointFun(ctx), 16)

        return () => {
          clearInterval(interval)
          window.removeEventListener("resize", resizeCanvas)
          canvas.removeEventListener("mousemove", handleMouseMove)
        }
      }
    }
  }, [
    particleColor,
    particleSpeed,
    attractionStrength,
    deflection,
    bokehEffect,
    particleOpacity,
    maxDistance,
    bokehStrength,
  ])

  return (
    <div
      className="particle-container"
      style={{ background: backgroundGradient, ...style }}
    >
      <canvas
        ref={canvasRef}
        style={{ zIndex: canvasZIndex }}
      />
    </div>
  )
}

export default ParticleBackground
