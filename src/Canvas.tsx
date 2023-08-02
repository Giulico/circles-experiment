import { useContext, useEffect, useRef } from "react";
import CirclePacking from "./CirclePacking";
import { LevaContext } from "./Leva";

export default function Canvas() {
  const isFirstRender = useRef(true);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const circlePackingRef = useRef<CirclePacking>();
  const controls = useContext(LevaContext);

  useEffect(() => {
    if (isFirstRender.current) {
      circlePackingRef.current = new CirclePacking({
        canvas: canvasRef.current,
        ...controls,
      });
      isFirstRender.current = false;
    } else if (circlePackingRef.current) {
      circlePackingRef.current.update(controls);
    }
  }, [controls]);

  useEffect(() => {}, [controls]);

  return <canvas ref={canvasRef} />;
}
