import { useEffect } from 'react'

export const BlockEq = ({
  eq,
  children,
  className,
  tooltip
}: {
  eq?: string
  children?: React.ReactNode
  className?: string
  tooltip?: string
}) => {
  useEffect(() => {
    const MathJax = window.MathJax
    if (typeof MathJax !== 'undefined') {
      MathJax.typesetClear()
      MathJax.typeset()
    }
  }, [eq])
  // return <div>$${math}$$</div>
  const texExpression = (eq || children || '').toString()
  return (
    <div className={className} title={tooltip}>
      {'\\[' + texExpression + '\\]'}
    </div>
  )
}

export const InlineEq = ({
  eq,
  children,
  className,
  tooltip
}: {
  eq?: string
  children?: React.ReactNode
  className?: string
  tooltip?: string
}) => {
  useEffect(() => {
    const MathJax = window.MathJax
    if (typeof MathJax !== 'undefined') {
      MathJax.typesetClear()
      MathJax.typeset()
    }
  }, [eq, children])
  const texExpression = (eq || children || '').toString()

  return (
    <span className={className + ' inline'} title={tooltip}>
      {'\\(' + texExpression + '\\)'}
    </span>
  )
}
