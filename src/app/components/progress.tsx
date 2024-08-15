"use client"

import * as React from "react"

import { Progress } from "@/components/ui/progress"

export default function ProgressDemo() {
  const [progress, setProgress] = React.useState(0)

  React.useEffect(() => {
    const timer = setTimeout(() => setProgress(100), 20)
    return () => clearTimeout(timer)
  }, [])

  return <Progress  value={progress} className="w-[200%] relative top-[-70px] left-[-250px] right-0 h-[3.5px]" />
}
