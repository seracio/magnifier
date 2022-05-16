# Magnifier

> A React component that magnifies svg charts.

[An example of the component in action](https://seracio.github.io/magnifier/).

## Install

```
yarn add react d3
yarn add @seracio/magnifier
```

## Usage

The `Magnifier` component needs to be inserted in a svg.
It takes several props:

- svgId: string - The id of the svg element.
- useId: string - The id of the element/group of elements to magnify.
- zoom?: number - The zoom factor, default to 3.
- size?: number - The size of the magnifier in svg pixels, default to 30.
- attrs?: object - Attributes of the magnifier's circle element, default to `{ stroke: 'black', fill: 'none' }`.

```jsx
import { Magnifier } from "@seracio/magnifier";

<svg id="mySvg">
  <g id="g-chart">{/* ... */}</g>
  <Magnifier
    useId="g-chart"
    svgId="mySvg"
    zoom={3}
    size={30}
    attrs={{
      strokeWidth: 0.5,
      style: {
        filter: "drop-shadow( 3px 3px 2px rgba(0, 0, 0, .7))",
      },
    }}
  />
</svg>;
```

The magnifier follows the cursor or and displays a circle around it.
