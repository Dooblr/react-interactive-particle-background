import React, { useEffect, useRef } from "react";
import "./ParticleBackground.scss";

interface Point {
  x: number;
  y: number;
  vx: number;
  vy: number;
  dia: number;
}

interface ParticleBackgroundProps {
  particleColor?: string;
  particleSpeed?: number;
  particleCount?: number; // Number of particles
  attractionStrength?: number; // Controls how strongly particles are attracted to the mouse
  deflection?: boolean; // If true, particles will repel instead of attract
  bokehEffect?: boolean; // If true, enables bokeh visual effect
}

const ParticleBackground: React.FC<ParticleBackgroundProps> = ({
  particleColor = "255,255,255",
  particleSpeed = 0.1,
  particleCount = 80,
  attractionStrength = 2.0,
  deflection = true,
  bokehEffect = false,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const points = useRef<Point[]>([]);
  const mousePoint = useRef<Point | null>(null);

  const maxDist = 250;

  // Generate points based on the canvas size
  const generatePoints = (amount: number) => {
    points.current = [];
    const canvas = canvasRef.current;
    if (canvas) {
      for (let i = 0; i < amount; i++) {
        points.current.push({
          x: Math.random() * (canvas.width + maxDist) - maxDist / 2,
          y: Math.random() * (canvas.height + maxDist) - maxDist / 2,
          vx: (Math.random() * 1 - 0.5) * particleSpeed,
          vy: (Math.random() * 1 - 0.5) * particleSpeed,
          dia: Math.random() * 3 + 1,
        });
      }
    }
  };

  // Draw a single point with optional simplified bokeh effect
  const draw = (ctx: CanvasRenderingContext2D, obj: Point) => {
    ctx.beginPath();

    // Simplified Bokeh effect: simulate depth with transparency
    if (bokehEffect) {
      const alpha = Math.min(1, obj.dia / 3); // Larger particles more transparent
      ctx.globalAlpha = alpha;
      ctx.fillStyle = `rgb(${particleColor})`;
    } else {
      ctx.fillStyle = `rgb(${particleColor})`;
      ctx.globalAlpha = 1; // Reset transparency
    }

    ctx.arc(obj.x, obj.y, obj.dia || 2, 0, 2 * Math.PI);
    ctx.closePath();
    ctx.fill();
  };

  // Update the point's position based on velocity and mouse interaction
  const update = (obj: Point, canvasWidth: number, canvasHeight: number) => {
    // Attraction/deflection logic
    if (mousePoint.current) {
      const distX = mousePoint.current.x - obj.x;
      const distY = mousePoint.current.y - obj.y;
      const distance = Math.sqrt(distX * distX + distY * distY);

      if (distance < maxDist) {
        const force = attractionStrength / distance;
        const dirX = distX / distance;
        const dirY = distY / distance;
        const attraction = deflection ? -force : force;

        obj.vx += dirX * attraction;
        obj.vy += dirY * attraction;
      }
    }

    // Regular velocity update
    obj.x += obj.vx;
    obj.y += obj.vy;
    if (obj.x > canvasWidth + maxDist / 2) obj.x = -(maxDist / 2);
    else if (obj.x < -(maxDist / 2)) obj.x = canvasWidth + maxDist / 2;
    if (obj.y > canvasHeight + maxDist / 2) obj.y = -(maxDist / 2);
    else if (obj.y < -(maxDist / 2)) obj.y = canvasHeight + maxDist / 2;
  };

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
        );
        if (temp < dist) {
          ctx.beginPath();
          ctx.moveTo(obj.x, obj.y);
          ctx.strokeStyle = `rgba(${particleColor},${
            0.8 * Math.pow((dist - temp) / dist, 5)
          })`;
          ctx.lineTo(p.x, p.y);
          ctx.closePath();
          ctx.stroke();
        }
      }
    });
  };

  // Main animation loop
  const pointFun = (ctx: CanvasRenderingContext2D) => {
    const canvas = canvasRef.current;
    if (canvas) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // If mouse exists, treat it as a point and interact with other points
      if (mousePoint.current) {
        collision(ctx, mousePoint.current, maxDist * 2);
        draw(ctx, mousePoint.current);
      }

      points.current.forEach((p) => {
        collision(ctx, p, maxDist);
        draw(ctx, p);
        update(p, canvas.width, canvas.height);
      });
    }
  };

  // Resize the canvas to fit the window
  const resizeCanvas = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      generatePoints(particleCount); // Re-generate points when resizing
    }
  };

  // Mouse move handler, track mouse as a point
  const handleMouseMove = (event: MouseEvent) => {
    const canvas = canvasRef.current;
    if (canvas) {
      const rect = canvas.getBoundingClientRect();
      mousePoint.current = {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top,
        vx: 0,
        vy: 0,
        dia: 4, // Mouse is slightly larger
      };
    }
  };

  // useEffect hook to handle component lifecycle
  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext("2d");
      if (ctx) {
        resizeCanvas();
        window.addEventListener("resize", resizeCanvas);
        canvas.addEventListener("mousemove", handleMouseMove);

        const interval = setInterval(() => pointFun(ctx), 16);

        return () => {
          clearInterval(interval);
          window.removeEventListener("resize", resizeCanvas);
          canvas.removeEventListener("mousemove", handleMouseMove);
        };
      }
    }
  }, [particleColor, particleSpeed, attractionStrength, deflection, bokehEffect]);

  return (
    <div className="particle-container">
      <canvas id="canvas" ref={canvasRef} className="canvas" />
    </div>
  );
};

export default ParticleBackground;
