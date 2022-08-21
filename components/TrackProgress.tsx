import React from "react";
import format from "format-duration";

interface TrackProgressProps {
  left: number;
  right: number;
  onChange: (e) => void;
  time?: boolean;
}

const TrackProgress: React.FC<TrackProgressProps> = ({
  left,
  right,
  onChange,
  time = false,
}) => {
  return (
    <div style={{ display: "flex" }}>
      <input
        type="range"
        min={0}
        max={right}
        value={left}
        onChange={onChange}
      />
      <div>
        {!time
          ? `${left} / ${right}`
          : `${format(1000 * left)} / ${format(1000 * right)}`}
      </div>
    </div>
  );
};

export default TrackProgress;
