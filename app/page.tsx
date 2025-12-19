"use client"

import { useState } from "react"
import { FileUploader } from "@/components/file-uploader"
import { MediaPlayer } from "@/components/media-player"
import { Moon, Sun, Linkedin, Github, Globe } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useTheme } from "@/components/theme-provider"

export default function HomePage() {
  const [selectedFile, setSelectedFile] = useState<{
    name: string
    type: string
    url: string
    file: File
  } | null>(null)
  const { theme, setTheme } = useTheme()

  return (
    <div className="min-h-screen bg-background transition-colors duration-300 flex flex-col">
      <header className="border-b border-border/50 backdrop-blur-sm bg-background/80 sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full" />
                <div className="relative w-10 h-10 rounded-full bg-gradient-to-br from-primary to-chart-2 flex items-center justify-center">
                  <div className="w-4 h-4 border-2 border-primary-foreground rounded-sm" />
                </div>
              </div>
              <div>
                <h1 className="text-xl font-semibold tracking-tight">MediaFlow</h1>
                <p className="text-xs text-muted-foreground">Universal Player</p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="rounded-full hover:bg-accent"
            >
              {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-12 flex-1">
        {!selectedFile ? (
          <div className="flex min-h-[calc(100vh-12rem)] items-center justify-center">
            <FileUploader onFileSelect={setSelectedFile} />
          </div>
        ) : (
          <MediaPlayer file={selectedFile} onClose={() => setSelectedFile(null)} />
        )}
      </main>

      <footer className="border-t border-border/50 bg-background/80 backdrop-blur-sm mt-auto">
        <div className="container mx-auto px-6 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex flex-col items-center md:items-start gap-1">
              <p className="text-sm text-muted-foreground">
                Developed and designed by <span className="font-medium text-foreground">Bimlesh Kumar</span>
              </p>
              <p className="text-xs text-muted-foreground">Open source project - contributions welcome</p>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="sm" className="rounded-full hover:bg-accent gap-2" asChild>
                <a
                  href="https://www.linkedin.com/in/bimlesh-kumar-iiitbh-cse/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Linkedin className="h-4 w-4" />
                  <span className="text-xs">LinkedIn</span>
                </a>
              </Button>
              <Button variant="ghost" size="sm" className="rounded-full hover:bg-accent gap-2" asChild>
                <a href="https://github.com/BimleshRB" target="_blank" rel="noopener noreferrer">
                  <Github className="h-4 w-4" />
                  <span className="text-xs">GitHub</span>
                </a>
              </Button>
              <Button variant="ghost" size="sm" className="rounded-full hover:bg-accent gap-2" asChild>
                <a href="https://portfolio-jade-chi-50.vercel.app/" target="_blank" rel="noopener noreferrer">
                  <Globe className="h-4 w-4" />
                  <span className="text-xs">Portfolio</span>
                </a>
              </Button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
