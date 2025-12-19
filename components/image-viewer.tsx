"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { ZoomIn, ZoomOut, RotateCw, Download, Maximize2, Minimize2 } from "lucide-react"

interface ImageViewerProps {
  url: string
  fileName: string
}

export function ImageViewer({ url, fileName }: ImageViewerProps) {
  const [zoom, setZoom] = useState(100)
  const [rotation, setRotation] = useState(0)
  const [fitMode, setFitMode] = useState<"fit" | "fill" | "original">("fit")

  const handleZoomIn = () => setZoom((prev) => Math.min(prev + 25, 400))
  const handleZoomOut = () => setZoom((prev) => Math.max(prev - 25, 25))
  const handleRotate = () => setRotation((prev) => (prev + 90) % 360)

  const handleDownload = () => {
    const a = document.createElement("a")
    a.href = url
    a.download = fileName
    a.click()
  }

  const toggleFitMode = () => {
    const modes: Array<"fit" | "fill" | "original"> = ["fit", "fill", "original"]
    const currentIndex = modes.indexOf(fitMode)
    setFitMode(modes[(currentIndex + 1) % modes.length])
  }

  const getImageClass = () => {
    if (fitMode === "fit") return "object-contain"
    if (fitMode === "fill") return "object-cover"
    return "object-none"
  }

  return (
    <div className="space-y-4">
      {/* Toolbar */}
      <Card className="p-4 border-border/50 bg-card/50 backdrop-blur-sm">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="icon"
                onClick={handleZoomOut}
                className="rounded-full h-9 w-9 bg-transparent"
              >
                <ZoomOut className="h-4 w-4" />
              </Button>
              <div className="w-28">
                <Slider value={[zoom]} min={25} max={400} step={25} onValueChange={(value) => setZoom(value[0])} />
              </div>
              <Button
                variant="outline"
                size="icon"
                onClick={handleZoomIn}
                className="rounded-full h-9 w-9 bg-transparent"
              >
                <ZoomIn className="h-4 w-4" />
              </Button>
              <span className="text-xs font-medium font-mono w-14">{zoom}%</span>
            </div>

            <Button
              variant="outline"
              size="icon"
              onClick={handleRotate}
              className="rounded-full h-9 w-9 bg-transparent"
            >
              <RotateCw className="h-4 w-4" />
            </Button>

            <Button
              variant="outline"
              size="icon"
              onClick={toggleFitMode}
              className="rounded-full h-9 w-9 bg-transparent"
            >
              {fitMode === "fit" ? <Maximize2 className="h-4 w-4" /> : <Minimize2 className="h-4 w-4" />}
            </Button>
          </div>

          <Button variant="outline" onClick={handleDownload} className="rounded-full bg-transparent">
            <Download className="h-4 w-4 mr-2" />
            Download
          </Button>
        </div>
      </Card>

      {/* Image Display */}
      <Card className="overflow-hidden bg-muted/20 border-border/50">
        <div className="flex items-center justify-center min-h-[600px] p-6">
          <img
            src={url || "/placeholder.svg"}
            alt={fileName}
            className={`max-w-full max-h-[600px] transition-transform duration-300 ${getImageClass()}`}
            style={{
              transform: `rotate(${rotation}deg) scale(${zoom / 100})`,
            }}
          />
        </div>
      </Card>
    </div>
  )
}
