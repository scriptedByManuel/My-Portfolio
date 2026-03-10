"use client"

import { Card } from "@/components/ui/card"
import { useEffect, useRef, useState } from "react"

const skills = [
  {
    category: "Tech Stack",
    items: ["Tailwind CSS", "JavaScript", "TypeScript", "React", "Next.js", "Node.js", "Express", "MongoDB", "MySQL", "Supabase"],
  },
  {
    category: "Tools",
    items: ["Git", "GitHub", "Docker", "Coolify", "Linux", "VS Code", "Figma", "Chrome DevTools"],
  }
]

export function Skills() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current)
      }
    }
  }, [])

  return (
    <section id="skills" className="py-20 px-4" ref={sectionRef}>
      <div className="max-w-6xl mx-auto">
        <div className={`space-y-4 mb-12 opacity-0 ${isVisible ? "animate-fade-in-up" : ""}`}>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Skills & Technologies</h2>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Technologies and tools I work with to bring ideas to life.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {skills.map((skillGroup, index) => (
            <Card
              key={skillGroup.category}
              className={`p-6 space-y-4 opacity-0 hover:scale-105 hover:shadow-lg transition-all duration-300 ${
                isVisible ? `animate-scale-in animation-delay-${index * 200 + 200}` : ""
              }`}
            >
              <h3 className="text-xl font-semibold">{skillGroup.category}</h3>
              <div className="flex flex-wrap gap-2">
                {skillGroup.items.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium hover:bg-primary/20 hover:scale-110 transition-all duration-300 cursor-default"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
