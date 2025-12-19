"use client"

import type React from "react"
import { useCallback } from "react"
import { Card } from "@/components/ui/card"
import { Upload, Music, Video, FileText, ImageIcon } from "lucide-react"

interface FileUploaderProps {
  onFileSelect: (file: { name: string; type: string; url: string; file: File }) => void
}

export function FileUploader({ onFileSelect }: FileUploaderProps) {
  const handleFileChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0]
      if (!file) return

      const url = URL.createObjectURL(file)
      onFileSelect({
        name: file.name,
        type: file.type,
        url,
        file,
      })
    },
    [onFileSelect],
  )

  const fileTypes = [
    {
      icon: Video,
      label: "Video",
      accept: "video/*,.mkv,.avi,.mov,.wmv,.flv,.webm,.mp4,.m4v,.3gp,.ogv",
      color: "from-chart-1/10 to-chart-1/5",
      iconColor: "text-chart-1",
    },
    {
      icon: Music,
      label: "Audio",
      accept: "audio/*,.mp3,.wav,.ogg,.m4a,.flac,.aac,.wma",
      color: "from-chart-3/10 to-chart-3/5",
      iconColor: "text-chart-3",
    },
    {
      icon: ImageIcon,
      label: "Image",
      accept: "image/*",
      color: "from-chart-5/10 to-chart-5/5",
      iconColor: "text-chart-5",
    },
    {
      icon: FileText,
      label: "PDF",
      accept: "application/pdf",
      color: "from-destructive/10 to-destructive/5",
      iconColor: "text-destructive",
    },
  ]

  return (
    <div className="w-full max-w-3xl space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="text-center space-y-3">
        <h2 className="text-4xl md:text-5xl font-semibold tracking-tight text-balance">Your Media, Anywhere</h2>
        <p className="text-lg text-muted-foreground max-w-xl mx-auto text-balance">
          Play any video, audio, image or PDF with elegant simplicity
        </p>
      </div>

      <Card className="group border-2 border-dashed hover:border-primary/50 transition-all duration-500 bg-card/50 backdrop-blur-sm overflow-hidden">
        <label htmlFor="file-upload" className="cursor-pointer block">
          <div className="flex flex-col items-center gap-6 p-16 relative">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-chart-2/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative rounded-2xl bg-gradient-to-br from-primary/10 to-chart-2/10 p-6 group-hover:scale-110 transition-transform duration-500">
              <Upload className="h-10 w-10 text-primary" />
            </div>
            <div className="text-center space-y-2 relative">
              <p className="text-lg font-medium">Drop your file or click to browse</p>
              <p className="text-sm text-muted-foreground max-w-md">
                Supports MKV, MP4, AVI, MP3, WAV, JPG, PNG, PDF and more
              </p>
            </div>
          </div>
          <input
            id="file-upload"
            type="file"
            className="hidden"
            onChange={handleFileChange}
            accept="video/*,audio/*,image/*,application/pdf,.mkv,.avi,.mov,.wmv,.flv,.webm,.mp4,.m4v,.3gp,.ogv"
          />
        </label>
      </Card>

      <div className="grid grid-cols-4 gap-3">
        {fileTypes.map((type, index) => (
          <label key={type.label} htmlFor={`file-${type.label}`} className="cursor-pointer group">
            <Card
              className="p-5 hover:scale-105 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300 border-border/50 bg-card/50 backdrop-blur-sm"
              style={{ animationDelay: `${index * 80}ms` }}
            >
              <div className="flex flex-col items-center gap-3">
                <div
                  className={`rounded-xl bg-gradient-to-br ${type.color} p-3 group-hover:scale-110 transition-transform duration-300`}
                >
                  <type.icon className={`h-6 w-6 ${type.iconColor}`} />
                </div>
                <span className="font-medium text-sm">{type.label}</span>
              </div>
            </Card>
            <input
              id={`file-${type.label}`}
              type="file"
              className="hidden"
              onChange={handleFileChange}
              accept={type.accept}
            />
          </label>
        ))}
      </div>
    </div>
  )
}
