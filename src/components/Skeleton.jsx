import React from "react";

function Skeleton({ width = "100%", height = "1em", style = {} }) {
  return (
    <div
      style={{
        width,
        height,
        borderRadius: "4px",
        background: "linear-gradient(90deg,rgb(233, 233, 233) 25%, #f0f0f0 50%,rgb(233, 233, 233) 75%)",
        backgroundSize: "200% 100%",
        animation: "loadingSkeleton 1.5s infinite",
        ...style,
      }}
    />
  );
}

export default Skeleton;
