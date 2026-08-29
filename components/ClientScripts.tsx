'use client'

import { useEffect } from 'react'

interface ClientScriptsProps {
  scripts: string[]
}

export function ClientScripts({ scripts }: ClientScriptsProps) {
  useEffect(() => {
    const appended: HTMLScriptElement[] = []
    for (const src of scripts) {
      const s = document.createElement('script')
      s.src = src
      document.body.appendChild(s)
      appended.push(s)
    }
    return () => {
      for (const s of appended) {
        if (document.body.contains(s)) document.body.removeChild(s)
      }
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps
  return null
}
