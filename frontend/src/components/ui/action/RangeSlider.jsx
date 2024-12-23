import React, { useEffect, useRef } from "react";

const RangeSlider = ({ maxValue, minValue, setMaxValue, setMinValue }) => {
  const trackRef = useRef();

  const setTrackStyle = (track, value, direction) => {
    if (direction === "right") {
      track.style.right = `${100 - (value / 2000) * 100}%`;
    }
    if (direction === "left") {
      track.style.left = `${(value / 2000) * 100}%`;
    }
  };

  useEffect(() => {
    const track = trackRef.current;

    if (minValue > maxValue) {
      setTrackStyle(track, minValue, "right");
    } else {
      setTrackStyle(track, maxValue, "right");
    }

    if (maxValue > minValue) {
      setTrackStyle(track, minValue, "left");
    } else {
      setTrackStyle(track, maxValue, "left");
    }
  }, [minValue, maxValue]);

  const containerClick = (e) => {
    if (e.target.classList.contains("slider__track")) {
      return;
    }
    const clickedPoint = e.nativeEvent.offsetX;

    const clickedPointValue = Math.round(
      (clickedPoint / e.target.clientWidth) * 2000
    );

    const decimalNumber = Math.floor(clickedPointValue / 10) * 10;

    if (decimalNumber < minValue) {
      setMinValue(decimalNumber);
    }

    if (decimalNumber > maxValue) {
      setMaxValue(decimalNumber);
    }
  };

  return (
    <div className="my-2 relative flex flex-col gap-4">
      <div
        className="absolute w-full bg-slate-200 rounded-md h-[10px] overflow-clip cursor-pointer"
        onClick={containerClick}
      >
        <div
          className="absolute left-[20%] bg-primary right-[20%] h-[10px] rounded-md slider__track cursor-default"
          ref={trackRef}
        />
      </div>
      <div>
        <input
          type="range"
          min="0"
          max="2000"
          value={minValue}
          onChange={(e) => setMinValue(+e.target.value)}
          step={10}
        />
        <input
          type="range"
          min="0"
          max="2000"
          value={maxValue}
          onChange={(e) => setMaxValue(+e.target.value)}
          step={10}
        />
      </div>
      <div className="grid grid-cols-2 gap-2 place-items-center mt-3">
        <p className="border border-solid border-border p-2 flex items-center justify-center rounded-md w-full max-w-[80%]">
          {minValue < maxValue ? minValue : maxValue}$
        </p>
        <p className="border border-solid border-border p-2 flex items-center justify-center rounded-md w-full max-w-[80%]">
          {minValue > maxValue ? minValue : maxValue}$
        </p>
      </div>
    </div>
  );
};

export default RangeSlider;
