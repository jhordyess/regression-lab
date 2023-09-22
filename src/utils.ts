import Papa from 'papaparse'

export const color = (txt: string, color: string) => '\\textcolor{' + color + '}{' + txt + '}'

export const readText = (file: File) =>
  new Promise<string>((resolve, reject) => {
    if (!file) {
      reject(new Error('No file'))
    }
    const reader = new FileReader()
    reader.onload = e => {
      const text = e.target?.result?.toString()
      if (!text) {
        reject(new Error('Cannot read file'))
      }
      resolve(text || '')
    }
    reader.readAsText(file)
  })

export const parseCSV = async (text: string) => {
  const data = Papa.parse<string[]>(text).data
  data.shift() // remove header
  data.pop() // remove last empty line
  return data
}
