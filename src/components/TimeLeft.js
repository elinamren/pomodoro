import { useEffect, useState } from "react";
import moment from "moment";
import momentDurationFormatSetup from "moment-duration-format";

momentDurationFormatSetup(moment);

const TimeLeft = (props) => {
  const [intervalId, setIntervalId] = useState(null);
  const [timeLeft, setTimeLeft] = useState(props.sessionLength);

  useEffect(() => {
    setTimeLeft(props.sessionLength);
  }, [props.sessionLength]);

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
        });
      }, 10);
      setIntervalId(newIntervalId);
    }
  };

  const formattedTimeLeft = moment
    .duration(timeLeft, "s")
    .format("mm.ss", { trim: false });
  return (
    <div className="time-display">
      <p>{formattedTimeLeft}</p>
      <button onClick={handleStartStopClick}>
        {isStarted ? "Pause" : "Start"}
      </button>
    </div>
  );
};

export default TimeLeft;
