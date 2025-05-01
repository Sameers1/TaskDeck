"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, CheckCircle, Sparkles, Users, BarChart } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"
import { motion } from "framer-motion"

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  }

  if (!isLoaded) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Sparkles className="h-12 w-12 text-primary animate-pulse" />
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2 font-semibold">
            <Sparkles className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold gradient-heading">Scrum Poker</span>
          </div>
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <Link href="/login">
              <Button variant="ghost" className="rounded-full">
                Login
              </Button>
            </Link>
            <Link href="/signup">
              <Button className="rounded-full bg-gradient-to-r from-primary to-secondary hover:opacity-90">
                Sign Up
              </Button>
            </Link>
          </div>
        </div>
      </header>
      <main className="flex-1">
        <section className="hero-pattern container space-y-6 py-24 md:py-32 lg:py-40">
          <motion.div
            className="mx-auto flex max-w-[64rem] flex-col items-center gap-4 text-center"
            initial="hidden"
            animate="show"
            variants={container}
          >
            <motion.div className="animate-float" variants={item}>
              <Sparkles className="h-12 w-12 text-primary mb-4" />
            </motion.div>
            <motion.h1 className="text-4xl font-bold sm:text-5xl md:text-6xl lg:text-7xl" variants={item}>
              Agile Estimation <span className="gradient-heading">Made Professional</span>
            </motion.h1>
            <motion.p
              className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8"
              variants={item}
            >
              Streamline your planning poker sessions with our elegant, interactive Scrum Poker app. Collaborate with
              your team, estimate tasks, and reach consensus—all in one beautifully designed space.
            </motion.p>
            <motion.div className="flex gap-4 mt-6" variants={item}>
              <Link href="/signup">
                <Button
                  size="lg"
                  className="gap-2 rounded-full bg-gradient-to-r from-primary to-secondary hover:opacity-90 shadow-lg"
                >
                  Get Started <ArrowRight size={16} />
                </Button>
              </Link>
              <Link href="/login?guest=true">
                <Button size="lg" variant="outline" className="rounded-full border-primary/20 shadow-sm">
                  Continue as Guest
                </Button>
              </Link>
              <Link href="/sessions/join">
                <Button size="lg" variant="ghost" className="rounded-full">
                  Join a Session
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </section>

        <section className="container py-16 confetti-bg">
          <motion.div
            className="grid gap-8 md:grid-cols-3"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, staggerChildren: 0.2 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <motion.div
              className="flex flex-col items-center gap-4 rounded-xl border p-8 text-center card-hover card-shine glass-card"
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
            >
              <div className="rounded-full bg-primary/10 p-3">
                <CheckCircle className="h-10 w-10 text-primary" />
              </div>
              <h3 className="text-xl font-semibold">Real-time Collaboration</h3>
              <p className="text-muted-foreground">
                Participate in planning poker sessions with your team in real-time, no matter where they are.
              </p>
            </motion.div>
            <motion.div
              className="flex flex-col items-center gap-4 rounded-xl border p-8 text-center card-hover card-shine glass-card"
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
            >
              <div className="rounded-full bg-secondary/10 p-3">
                <Users className="h-10 w-10 text-secondary" />
              </div>
              <h3 className="text-xl font-semibold">Simple & Intuitive</h3>
              <p className="text-muted-foreground">
                Easy-to-use interface designed for both Scrum masters and team members with minimal learning curve.
              </p>
            </motion.div>
            <motion.div
              className="flex flex-col items-center gap-4 rounded-xl border p-8 text-center card-hover card-shine glass-card"
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
            >
              <div className="rounded-full bg-accent/10 p-3">
                <BarChart className="h-10 w-10 text-accent" />
              </div>
              <h3 className="text-xl font-semibold">Insightful Analytics</h3>
              <p className="text-muted-foreground">
                Get detailed session summaries with voting patterns and final estimates for all your user stories.
              </p>
            </motion.div>
          </motion.div>
        </section>

        <section className="container py-16">
          <motion.div
            className="mx-auto max-w-4xl rounded-2xl bg-gradient-to-r from-primary/5 via-secondary/5 to-accent/5 p-8 md:p-12"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <div className="flex flex-col items-center text-center">
              <h2 className="text-3xl font-bold mb-6">Ready to transform your estimation sessions?</h2>
              <p className="text-lg text-muted-foreground mb-8">
                Join thousands of agile teams who have made their planning sessions more efficient and enjoyable.
              </p>
              <Link href="/signup">
                <Button
                  size="lg"
                  className="gap-2 rounded-full bg-gradient-to-r from-primary to-secondary hover:opacity-90 shadow-lg"
                >
                  Start for Free <ArrowRight size={16} />
                </Button>
              </Link>
            </div>
          </motion.div>
        </section>
      </main>
      <footer className="border-t py-8 bg-gradient-to-r from-primary/5 via-secondary/5 to-accent/5">
        <div className="container flex flex-col items-center justify-between gap-4 md:flex-row">
          <div className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary" />
            <span className="font-bold gradient-heading">Scrum Poker</span>
          </div>
          <div className="flex items-center gap-4">
            <ThemeToggle />
          </div>
          <p className="text-center text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} Scrum Poker. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}
