"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ZoomIn, ZoomOut, Download, FileText, ExternalLink, AlertCircle } from "lucide-react"

interface PdfViewerProps {
  url: string
  fileName: string
}

export function PdfViewer({ url, fileName }: PdfViewerProps) {
  const [zoom, setZoom] = useState(100)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const handleZoomIn = () => setZoom((prev) => Math.min(prev + 25, 200))
  const handleZoomOut = () => setZoom((prev) => Math.max(prev - 25, 50))

  const handleDownload = () => {
    const a = document.createElement("a")
    a.href = url
    a.download = fileName
    a.click()
    console.log("[v0] PDF download initiated:", fileName)
  }

  const handleOpenInNewTab = () => {
    window.open(url, "_blank")
    console.log("[v0] PDF opened in new tab:", url)
  }

  const handleIframeLoad = () => {
    console.log("[v0] PDF iframe loaded successfully")
    setIsLoading(false)
    setError(null)
  }

  const handleIframeError = () => {
    console.error("[v0] PDF iframe loading error")
    setError("PDF display error. Use the buttons below to open or download.")
    setIsLoading(false)
  }

  return (
    <div className="space-y-4">
      {/* Toolbar */}
      <Card className="p-4">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Button variant="outline" size="icon" onClick={handleZoomOut} disabled={zoom <= 50}>
                <ZoomOut className="h-4 w-4" />
              </Button>
              <span className="text-sm font-medium w-16 text-center">{zoom}%</span>
              <Button variant="outline" size="icon" onClick={handleZoomIn} disabled={zoom >= 200}>
                <ZoomIn className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="outline" onClick={handleOpenInNewTab}>
              <ExternalLink className="h-4 w-4 mr-2" />
              Open in New Tab
            </Button>
            <Button variant="outline" onClick={handleDownload}>
              <Download className="h-4 w-4 mr-2" />
              Download
            </Button>
          </div>
        </div>
      </Card>

      {isLoading && !error && (
        <Card className="p-12">
          <div className="text-center space-y-3">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
            <p className="text-sm text-muted-foreground">Loading PDF...</p>
          </div>
        </Card>
      )}

      {error && (
        <Card className="p-12 bg-destructive/10 border-destructive/20">
          <div className="text-center space-y-4">
            <AlertCircle className="h-12 w-12 text-destructive mx-auto" />
            <div>
              <p className="text-lg font-medium text-destructive">{error}</p>
              <p className="text-sm text-muted-foreground mt-2">Use the buttons above to open or download the PDF.</p>
            </div>
          </div>
        </Card>
      )}

      <Card className="overflow-hidden">
        <div className="bg-muted/20 min-h-[800px] flex items-center justify-center p-4">
          <div
            style={{
              width: `${zoom}%`,
              maxWidth: "100%",
            }}
            className="w-full"
          >
            <iframe
              src={`${url}#toolbar=1&navpanes=1&scrollbar=1&view=FitH`}
              className="w-full h-[800px] rounded-lg border border-border bg-white"
              title={fileName}
              onLoad={handleIframeLoad}
              onError={handleIframeError}
            />
          </div>
        </div>
      </Card>

      {/* Note about PDF viewing */}
      <Card className="p-4 bg-muted/50">
        <div className="flex items-start gap-3">
          <FileText className="h-5 w-5 text-muted-foreground mt-0.5" />
          <div className="space-y-1">
            <p className="text-sm font-medium">PDF Viewer</p>
            <p className="text-sm text-muted-foreground">
              {"If the PDF doesn't display properly, use the 'Open in New Tab' or 'Download' buttons above."}
            </p>
          </div>
        </div>
      </Card>
    </div>
  )
}
