"use client"

import { VideoPlayer } from "@/components/video-player"
import { AudioPlayer } from "@/components/audio-player"
import { ImageViewer } from "@/components/image-viewer"
import { PdfViewer } from "@/components/pdf-viewer"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"

interface MediaPlayerProps {
  file: {
    name: string
    type: string
    url: string
    file: File
  }
  onClose: () => void
}

export function MediaPlayer({ file, onClose }: MediaPlayerProps) {
  const getFileType = () => {
    const fileName = file.name.toLowerCase()
    const fileType = file.type.toLowerCase()

    const videoExtensions = [".mp4", ".webm", ".ogg", ".mkv", ".avi", ".mov", ".wmv", ".flv", ".m4v"]
    if (fileType.startsWith("video/") || videoExtensions.some((ext) => fileName.endsWith(ext))) {
      return "video"
    }

    const audioExtensions = [".mp3", ".wav", ".ogg", ".m4a", ".aac", ".flac", ".wma"]
    if (fileType.startsWith("audio/") || audioExtensions.some((ext) => fileName.endsWith(ext))) {
      return "audio"
    }

    const imageExtensions = [".jpg", ".jpeg", ".png", ".gif", ".webp", ".bmp", ".svg"]
    if (fileType.startsWith("image/") || imageExtensions.some((ext) => fileName.endsWith(ext))) {
      return "image"
    }

    if (fileType === "application/pdf" || fileName.endsWith(".pdf")) {
      return "pdf"
    }

    return "unknown"
  }

  const renderPlayer = () => {
    const type = getFileType()

    switch (type) {
      case "video":
        return <VideoPlayer url={file.url} fileName={file.name} fileObject={file.file} />
      case "audio":
        return <AudioPlayer url={file.url} fileName={file.name} />
      case "image":
        return <ImageViewer url={file.url} fileName={file.name} />
      case "pdf":
        return <PdfViewer url={file.url} fileName={file.name} />
      default:
        return (
          <div className="text-center p-12 space-y-2">
            <p className="text-lg font-medium">Unsupported file type</p>
            <p className="text-sm text-muted-foreground">File: {file.name}</p>
            <p className="text-sm text-muted-foreground">Type: {file.type || "unknown"}</p>
          </div>
        )
    }
  }

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center justify-between gap-4">
        <div className="flex-1 min-w-0 space-y-1">
          <h2 className="text-2xl font-semibold tracking-tight truncate">{file.name}</h2>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span className="px-2 py-0.5 rounded-md bg-primary/10 text-primary font-medium text-xs uppercase tracking-wide">
              {getFileType()}
            </span>
            <span className="text-xs">{file.type || "Detected from extension"}</span>
          </div>
        </div>
        <Button variant="ghost" size="icon" onClick={onClose} className="shrink-0 rounded-full hover:bg-accent">
          <X className="h-5 w-5" />
        </Button>
      </div>
      {renderPlayer()}
    </div>
  )
}
