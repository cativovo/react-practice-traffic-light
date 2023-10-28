import { useCallback, useEffect, useState } from "react";
import { sleep } from "../utils/sleep";
import { TrafficLightState } from "../enums";

type TrafficLightProps = {
  trafficLightState?: TrafficLightState;
};

const GO_DURATION = 5000;
const SLOW_DURATION = 3000;
const STOP_DURATION = 4000;

const TrafficLight = ({
  trafficLightState = TrafficLightState.Go,
}: TrafficLightProps): JSX.Element => {
  const [state, setState] = useState(trafficLightState);

  const transition = useCallback(
    async (currentState: TrafficLightState): Promise<void> => {
      switch (currentState) {
        case TrafficLightState.Go:
          await sleep(GO_DURATION);
          setState(TrafficLightState.Slow);
          break;
        case TrafficLightState.Slow:
          await sleep(SLOW_DURATION);
          setState(TrafficLightState.Stop);
          break;
        case TrafficLightState.Stop:
          await sleep(STOP_DURATION);
          setState(TrafficLightState.Go);
          break;
        default:
          throw new Error(`${currentState} is an invalid TrafficLightState`);
      }
    },
    [],
  );

  useEffect(() => {
    transition(state);
  }, [state, transition]);

  return (
    <div className="traffic-light">
      {Object.keys(TrafficLightState).map((key) => (
        <div
          className={`traffic-light light ${
            key === state ? state.toLowerCase() : ""
          }`.trim()}
          key={key}
        />
      ))}
    </div>
  );
};

export default TrafficLight;
