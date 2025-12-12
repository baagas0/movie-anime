"use client"

import { useEffect, useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Calendar, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"

const STORAGE_KEY = "otamovie_update_schedule_seen"

export function UpdateSchedulePopup() {
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    // Check if user has seen the popup today
    const checkShouldShow = () => {
      const lastSeen = localStorage.getItem(STORAGE_KEY)
      const today = new Date().toDateString()

      // Show popup if never seen or last seen was not today
      if (!lastSeen || lastSeen !== today) {
        setIsOpen(true)
      }
    }

    // Small delay to ensure smooth page load
    const timer = setTimeout(checkShouldShow, 500)
    return () => clearTimeout(timer)
  }, [])

  const handleClose = () => {
    setIsOpen(false)
    // Save today's date to localStorage
    const today = new Date().toDateString()
    localStorage.setItem(STORAGE_KEY, today)
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-md" showCloseButton={false}>
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl">
            <Calendar className="w-5 h-5 text-primary" />
            Jadwal Update Harian
          </DialogTitle>
          <DialogDescription className="pt-2">
            Informasi penting tentang jadwal update konten OtaMovie
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="flex items-start gap-3 p-4 bg-primary/10 rounded-lg border border-primary/20">
            <Clock className="w-5 h-5 text-primary shrink-0 mt-0.5" />
            <div className="flex-1">
              <h3 className="font-semibold text-foreground mb-1">Update Setiap Hari</h3>
              <p className="text-sm text-muted-foreground">
                Konten anime terbaru akan diupdate setiap hari pada pukul <span className="font-semibold text-primary">15:00 WIB</span>
              </p>
            </div>
          </div>

          <div className="text-sm text-muted-foreground space-y-2">
            <p>• Episode baru akan tersedia setiap hari</p>
            <p>• Pastikan untuk mengecek update terbaru</p>
            <p>• Nikmati streaming tanpa iklan</p>
          </div>
        </div>

        <div className="flex justify-end gap-2 pt-2">
          <Button onClick={handleClose} variant="default" className="w-full sm:w-auto">
            Mengerti
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

