import LinearRegressionCalculator from '@/components/LinearRegressionCalculator'

const Home = () => {
  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center gap-y-4 px-2 py-4">
      <header className="flex flex-col items-center justify-center">
        <h1 className="text-4xl font-bold">Regression Lab</h1>
        <h2 className="text-lg">Linear Regression Calculator</h2>
      </header>
      <main className="mx-auto flex flex-1 flex-col items-center justify-center text-center">
        <LinearRegressionCalculator />
      </main>
      <footer className="w-full pt-6 text-center">
        Made with 💪 by&nbsp;
        <a
          href="https://www.jhordyess.com"
          target="_blank"
          className="text-blue-500 hover:underline"
        >
          Jhordyess
        </a>
        <br />
        👉&nbsp;
        <a
          href="https://github.com/jhordyess/regression-lab"
          target="_blank"
          className="text-blue-500 hover:underline"
        >
          View on GitHub
        </a>
      </footer>
    </div>
  )
}

export default Home
