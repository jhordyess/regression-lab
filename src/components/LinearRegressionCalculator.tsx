import { useState, useEffect, type ChangeEvent, useRef, useCallback } from 'react'
import {
  Chart as ChartJS,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  ScatterController,
  LineController
} from 'chart.js'
import { BlockEq, InlineEq } from './MathJax'
import { color, parseCSV } from '@/utils'
import UploadBtn from './UploadBtn'
import DownloadBtn from './DownloadBtn'

type Row = {
  x: number
  y: number
}

ChartJS.register(
  // Global
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
  // For line chart
  LineController,
  LineElement,
  // For scatter chart
  ScatterController
)

function LinearRegressionCalculator() {
  const [data, setData] = useState<Row[]>([])
  const [regressionData, setRegressionData] = useState<Row[]>([])
  const [a, setA] = useState<number>(NaN)
  const [b, setB] = useState<number>(NaN)
  const [xInput, setXInput] = useState('')
  const [yOutput, setYOutput] = useState<number>(NaN)

  const canvasRef = useRef<HTMLCanvasElement>(null)
  const chartRef = useRef<ChartJS | null>()

  const renderChart = useCallback(() => {
    if (!canvasRef.current) return

    chartRef.current = new ChartJS(canvasRef.current, {
      data: {
        datasets: [
          {
            type: 'scatter',
            label: 'Data',
            data,
            borderColor: '#4bc0c0',
            backgroundColor: '#4bc0c033'
          },
          {
            type: 'line',
            label: 'Regression Line',
            data: regressionData,
            borderColor: '#ff6384',
            backgroundColor: '#ff638433'
          }
        ]
      },
      options: {
        scales: {
          x: {
            type: 'linear',
            position: 'bottom'
          }
        }
      }
    })
  }, [data, regressionData])

  const destroyChart = () => {
    if (chartRef.current) {
      chartRef.current.destroy()
      chartRef.current = null
    }
  }

  const fetchData = async () => {
    try {
      const response = await fetch('data.csv')
      const text = await response.text()
      const data = await parseCSV(text)
      setData(data.map(row => ({ x: parseFloat(row[0]), y: parseFloat(row[1]) })))
    } catch (error) {
      console.warn('Error fetching data')
    }
  }

  const handleCSV = (rows: string[][]) => {
    const data = rows.map(row => ({ x: parseFloat(row[0]), y: parseFloat(row[1]) }))
    setData(data)
  }

  useEffect(() => {
    fetchData()
  }, [])

  useEffect(() => {
    destroyChart()
    renderChart()
  }, [renderChart])

  useEffect(() => {
    if (data.length > 0) {
      const sumX = data.reduce((acc, point) => acc + point.x, 0)
      const sumY = data.reduce((acc, point) => acc + point.y, 0)
      const sumXY = data.reduce((acc, point) => acc + point.x * point.y, 0)
      const sumXSquare = data.reduce((acc, point) => acc + point.x ** 2, 0)
      const n = data.length

      const aVal = (n * sumXY - sumX * sumY) / (n * sumXSquare - sumX ** 2)
      const bVal = (sumY - aVal * sumX) / n

      setA(aVal)
      setB(bVal)

      const regressionData = data
        .map(point => ({ x: point.x, y: aVal * point.x + bVal }))
        .sort((a, b) => a.x - b.x)
      const firstPoint = regressionData[0]
      const lastPoint = regressionData[regressionData.length - 1]
      setRegressionData([firstPoint, lastPoint])
    }
  }, [data])

  const handleXInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setXInput(e.target.value)
  }

  const calculateYValue = () => {
    if (a !== null && b !== null) {
      const x = parseFloat(xInput)
      const y = a * x + b
      setYOutput(y)
    }
  }

  return (
    <>
      <section className="w-full">
        <canvas
          ref={canvasRef}
          className="h-96 w-full min-w-[300px] max-w-md sm:max-w-lg lg:max-w-2xl"
        />
      </section>

      <section>
        <BlockEq eq={`Y = ${color('a', 'red')} ${color('X', 'green')} + ${color('b', 'orange')}`} />
      </section>

      <section className="flex flex-col gap-y-2">
        <div className="flex items-center justify-center">
          <InlineEq eq={color('a', 'red') + ' = '} />
          <output
            className="ml-2 inline-flex h-8 w-24 select-none items-center justify-center rounded-md border border-gray-400 px-2 hover:border-blue-500"
            title="The slope 'a' computed from the data"
          >
            {a ? a.toFixed(2) : ''}
          </output>
        </div>
        <div className="flex items-center justify-center">
          <InlineEq eq={color('b', 'orange') + ' = '} />
          <output
            className="ml-2 inline-flex h-8 w-24 select-none items-center justify-center rounded-md border border-gray-400 px-2 hover:border-blue-500"
            title='The intercept "b" computed from the data'
          >
            {b ? b.toFixed(2) : ''}
          </output>
        </div>
      </section>

      <hr className="mx-auto my-4 w-64 border-gray-400" />

      <section className="flex flex-col justify-center gap-y-2">
        <div className="flex items-center justify-center">
          <InlineEq eq={color('X', 'green') + ' ='} />
          <input
            // type="number"
            value={xInput}
            onChange={handleXInputChange}
            className="ml-2 inline-block h-8 w-24 rounded-md border border-gray-400 px-2 text-center outline-none hover:border-blue-500 focus:border-blue-500 active:border-blue-500"
            onKeyUp={calculateYValue}
            title="The value of X for which you want to predict Y"
          />
        </div>
        <div className="flex items-center justify-center">
          <InlineEq eq={'Y = '} />
          <output
            className="ml-2 inline-flex h-8 w-24 select-none items-center justify-center rounded-md border border-gray-400 px-2 hover:border-blue-500"
            title="The predicted value of Y for the given X"
          >
            {yOutput ? yOutput.toFixed(2) : ''}
          </output>
        </div>
      </section>

      <section className="mt-8 flex flex-col items-center justify-center gap-y-4">
        <h3 className="text-lg font-bold">Update data</h3>
        <p className="text-sm text-gray-500">
          Update your data by uploading a CSV file with the same format as the template.
        </p>
        <UploadBtn
          className="rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
          handleCSV={handleCSV}
        >
          Update data
        </UploadBtn>
      </section>

      <section className="mt-8 flex flex-col items-center justify-center gap-y-4">
        <h3 className="text-lg font-bold">Download template</h3>
        <p className="text-sm text-gray-500">
          Download the template, fill it with your data and upload it later.
        </p>
        <DownloadBtn
          url="data.csv"
          filename="data.csv"
          className="rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
        >
          Download template
        </DownloadBtn>
      </section>
    </>
  )
}

export default LinearRegressionCalculator
