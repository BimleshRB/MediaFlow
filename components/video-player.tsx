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
  Maximize,
  Settings,
  SkipBack,
  SkipForward,
  Maximize2,
  Minimize2,
  Download,
  AlertCircle,
} from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

interface VideoPlayerProps {
  url: string
  fileName: string
  fileObject: File // Added File object for direct streaming
}

export function VideoPlayer({ url, fileName, fileObject }: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume] = useState(1)
  const [isMuted, setIsMuted] = useState(false)
  const [playbackRate, setPlaybackRate] = useState(1)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [showControls, setShowControls] = useState(true)
  const [videoSize, setVideoSize] = useState<"fit" | "fill" | "original">("fit")
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  const getMimeType = (filename: string): string => {
    const ext = filename.toLowerCase().split(".").pop()
    const mimeTypes: Record<string, string> = {
      mp4: "video/mp4",
      webm: "video/webm",
      ogg: "video/ogg",
      ogv: "video/ogg",
      mkv: "video/x-matroska",
      avi: "video/x-msvideo",
      mov: "video/quicktime",
      wmv: "video/x-ms-wmv",
      flv: "video/x-flv",
      m4v: "video/x-m4v",
    }
    return mimeTypes[ext || ""] || "video/mp4"
  }

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    console.log("Video Player Init:", {
      url,
      fileName,
      fileSize: fileObject.size,
      fileSizeMB: (fileObject.size / (1024 * 1024)).toFixed(2) + " MB",
      mimeType: getMimeType(fileName),
      videoElement: video,
    })

    setIsLoading(true)
    setError(null)

    const updateTime = () => setCurrentTime(video.currentTime)
    const updateDuration = () => {
      console.log("Video metadata loaded:", {
        duration: video.duration,
        videoWidth: video.videoWidth,
        videoHeight: video.videoHeight,
        readyState: video.readyState,
      })
      setDuration(video.duration)
      setIsLoading(false)
    }

    const handleError = (e: Event) => {
      console.error("Video error details:", {
        error: video.error,
        errorCode: video.error?.code,
        errorMessage: video.error?.message,
        networkState: video.networkState,
        readyState: video.readyState,
        currentSrc: video.currentSrc,
        event: e,
      })
      setIsLoading(false)

      const errorCode = video.error?.code
      let userMessage = "Failed to load video"

      if (errorCode === 4 || errorCode === MediaError.MEDIA_ERR_SRC_NOT_SUPPORTED) {
        userMessage = "Video format not supported. Your browser may not support this codec."
      } else if (errorCode === 3 || errorCode === MediaError.MEDIA_ERR_DECODE) {
        userMessage = "Video decoding error. File may be corrupted."
      } else if (errorCode === 2 || errorCode === MediaError.MEDIA_ERR_NETWORK) {
        userMessage = "Network error loading video"
      } else if (errorCode === 1 || errorCode === MediaError.MEDIA_ERR_ABORTED) {
        userMessage = "Video loading was aborted"
      }

      setError(userMessage)
    }

    const handleCanPlay = () => {
      console.log("Video can play:", {
        readyState: video.readyState,
        networkState: video.networkState,
        duration: video.duration,
      })
      setIsLoading(false)
      setError(null)
    }

    const handleLoadStart = () => {
      console.log("Video load started - streaming from disk")
      setIsLoading(true)
    }

    const handleSuspend = () => {
      console.log("Video loading suspended (browser stopped fetching)")
    }

    const handleStalled = () => {
      console.log("Video stalled (trying to fetch but failing)")
    }

    const handleProgress = () => {
      if (video.buffered.length > 0) {
        const bufferedEnd = video.buffered.end(video.buffered.length - 1)
        const duration = video.duration
        if (duration > 0) {
          const percentBuffered = (bufferedEnd / duration) * 100
          console.log("Video buffering progress:", percentBuffered.toFixed(1) + "%")
        }
      }
    }

    video.addEventListener("timeupdate", updateTime)
    video.addEventListener("loadedmetadata", updateDuration)
    video.addEventListener("error", handleError)
    video.addEventListener("canplay", handleCanPlay)
    video.addEventListener("loadstart", handleLoadStart)
    video.addEventListener("suspend", handleSuspend)
    video.addEventListener("stalled", handleStalled)
    video.addEventListener("progress", handleProgress) // Track buffering progress

    video.src = url

    return () => {
      video.removeEventListener("timeupdate", updateTime)
      video.removeEventListener("loadedmetadata", updateDuration)
      video.removeEventListener("error", handleError)
      video.removeEventListener("canplay", handleCanPlay)
      video.removeEventListener("loadstart", handleLoadStart)
      video.removeEventListener("suspend", handleSuspend)
      video.removeEventListener("stalled", handleStalled)
      video.removeEventListener("progress", handleProgress)
    }
  }, [url, fileName, fileObject])

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause()
        console.log("Video paused")
        setIsPlaying(false)
      } else {
        console.log("Attempting to play video...")
        videoRef.current
          .play()
          .then(() => {
            console.log("Video playing successfully")
            setIsPlaying(true)
          })
          .catch((err) => {
            console.error("Play error:", {
              error: err,
              message: err.message,
              name: err.name,
              readyState: videoRef.current?.readyState,
            })
            setError(`Playback failed: ${err.message}`)
            setIsPlaying(false)
          })
      }
    }
  }

  const handleSeek = (value: number[]) => {
    if (videoRef.current) {
      videoRef.current.currentTime = value[0]
      setCurrentTime(value[0])
    }
  }

  const handleVolumeChange = (value: number[]) => {
    if (videoRef.current) {
      const newVolume = value[0]
      videoRef.current.volume = newVolume
      setVolume(newVolume)
      setIsMuted(newVolume === 0)
    }
  }

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted
      setIsMuted(!isMuted)
    }
  }

  const skip = (seconds: number) => {
    if (videoRef.current) {
      videoRef.current.currentTime += seconds
    }
  }

  const changePlaybackRate = (rate: number) => {
    if (videoRef.current) {
      videoRef.current.playbackRate = rate
      setPlaybackRate(rate)
    }
  }

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen()
      setIsFullscreen(true)
    } else {
      document.exitFullscreen()
      setIsFullscreen(false)
    }
  }

  const formatTime = (time: number) => {
    const hours = Math.floor(time / 3600)
    const minutes = Math.floor((time % 3600) / 60)
    const seconds = Math.floor(time % 60)
    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`
    }
    return `${minutes}:${seconds.toString().padStart(2, "0")}`
  }

  const getVideoObjectFit = () => {
    switch (videoSize) {
      case "fill":
        return "object-cover"
      case "original":
        return "object-none"
      default:
        return "object-contain"
    }
  }

  const handleDownload = () => {
    const a = document.createElement("a")
    a.href = url
    a.download = fileName
    a.click()
  }

  return (
    <Card
      ref={containerRef}
      className="overflow-hidden bg-black border-border/30 shadow-2xl shadow-black/20"
      onMouseEnter={() => setShowControls(true)}
      onMouseLeave={() => setShowControls(isPlaying ? false : true)}
    >
      <div className="relative aspect-video bg-black">
        {isLoading && !error && (
          <div className="absolute inset-0 flex items-center justify-center bg-black z-10">
            <div className="text-center space-y-4 text-white">
              <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary mx-auto"></div>
              <div className="space-y-2">
                <p className="text-base font-medium">Loading video...</p>
                <p className="text-sm text-muted-foreground">{fileName}</p>
              </div>
            </div>
          </div>
        )}

        {error && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/95 z-10">
            <div className="text-center space-y-4 text-white p-8 max-w-md">
              <div className="rounded-full bg-destructive/20 p-4 w-fit mx-auto">
                <AlertCircle className="h-12 w-12 text-destructive" />
              </div>
              <div className="space-y-2">
                <p className="text-xl font-semibold">Unable to Play Video</p>
                <p className="text-sm text-red-400">{error}</p>
              </div>
              <div className="text-xs text-muted-foreground space-y-1 bg-muted/10 p-4 rounded-lg">
                <p>
                  <strong>File:</strong> {fileName}
                </p>
                <p>
                  <strong>Format:</strong> {fileName.split(".").pop()?.toUpperCase()}
                </p>
                {fileName.toLowerCase().endsWith(".mkv") && (
                  <p className="text-yellow-400 mt-2">
                    MKV files often contain codecs not supported by browsers. Try converting to MP4 using HandBrake or
                    VLC.
                  </p>
                )}
              </div>
              <Button onClick={handleDownload} variant="outline" size="sm" className="mt-4 bg-transparent">
                <Download className="h-4 w-4 mr-2" />
                Download File
              </Button>
            </div>
          </div>
        )}

        <video
          ref={videoRef}
          className={`w-full h-full ${getVideoObjectFit()}`}
          onClick={togglePlay}
          preload="metadata" // Only preload metadata, not the entire file
          playsInline
        >
          Your browser does not support the video tag.
        </video>

        <div
          className={`absolute inset-0 bg-gradient-to-t from-black/90 via-black/10 to-transparent transition-opacity duration-300 ${
            showControls ? "opacity-100" : "opacity-0"
          }`}
        >
          <div className="absolute bottom-0 left-0 right-0 p-6 space-y-3">
            <Slider
              value={[currentTime]}
              max={duration || 100}
              step={0.1}
              onValueChange={handleSeek}
              className="cursor-pointer"
            />

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={togglePlay}
                  className="text-white hover:bg-white/10 h-9 w-9 rounded-full"
                >
                  {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
                </Button>

                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => skip(-10)}
                  className="text-white hover:bg-white/10 rounded-full h-8 w-8"
                >
                  <SkipBack className="h-4 w-4" />
                </Button>

                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => skip(10)}
                  className="text-white hover:bg-white/10 rounded-full h-8 w-8"
                >
                  <SkipForward className="h-4 w-4" />
                </Button>

                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={toggleMute}
                    className="text-white hover:bg-white/10 rounded-full h-8 w-8"
                  >
                    {isMuted || volume === 0 ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                  </Button>
                  <div className="w-20">
                    <Slider
                      value={[isMuted ? 0 : volume]}
                      max={1}
                      step={0.01}
                      onValueChange={handleVolumeChange}
                      className="cursor-pointer"
                    />
                  </div>
                </div>

                <span className="text-white text-xs font-mono bg-black/30 px-2.5 py-1 rounded-full backdrop-blur-sm">
                  {formatTime(currentTime)} / {formatTime(duration)}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="text-white hover:bg-white/10 rounded-full h-8 w-8">
                      {videoSize === "fit" ? <Maximize2 className="h-4 w-4" /> : <Minimize2 className="h-4 w-4" />}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem onClick={() => setVideoSize("fit")}>Fit to Screen</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setVideoSize("fill")}>Fill Screen</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setVideoSize("original")}>Original Size</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="text-white hover:bg-white/10 rounded-full h-8 w-8">
                      <Settings className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem onClick={() => changePlaybackRate(0.5)}>0.5x Speed</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => changePlaybackRate(0.75)}>0.75x Speed</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => changePlaybackRate(1)}>Normal Speed</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => changePlaybackRate(1.25)}>1.25x Speed</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => changePlaybackRate(1.5)}>1.5x Speed</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => changePlaybackRate(2)}>2x Speed</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>

                <Button
                  variant="ghost"
                  size="icon"
                  onClick={toggleFullscreen}
                  className="text-white hover:bg-white/10 rounded-full h-8 w-8"
                >
                  <Maximize className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  )
}
