import moment from "moment";
import momentDurationFormatSetup from "moment-duration-format";

momentDurationFormatSetup(moment);

const TimeLeft = (props) => {
  const formattedTimeLeft = moment
    .duration(props.timeLeft, "s")
    .format("mm.ss", { trim: false });
  return (
    <div className="time-display">
      <p>{props.currentSessionType}</p>
      <p>{formattedTimeLeft}</p>
      <button onClick={props.handleStartStopClick}>
        {props.isStarted ? "Pause" : "Start"}
      </button>
    </div>
  );
};

export default TimeLeft;
