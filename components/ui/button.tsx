import * as React from "react"

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'outline' | 'ghost'
  size?: 'default' | 'sm' | 'lg'
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = "", variant = "default", size = "default", asChild = false, ...props }, ref) => {
    const baseStyles = "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
    
    const variants = {
      default: "bg-[#283782] text-white hover:bg-[#1e2a61] focus-visible:ring-[#283782]",
      outline: "border border-gray-300 bg-white hover:bg-gray-50 text-[#0e172a] focus-visible:ring-gray-400",
      ghost: "hover:bg-gray-100 text-[#0e172a] focus-visible:ring-gray-400"
    }
    
    const sizes = {
      default: "h-10 px-4 py-2",
      sm: "h-9 rounded-md px-3",
      lg: "h-12 rounded-md px-8 text-base"
    }

    const classes = `${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`

    if (asChild) {
      return <span className={classes} {...props} />
    }

    return (
      <button
        className={classes}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button }
