"use client"

import { Github, Linkedin, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { useEffect, useState } from "react"

export function Hero() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <section className="min-h-screen flex items-center justify-center px-4 py-20 relative overflow-hidden">
      <div
        className="absolute inset-0 bg-linear-to-br from-primary/5 via-transparent to-accent/5 animate-pulse"
        style={{ animationDuration: "4s" }}
      />

      <div className="max-w-5xl w-full relative z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className={`order-2 md:order-1 opacity-0 ${isVisible ? "animate-slide-in-left" : ""}`}>
            <div className="relative w-full aspect-square max-w-md mx-auto rounded-2xl overflow-hidden border-4 border-primary/20 shadow-2xl hover:scale-105 transition-transform duration-500 hover:shadow-primary/20">
              <Image
                src="/profile.jpg"
                alt="Profile Photo"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>

          <div className="space-y-6 order-1 md:order-2">
            <div className={`space-y-2 opacity-0 ${isVisible ? "animate-fade-in-up" : ""}`}>
              <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-balance bg-linear-to-r from-foreground to-foreground/70 bg-clip-text">
                Aunt Htoo Naing
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground">Frontend Developer</p>
            </div>

            <p
              className={`text-lg text-muted-foreground leading-relaxed opacity-0 ${isVisible ? "animate-fade-in-up animation-delay-200" : ""}`}
            >
              I create accessible, pixel-perfect digital experiences for the web, with a passion for designing beautiful user interfaces using modern technologies.
            </p>

            <div
              className={`flex flex-wrap gap-4 pt-4 opacity-0 ${isVisible ? "animate-fade-in-up animation-delay-400" : ""}`}
            >
              <Button variant="default" size="lg" asChild className="hover:scale-105 transition-transform duration-300">
                <a href="#projects">View Projects</a>
              </Button>
              <Button
                variant="outline"
                size="lg"
                asChild
                className="hover:scale-105 transition-transform duration-300 bg-transparent"
              >
                <a href="#contact">Contact Me</a>
              </Button>
            </div>

            <div className={`flex gap-4 pt-8 opacity-0 ${isVisible ? "animate-fade-in-up animation-delay-600" : ""}`}>
              <a
                href="https://github.com/scriptedByManuel"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-all duration-300 hover:scale-125"
                aria-label="GitHub Profile"
              >
                <Github className="w-6 h-6" />
              </a>
              <a
                href="https://www.linkedin.com/in/aunt-htoo-naing-279bb6372/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-all duration-300 hover:scale-125"
                aria-label="LinkedIn Profile"
              >
                <Linkedin className="w-6 h-6" />
              </a>
              <a
                href="mailto:antthtoonaing74@gmail.com"
                className="text-muted-foreground hover:text-foreground transition-all duration-300 hover:scale-125"
                aria-label="Email"
              >
                <Mail className="w-6 h-6" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
