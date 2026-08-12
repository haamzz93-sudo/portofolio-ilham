"use client"

import React from "react"
import { ArrowRight } from "lucide-react"

export interface InteractiveHoverButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text?: string
}

export const InteractiveHoverButton = React.forwardRef<
  HTMLButtonElement,
  InteractiveHoverButtonProps
>(({ text = "Button", onClick, className, ...props }, ref) => {
  return (
    <button
      ref={ref}
      onClick={onClick}
      className={className}
      style={{
        position: 'relative',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '44px',
        minWidth: '160px',
        padding: '0 24px',
        borderRadius: '9999px',
        border: '1px solid rgba(77, 168, 218, 0.35)',
        background: 'rgba(8, 9, 10, 0.9)',
        color: '#FFFFFF',
        fontWeight: 600,
        fontSize: '0.875rem',
        cursor: 'pointer',
        overflow: 'hidden',
        transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
        boxShadow: '0 2px 12px rgba(0,0,0,0.4)',
      }}
      onMouseEnter={(e) => {
        const btn = e.currentTarget
        const span = btn.querySelector('.ihb-text') as HTMLElement
        const overlay = btn.querySelector('.ihb-overlay') as HTMLElement
        if (span) { span.style.transform = 'translateX(-120%)'; span.style.opacity = '0' }
        if (overlay) { overlay.style.transform = 'translateX(0)'; overlay.style.opacity = '1' }
        btn.style.borderColor = 'rgba(77,168,218,0.8)'
        btn.style.boxShadow = '0 4px 20px rgba(77,168,218,0.3)'
      }}
      onMouseLeave={(e) => {
        const btn = e.currentTarget
        const span = btn.querySelector('.ihb-text') as HTMLElement
        const overlay = btn.querySelector('.ihb-overlay') as HTMLElement
        if (span) { span.style.transform = 'translateX(0)'; span.style.opacity = '1' }
        if (overlay) { overlay.style.transform = 'translateX(120%)'; overlay.style.opacity = '0' }
        btn.style.borderColor = 'rgba(77,168,218,0.35)'
        btn.style.boxShadow = '0 2px 12px rgba(0,0,0,0.4)'
      }}
      {...props}
    >
      {/* Default text */}
      <span
        className="ihb-text"
        style={{
          transition: 'transform 0.3s ease, opacity 0.3s ease',
          transform: 'translateX(0)',
          opacity: 1,
          whiteSpace: 'nowrap',
        }}
      >
        {text}
      </span>

      {/* Hover overlay — starts hidden OFF screen to the right */}
      <span
        className="ihb-overlay"
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '6px',
          background: 'linear-gradient(135deg, #4DA8DA, #6BC0F0)',
          borderRadius: '9999px',
          transform: 'translateX(120%)',
          opacity: 0,
          transition: 'transform 0.3s ease, opacity 0.3s ease',
          whiteSpace: 'nowrap',
          fontWeight: 700,
        }}
      >
        {text}
        <ArrowRight size={15} />
      </span>
    </button>
  )
})

InteractiveHoverButton.displayName = "InteractiveHoverButton"
