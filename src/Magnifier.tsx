import { useEffect, useState } from "react";
import { select, pointer } from "d3";

type Props = {
  useId: string;
  svgId: string;
  size?: number;
  zoom?: number;
  attrs?: any;
};

export default function Magnifier({
  useId,
  svgId,
  size = 30,
  zoom = 4,
  attrs = {},
}: Props) {
  const [coords, setCoords] = useState([0, 0]);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const useEl = document.querySelector("#" + svgId);
    select(useEl)
      .on("mouseenter", function (e) {
        setIsActive(true);
      })
      .on("mouseleave", function (e) {
        setIsActive(false);
      })
      .on("mousemove", function (e: any) {
        const coords = pointer(e, useEl);
        setCoords(coords);
      });
  }, [useId, svgId]);

  const zr = size / zoom;

  if (!isActive) {
    return null;
  }

  return (
    <>
      <defs>
        <clipPath id="clip-lens">
          <circle r={size / 2} cx={size / 2} cy={size / 2} />
        </clipPath>
      </defs>
      <g
        transform={`translate(${coords[0] - size / 2} ${coords[1] - size / 2})`}
        style={{
          pointerEvents: "none",
        }}
      >
        <circle
          r={size / 2}
          fill="white"
          stroke="none"
          cx={size / 2}
          cy={size / 2}
        />
        <g clipPath="url(#clip-lens)">
          <svg
            width={size}
            height={size}
            preserveAspectRatio="xMidYMid meet"
            viewBox={`${coords[0] - zr / 2} ${coords[1] - zr / 2} ${zr} ${zr}`}
          >
            <use href={`#${useId}`} />
          </svg>
        </g>
        <circle
          r={size / 2}
          fill="none"
          stroke="black"
          cx={size / 2}
          cy={size / 2}
          {...attrs}
        />
      </g>
    </>
  );
}
