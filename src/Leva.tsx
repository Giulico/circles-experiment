import { useControls } from "leva";
import { ReactNode, createContext, useState } from "react";

export type Controls = {
  minRadius: number;
  maxRadius: number;
  totalCircles: number;
  intersection: number;
  colorRange: [number, number];
  paddingFactor: number;
};

const initialValues: Controls = {
  minRadius: 30,
  maxRadius: 500,
  totalCircles: 50,
  intersection: 0.2,
  colorRange: [-0.3, 0.3],
  paddingFactor: 0,
};

export const LevaContext = createContext<Controls>(initialValues);

function Leva({ children }: { children: ReactNode }) {
  const [state, setState] = useState<Controls>(initialValues);

  useControls({
    minRadius: {
      value: initialValues.minRadius,
      min: 2,
      max: 500,
      step: 1,
      onEditEnd: (val) => {
        setState((s) => ({ ...s, minRadius: val }));
      },
    },
    maxRadius: {
      value: initialValues.maxRadius,
      min: 2,
      max: 1000,
      step: 1,
      onEditEnd: (val) => {
        setState((s) => ({ ...s, maxRadius: val }));
      },
    },
    totalCircles: {
      value: initialValues.totalCircles,
      min: 1,
      max: 500,
      step: 1,
      onEditEnd: (val) => {
        setState((s) => ({ ...s, totalCircles: val }));
      },
    },
    intersection: {
      value: initialValues.intersection,
      min: 0,
      max: 1,
      step: 0.01,
      onEditEnd: (val) => {
        setState((s) => ({ ...s, intersection: val }));
      },
    },
    colorRange: {
      value: initialValues.colorRange,
      min: -1,
      max: 1,
      step: 0.01,
      onEditEnd: (val) => {
        setState((s) => ({ ...s, colorRange: val }));
      },
    },
    paddingFactor: {
      value: initialValues.paddingFactor,
      min: 0,
      max: 200,
      step: 1,
      onEditEnd: (val) => {
        setState((s) => ({ ...s, paddingFactor: val }));
      },
    },
  });

  return <LevaContext.Provider value={state}>{children}</LevaContext.Provider>;
}

export default Leva;
