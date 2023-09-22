import { useEffect } from 'react'

const resetMathJax = () => {
  try {
    const MathJax = window.MathJax
    if (typeof MathJax !== 'undefined' && MathJax.typesetClear && MathJax.typeset) {
      MathJax.typesetClear()
      MathJax.typeset()
    }
  } catch (error) {
    console.info('Nothing to reset')
  }
}

export const BlockEq = ({
  eq = '',
  className,
  tooltip
}: {
  eq?: string
  className?: string
  tooltip?: string
}) => {
  useEffect(() => {
    resetMathJax()
  }, [eq])
  return (
    <div className={className} title={tooltip}>
      {'\\[' + eq + '\\]'}
    </div>
  )
}

export const InlineEq = ({
  eq = '',
  className,
  tooltip
}: {
  eq?: string
  className?: string
  tooltip?: string
}) => {
  useEffect(() => {
    resetMathJax()
  }, [eq])
  return (
    <span className={className + ' inline'} title={tooltip}>
      {'\\(' + eq + '\\)'}
    </span>
  )
}
