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
