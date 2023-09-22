import { type FC } from 'react'

interface Props {
  url: string
  filename: string
  className?: string
  children?: React.ReactNode
}

const DownloadBtn: FC<Props> = ({ url, filename, className, children }) => {
  const handleDownload = async () => {
    try {
      const response = await fetch(url)
      const blob = await response.blob()
      const blobURL = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = blobURL
      a.download = filename
      a.click()
    } catch (error) {
      console.warn('Error downloading file')
    }
  }

  return (
    <button className={className} onClick={handleDownload}>
      {children}
    </button>
  )
}

export default DownloadBtn
