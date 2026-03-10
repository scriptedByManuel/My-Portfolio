"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ExternalLink, Github } from "lucide-react"
import Image from "next/image"
import { useEffect, useRef, useState } from "react"

const projects = [
  {
    title: "TrendFlow E-Commerce App",
    description: "A responsive e-commerce application focused on a seamless customer shopping experience. Features efficient product searching, a personalized favorites system, and a comprehensive order management module including detailed voucher lists. Built with a modern tech stack and a robust backend to handle dynamic product data and streamlined cash-on-delivery transactions.",
    image: "/trendflow-webpage.png",
    tags: ["React Router", "React Hook Form", "Responsive", "Supabase", "React", "Tailwind CSS"],
    github: "https://github.com/scriptedByManuel/TrendFlow",
    demo: "https://trendflowmv.netlify.app/",
  },
  {
    title: "Pixel Solutions Invoice App",
    description: "A modern Inventory, Sales, and Voucher Management System built with React, TailwindCSS, and Laravel API. Features product management, sales tracking, vouchers, and user profile settings with clean UI and smooth loading states.",
    image: "/invoice-app.png",
    tags: ["React", "Tailwind CSS", "API", "Responsive", "SWR", "React Router", "React Hook Form"],
    github: "https://github.com/scriptedByManuel/Invoice-App",
    demo: "https://devpixelsolutions.netlify.app/",
  },
  {
    title: "Savory Stories",
    description: "A full-stack culinary platform for sharing recipes and food blogs. Features secure user authentication, personalized account profiles, and seamless image uploading for culinary creations. Built with a robust backend to handle dynamic content management.",
    image: "/savory-stories.jpg",
    tags: ["Express", "MongoDB", "API", "Next.js", "React", "Node.js", "Tailwind CSS", "Responsive"],
    github: "https://github.com/scriptedByManuel/SavoryStories-Client-MERN",
    demo: "https://savory-stories-manuel.vercel.app",
  },
]

export function Projects() {
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
    <section id="projects" className="py-20 px-4 bg-muted/30" ref={sectionRef}>
      <div className="max-w-6xl mx-auto">
        <div className={`space-y-4 mb-12 opacity-0 ${isVisible ? "animate-fade-in-up" : ""}`}>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Featured Projects</h2>
          <p className="text-lg text-muted-foreground max-w-2xl">
            A selection of projects I've worked on, showcasing my skills and learning journey.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <Card
              key={project.title}
              className={`overflow-hidden flex flex-col opacity-0 hover:scale-105 hover:shadow-2xl transition-all duration-500 group ${
                isVisible ? `animate-fade-in-up animation-delay-${index * 200 + 200}` : ""
              }`}
            >
              <div className="relative h-48 w-full bg-muted overflow-hidden">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <CardHeader>
                <CardTitle className="text-xl group-hover:text-primary transition-colors duration-300">
                  {project.title}
                </CardTitle>
                <CardDescription className="leading-relaxed">{project.description}</CardDescription>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col justify-between">
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 bg-accent/20 text-accent-foreground rounded text-xs font-medium hover:bg-accent/30 transition-colors duration-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {project.warning && (
                  <div className="mb-3 rounded-md border border-yellow-500/30 bg-yellow-500/10 px-3 py-2 text-sm text-yellow-600">
                    {project.warning}
                  </div>
                )}

                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    asChild
                    className="flex-1 bg-transparent hover:scale-105 transition-transform duration-300"
                  >
                    <a href={project.github} target="_blank" rel="noopener noreferrer">
                      <Github className="w-4 h-4 mr-2" />
                      Code
                    </a>
                  </Button>
                  <Button
                    variant="default"
                    size="sm"
                    asChild
                    className="flex-1 hover:scale-105 transition-transform duration-300"
                  >
                    <a href={project.demo} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Demo
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
