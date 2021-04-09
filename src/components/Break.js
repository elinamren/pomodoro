import moment from "moment";

const Break = (props) => {
  const breakLengthInMinutes = moment
    .duration(props.breakLength, "s")
    .minutes();
  return (
    <div>
      <p>Break</p>
      <p>{breakLengthInMinutes} min</p>
      <button onClick={props.incrementBreakLength}>+</button>
      <button onClick={props.decrementBreakLength}>-</button>
    </div>
  );
};

export default Break;
