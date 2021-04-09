import moment from "moment";

const Session = (props) => {
  const sessionLengthInMinutes = moment
    .duration(props.sessionLength, "s")
    .minutes();
  return (
    <div>
      <p>Session</p>
      <p>{sessionLengthInMinutes} min</p>
      <button onClick={props.incrementSessionLength}>+</button>
      <button onClick={props.decrementSessionLength}>-</button>
    </div>
  );
};

export default Session;
