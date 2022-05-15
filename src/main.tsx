import "./styles.css";
import Magnifier from "./Magnifier";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { schemeTableau10 } from "d3";

function App() {
  return (
    <div
      className="App"
      style={{
        position: "relative",
        maxWidth: "700px",
        margin: "0 auto",
      }}
    >
      <h1>A magnifier test</h1>
      <svg
        preserveAspectRatio="xMidYMid meet"
        viewBox="0 0 100 100"
        id="playground-svg"
      >
        <g id="playground">
          {Array(8)
            .fill(0)
            .map((v, i) => {
              return (
                <rect
                  key={i}
                  x={i * 10}
                  y={i * 10}
                  width="10"
                  height="10"
                  fill={schemeTableau10[i]}
                />
              );
            })}
        </g>
        <Magnifier
          useId="playground"
          svgId="playground-svg"
          zoom={4}
          size={30}
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
