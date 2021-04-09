import "./App.css";
import Break from "./components/Break";
import Header from "./components/Header";
import Session from "./components/Session";
import { useState } from "react";
import TimeLeft from "./components/TimeLeft";

function App() {
  const [sessionLength, setSessionLength] = useState(1500);

  function decrementSessionLength() {
    const newSessionLength = sessionLength - 60;
    if (newSessionLength < 0) {
      setSessionLength(0);
    } else {
      setSessionLength(newSessionLength);
    }
  }

  function incrementSessionLength() {
    setSessionLength(sessionLength + 60);
  }

  const [breakLength, setBreakLength] = useState(300);

  function decrementBreakLength() {
    const newBreakLength = breakLength - 60;
    if (newBreakLength < 0) {
      setBreakLength(0);
    } else {
      setBreakLength(newBreakLength);
    }
  }

  function incrementBreakLength() {
    setBreakLength(breakLength + 60);
  }

  return (
    <div className="App">
      <Header />
      <main>
        <TimeLeft sessionLength={sessionLength} />
        <div className="time-picker">
          <Session
            sessionLength={sessionLength}
            incrementSessionLength={incrementSessionLength}
            decrementSessionLength={decrementSessionLength}
          />
          <Break
            breakLength={breakLength}
            incrementBreakLength={incrementBreakLength}
            decrementBreakLength={decrementBreakLength}
          />
        </div>
        <p>♫</p>
      </main>
    </div>
  );
}

export default App;
