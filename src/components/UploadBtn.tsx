import { parseCSV, readText } from '@/utils'
import { type ChangeEventHandler, useRef, type FC } from 'react'

export interface Props {
  className?: string
  children?: React.ReactNode
  handleCSV: (rows: string[][]) => void
}

const UploadBtn: FC<Props> = ({ className, children, handleCSV }) => {
  const inputRef = useRef<HTMLInputElement>(null)

  const handleClick = () => {
    inputRef.current?.click()
  }

  const handleOnChange: ChangeEventHandler<HTMLInputElement> = async e => {
    const file = e.target.files?.[0]
    if (!file) return
    try {
      const text = await readText(file)
      const csv = await parseCSV(text)
      if (!csv || !handleCSV) return
      handleCSV(csv)
    } catch (error) {
      console.warn('Error reading CSV file')
    }
  }

  return (
    <button className={className} onClick={handleClick}>
      {children}
      <input hidden type="file" accept=".csv" ref={inputRef} onChange={handleOnChange} />
    </button>
  )
}

export default UploadBtn
