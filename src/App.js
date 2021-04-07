import "./App.css";

function App() {
  const countDown = () => {
    console.log("clicked");
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Pomodoro Timer</h1>
      </header>
      <main>
        <h2>25:00</h2>
        <button onClick={countDown}>Start</button>
      </main>
    </div>
  );
}

export default App;
