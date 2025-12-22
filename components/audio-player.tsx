"use client"

import { useRef, useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  SkipBack,
  SkipForward,
  Music,
  Repeat,
  Shuffle,
  AlertCircle,
  Download,
} from "lucide-react"

interface AudioPlayerProps {
  url: string
  fileName: string
}

export function AudioPlayer({ url, fileName }: AudioPlayerProps) {
  const audioRef = useRef<HTMLAudioElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume] = useState(1)
  const [isMuted, setIsMuted] = useState(false)
  const [isRepeat, setIsRepeat] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  const getMimeType = (filename: string): string => {
    const ext = filename.toLowerCase().split(".").pop()
    const mimeTypes: Record<string, string> = {
      mp3: "audio/mpeg",
      wav: "audio/wav",
      ogg: "audio/ogg",
      oga: "audio/ogg",
      m4a: "audio/mp4",
      aac: "audio/aac",
      flac: "audio/flac",
      wma: "audio/x-ms-wma",
    }
    return mimeTypes[ext || ""] || "audio/mpeg"
  }

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    console.log("Audio Player Init:", {
      url,
      fileName,
      mimeType: getMimeType(fileName),
    })
    setIsLoading(true)
    setError(null)

    const updateTime = () => setCurrentTime(audio.currentTime)
    const updateDuration = () => {
      console.log("Audio metadata loaded:", {
        duration: audio.duration,
        readyState: audio.readyState,
      })
      setDuration(audio.duration)
      setIsLoading(false)
    }
    const handleEnded = () => {
      if (isRepeat) {
        audio.currentTime = 0
        audio.play()
      } else {
        setIsPlaying(false)
      }
    }
    const handleError = (e: Event) => {
      console.error("Audio error details:", {
        error: audio.error,
        errorCode: audio.error?.code,
        errorMessage: audio.error?.message,
        networkState: audio.networkState,
        readyState: audio.readyState,
        event: e,
      })
      setIsLoading(false)

      const errorCode = audio.error?.code
      let userMessage = "Failed to load audio"

      if (errorCode === 4 || errorCode === MediaError.MEDIA_ERR_SRC_NOT_SUPPORTED) {
        userMessage = "Audio format not supported by your browser"
      } else if (errorCode === 3 || errorCode === MediaError.MEDIA_ERR_DECODE) {
        userMessage = "Audio decoding error. File may be corrupted"
      } else if (errorCode === 2 || errorCode === MediaError.MEDIA_ERR_NETWORK) {
        userMessage = "Network error while loading audio"
      } else if (errorCode === 1 || errorCode === MediaError.MEDIA_ERR_ABORTED) {
        userMessage = "Audio loading was aborted"
      }

      setError(userMessage)
    }
    const handleCanPlay = () => {
      console.log("Audio can play - ready to start")
      setIsLoading(false)
      setError(null)
    }
    const handleLoadStart = () => {
      console.log("Audio loading started")
      setIsLoading(true)
    }

    audio.addEventListener("timeupdate", updateTime)
    audio.addEventListener("loadedmetadata", updateDuration)
    audio.addEventListener("ended", handleEnded)
    audio.addEventListener("error", handleError)
    audio.addEventListener("canplay", handleCanPlay)
    audio.addEventListener("loadstart", handleLoadStart)

    audio.load()

    return () => {
      audio.removeEventListener("timeupdate", updateTime)
      audio.removeEventListener("loadedmetadata", updateDuration)
      audio.removeEventListener("ended", handleEnded)
      audio.removeEventListener("error", handleError)
      audio.removeEventListener("canplay", handleCanPlay)
      audio.removeEventListener("loadstart", handleLoadStart)
    }
  }, [isRepeat, url, fileName])

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause()
        console.log("Audio paused")
        setIsPlaying(false)
      } else {
        console.log("Attempting to play audio...")
        audioRef.current
          .play()
          .then(() => {
            console.log("Audio playing successfully")
            setIsPlaying(true)
          })
          .catch((err) => {
            console.error("Play error:", {
              error: err,
              message: err.message,
              name: err.name,
            })
            setError(`Playback failed: ${err.message}`)
            setIsPlaying(false)
          })
      }
    }
  }

  const handleSeek = (value: number[]) => {
    if (audioRef.current) {
      audioRef.current.currentTime = value[0]
      setCurrentTime(value[0])
    }
  }

  const handleVolumeChange = (value: number[]) => {
    if (audioRef.current) {
      const newVolume = value[0]
      audioRef.current.volume = newVolume
      setVolume(newVolume)
      setIsMuted(newVolume === 0)
    }
  }

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted
      setIsMuted(!isMuted)
    }
  }

  const skip = (seconds: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime += seconds
    }
  }

  const handleDownload = () => {
    const a = document.createElement("a")
    a.href = url
    a.download = fileName
    a.click()
  }

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds.toString().padStart(2, "0")}`
  }

  return (
    <div className="max-w-2xl mx-auto">
      <audio ref={audioRef} preload="metadata">
        <source src={url} type={getMimeType(fileName)} />
        Your browser does not support the audio element.
      </audio>

      <Card
        className="p-10 space-y-8 border-border/50 bg-card/50 backdrop-blur-sm"
        tabIndex={0}
        onKeyDownCapture={(e) => {
          if (e.code === "Space" || e.key === " " || (e as any).key === "Spacebar") {
            e.preventDefault()
            e.stopPropagation()
            togglePlay()
          }
        }}
        onKeyUpCapture={(e) => {
          if (e.code === "Space" || e.key === " " || (e as any).key === "Spacebar") {
            e.preventDefault()
            e.stopPropagation()
          }
        }}
        aria-label="Audio player"
        aria-keyshortcuts="Space"
      >
        {isLoading && !error && (
          <div className="bg-muted/50 border border-border rounded-lg p-4">
            <div className="flex items-center gap-3">
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-primary"></div>
              <p className="text-sm font-medium">Loading audio...</p>
            </div>
          </div>
        )}

        {error && (
          <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-destructive mt-0.5" />
              <div className="space-y-2 flex-1">
                <p className="text-sm font-medium text-destructive">{error}</p>
                <p className="text-xs text-muted-foreground">
                  Your browser may not support this audio format. MP3 and WAV have the best support.
                </p>
                <Button onClick={handleDownload} variant="outline" size="sm" className="mt-2 bg-transparent">
                  <Download className="h-4 w-4 mr-2" />
                  Download File
                </Button>
              </div>
            </div>
          </div>
        )}

        <div className="flex justify-center">
          <div className="w-56 h-56 bg-gradient-to-br from-primary/20 via-chart-2/10 to-chart-3/20 rounded-2xl flex items-center justify-center shadow-xl shadow-primary/5">
            <Music className="h-20 w-20 text-muted-foreground/40" />
          </div>
        </div>

        <div className="text-center space-y-1.5">
          <h3 className="text-xl font-semibold truncate">{fileName}</h3>
          <p className="text-sm text-muted-foreground">Unknown Artist</p>
        </div>

        <div className="space-y-2">
          <Slider
            value={[currentTime]}
            max={duration || 100}
            step={0.1}
            onValueChange={handleSeek}
            className="cursor-pointer"
          />
          <div className="flex justify-between text-xs text-muted-foreground font-mono">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>
        </div>

        <div className="flex items-center justify-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsRepeat(!isRepeat)}
            className={`rounded-full ${isRepeat ? "text-primary bg-primary/10" : ""}`}
          >
            <Repeat className="h-4 w-4" />
          </Button>

          <Button variant="ghost" size="icon" onClick={() => skip(-10)} className="rounded-full">
            <SkipBack className="h-5 w-5" />
          </Button>

          <Button size="icon" onClick={togglePlay} className="h-12 w-12 rounded-full shadow-lg">
            {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5 ml-0.5" />}
          </Button>

          <Button variant="ghost" size="icon" onClick={() => skip(10)} className="rounded-full">
            <SkipForward className="h-5 w-5" />
          </Button>

          <Button variant="ghost" size="icon" className="rounded-full">
            <Shuffle className="h-4 w-4" />
          </Button>
        </div>

        <div className="flex items-center justify-center gap-3">
          <Button variant="ghost" size="icon" onClick={toggleMute} className="rounded-full">
            {isMuted || volume === 0 ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
          </Button>
          <div className="w-28">
            <Slider
              value={[isMuted ? 0 : volume]}
              max={1}
              step={0.01}
              onValueChange={handleVolumeChange}
              className="cursor-pointer"
            />
          </div>
        </div>
      </Card>
    </div>
  )
}
