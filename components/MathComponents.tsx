import React from 'react'

// Mathematical Symbol Decorations Component
export const MathSymbolDecorations = () => {
  return (
    <>
      <div className="math-symbol-decoration symbol-1">∑</div>
      <div className="math-symbol-decoration symbol-2">∫</div>
      <div className="math-symbol-decoration symbol-3">π</div>
    </>
  )
}

// Equation-style Heading Component
interface EquationHeadingProps {
  children: React.ReactNode
  level?: 1 | 2 | 3 | 4 | 5 | 6
  className?: string
}

export const EquationHeading: React.FC<EquationHeadingProps> = ({ 
  children, 
  level = 2, 
  className = '' 
}) => {
  const HeadingTag = `h${level}` as keyof JSX.IntrinsicElements
  
  return (
    <HeadingTag className={`equation-heading text-gray-900 font-bold ${className}`}>
      {children}
    </HeadingTag>
  )
}

// Mathematical Section Divider
interface EquationDividerProps {
  symbol?: string
}

export const EquationDivider: React.FC<EquationDividerProps> = ({ symbol = '=' }) => {
  return (
    <div className="equation-divider">
      <span>{symbol}</span>
    </div>
  )
}

// Mathematical Background Container
interface MathBackgroundProps {
  children: React.ReactNode
  className?: string
}

export const MathBackground: React.FC<MathBackgroundProps> = ({ 
  children, 
  className = '' 
}) => {
  return (
    <div className={`math-symbol-bg ${className}`}>
      <MathSymbolDecorations />
      {children}
    </div>
  )
}

// Mathematical Text Component
interface MathTextProps {
  children: React.ReactNode
  className?: string
}

export const MathText: React.FC<MathTextProps> = ({ children, className = '' }) => {
  return (
    <span className={`font-math ${className}`}>
      {children}
    </span>
  )
}

// Large Mathematical Symbol Component
interface MathSymbolProps {
  symbol: string
  size?: 'sm' | 'md' | 'lg' | 'xl'
  className?: string
}

export const MathSymbol: React.FC<MathSymbolProps> = ({ 
  symbol, 
  size = 'md', 
  className = '' 
}) => {
  const sizeClasses = {
    sm: 'text-4xl',
    md: 'text-6xl',
    lg: 'text-8xl',
    xl: 'text-9xl'
  }
  
  return (
    <span className={`font-math text-red-600 font-bold ${sizeClasses[size]} ${className}`}>
      {symbol}
    </span>
  )
}
