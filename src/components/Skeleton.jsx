import React from "react";

function Skeleton({ width = "100%", height = "1em", style = {} }) {
  return (
    <div
      style={{
        width,
        height,
        borderRadius: "10px",
        background: "linear-gradient(90deg, #e0e0e0 25%, #f5f5f5 50%, #e0e0e0 75%)",
        backgroundSize: "400% 100%",
        animation: "loadingSkeleton 1.2s ease-in-out infinite",
        ...style,
      }}
    />
  );
}

export default Skeleton;
