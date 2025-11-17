"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Mail, Linkedin, Github } from "lucide-react"
import { useEffect, useRef, useState } from "react"

export function Contact() {
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
    <section id="contact" className="py-20 px-4" ref={sectionRef}>
      <div className="max-w-4xl mx-auto">
        <div className={`space-y-4 mb-12 text-center opacity-0 ${isVisible ? "animate-fade-in-up" : ""}`}>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Get In Touch</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            I'm currently looking for internship opportunities. Feel free to reach out if you'd like to connect!
          </p>
        </div>

        <Card
          className={`p-8 opacity-0 hover:shadow-2xl transition-all duration-500 ${isVisible ? "animate-scale-in animation-delay-200" : ""}`}
        >
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="default" size="lg" asChild className="hover:scale-110 transition-transform duration-300">
                <a href="mailto:your.email@example.com">
                  <Mail className="w-5 h-5 mr-2" />
                  Email Me
                </a>
              </Button>
              <Button
                variant="outline"
                size="lg"
                asChild
                className="hover:scale-110 transition-transform duration-300 bg-transparent"
              >
                <a href="https://www.linkedin.com/in/aunt-htoo-naing-279bb6372/" target="_blank" rel="noopener noreferrer">
                  <Linkedin className="w-5 h-5 mr-2" />
                  LinkedIn
                </a>
              </Button>
              <Button
                variant="outline"
                size="lg"
                asChild
                className="hover:scale-110 transition-transform duration-300 bg-transparent"
              >
                <a href="https://github.com/scriptedByManuel" target="_blank" rel="noopener noreferrer">
                  <Github className="w-5 h-5 mr-2" />
                  GitHub
                </a>
              </Button>
            </div>

            <div className="text-center pt-4">
              <p className="text-sm text-muted-foreground">antthtoonaing74@email.com</p>
            </div>
          </div>
        </Card>

        <footer
          className={`mt-20 text-center text-sm text-muted-foreground opacity-0 ${isVisible ? "animate-fade-in animation-delay-600" : ""}`}
        >
          <p>© 2025 Aunt Htoo Naing. All rights reserved.</p>
        </footer>
      </div>
    </section>
  )
}
