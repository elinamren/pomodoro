import "./App.css";
import Break from "./components/Break";
import Header from "./components/Header";
import Session from "./components/Session";
import { useState, useEffect, useRef } from "react";
import TimeLeft from "./components/TimeLeft";

function App() {
  const audioTrack = useRef(null);
  const audioAlarm = useRef(null);
  const [sessionLength, setSessionLength] = useState(1500);
  const [currentSessionType, setCurrentSessionType] = useState("Session");
  const [intervalId, setIntervalId] = useState(null);
  const [timeLeft, setTimeLeft] = useState(sessionLength);

  useEffect(() => {
    setTimeLeft(sessionLength);
  }, [sessionLength]);

  const isStarted = intervalId !== null;
  const handleStartStopClick = () => {
    if (isStarted) {
      clearInterval(intervalId);
      setIntervalId(null);
    } else {
      const newIntervalId = setInterval(() => {
        setTimeLeft((prevTimeLeft) => {
          const newTimeLeft = prevTimeLeft - 1;
          if (newTimeLeft >= 0) {
            return newTimeLeft;
          }
          audioAlarm.current.play();

          if (currentSessionType === "Session") {
            setCurrentSessionType("Break");
            setTimeLeft(breakLength);
          } else if (currentSessionType === "Break") {
            setCurrentSessionType("Session");
            setTimeLeft(sessionLength);
            return;
          }
        });
      }, 10);
      setIntervalId(newIntervalId);
    }
  };
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

  function handleResetTime() {
    clearInterval(intervalId);
    setIntervalId(null);
    setCurrentSessionType("Session");
    setSessionLength(60 * 25);
    setBreakLength(60 * 5);
    setTimeLeft(60 * 25);
  }

  function handleMusic() {
    audioTrack.current.play();
    console.log("♫ play some music ♫");
    audioAlarm.current.play();
  }

  return (
    <div className="App">
      <Header />
      <main>
        <TimeLeft
          sessionLength={sessionLength}
          breakLength={breakLength}
          currentSessionType={currentSessionType}
          timeLeft={timeLeft}
          isStarted={isStarted}
          handleStartStopClick={handleStartStopClick}
        />
        <button onClick={handleResetTime}>Reset</button>
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
        <button onClick={handleMusic}>♫</button>
        <audio ref={audioAlarm}>
          <source
            src="https://onlineclock.net/sounds/?sound=Falling-Bomb"
            type="audio/wav"
          />
          <audio ref={audioTrack}>
            <source src="https://open.spotify.com/embed/track/62X7ld1sa8RHl4zRtSvfHf"></source>
          </audio>
        </audio>
      </main>
    </div>
  );
}

export default App;
