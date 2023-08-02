import { useMemo } from "react";
import "./App.css";
import Canvas from "./Canvas";
import Leva from "./Leva";

const CANVAS_AMOUNT = 20;

function App() {
  const arr = useMemo(() => Array.from(Array(CANVAS_AMOUNT), (_, i) => i), []);

  return (
    <>
      <Leva>
        <div style={{ textAlign: "left" }}>
          <h2>Change the parameters in the dialog →</h2>
          <pre>
            <code>
              minRadius: controls how small a circle can be
              <br />
              maxRadius: controls how big a circle can be
              <br />
              totalCircles: the numbers of circles
              <br />
              intersection: percentage (0 to 1) of how much a circle can
              intersect another circle. 1 is equivalent to the radius of the
              second circle
              <br />
              colorRange: primary color will be randomly lightned or darkned
              within this range
            </code>
          </pre>

          <h3>These are 20 canvas generated with the current parameters:</h3>
        </div>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 16,
          }}
        >
          {arr.map((i) => (
            <Canvas key={i} />
          ))}
        </div>
      </Leva>
    </>
  );
}

export default App;
