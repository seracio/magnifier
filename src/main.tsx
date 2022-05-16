import "./styles.css";
import Magnifier from "./Magnifier";
import { StrictMode, useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import { interpolateSinebow, quantize, randomNormal } from "d3";

function App() {
  const [zoom, setZoom] = useState(4);
  const [size, setSize] = useState(30);

  const rects = useMemo(() => {
    const rand = randomNormal(45, 15);
    const palette = quantize(interpolateSinebow, 10);
    return Array(100)
      .fill(0)
      .map((v, i) => {
        return {
          x: rand(),
          y: rand(),
          width: 10,
          height: 10,
          fill: palette[i % 10],
        };
      });
  }, []);

  return (
    <div className="App">
      <h1>A magnifier test</h1>
      <form>
        <fieldset>
          <label htmlFor="zoom">Zoom:</label>
          <input
            onChange={(e) => setZoom(e.target.valueAsNumber)}
            type="range"
            id="zoom"
            name="zoom"
            min="1"
            max="8"
            defaultValue="4"
          />
          x{zoom}
        </fieldset>
        <fieldset>
          <label htmlFor="size">Size:</label>
          <input
            onChange={(e) => setSize(e.target.valueAsNumber)}
            type="range"
            id="size"
            name="size"
            min="10"
            max="50"
            defaultValue="30"
          />
          {size}
        </fieldset>
      </form>
      <svg
        preserveAspectRatio="xMidYMid meet"
        viewBox="0 0 100 100"
        id="playground-svg"
      >
        <g id="playground">
          {rects.map((rect, i) => {
            return <rect key={i} {...rect} />;
          })}
        </g>
        <Magnifier
          useId="playground"
          svgId="playground-svg"
          zoom={zoom}
          size={size}
          attrs={{
            strokeWidth: 0.5,
            style: {
              filter: "drop-shadow( 3px 3px 2px rgba(0, 0, 0, .7))",
            },
          }}
        />
      </svg>
    </div>
  );
}

const rootElement = document.getElementById("root");
const root = createRoot(rootElement as any);

root.render(
  <StrictMode>
    <App />
  </StrictMode>
);
