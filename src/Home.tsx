const Home = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <header className="flex flex-col items-center justify-center">
        <h1 className="text-4xl font-bold">Hello World!</h1>
      </header>
      <main className="flex flex-1 flex-col items-center justify-center px-20 text-center">
        Fugiat veniam cillum tempor ipsum sint quis in commodo sint mollit tempor.
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
        <a
          href="https://github.com/jhordyess/regression-lab"
          target="_blank"
          className="text-blue-500 hover:underline"
        >
          👉 View on GitHub
        </a>
      </footer>
    </div>
  )
}

export default Home
