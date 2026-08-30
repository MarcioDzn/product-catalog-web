import Slider from "@mui/material/Slider";
import { useState, useCallback, useId } from "react";

interface FieldRangeSliderProps { 
  title: string,
  value: number[] | number,
  min: number,
  max: number,
  valuetext: (value: number) => string,
  onChange: (e: Event, range: number[]) => void;
}

export default function FieldRangeSlider({
  title, 
  value, 
  min, 
  max,
  valuetext, 
  onChange,
}: FieldRangeSliderProps) {

  const handleChange = (
    e: Event,
    newValue: number | number[]
  ) => {
    if (Array.isArray(newValue)) {
      onChange(e, newValue);
    }
  };

  return (
      <div className="flex flex-col gap-2 h-full">
        <span className="font-bold">{title}</span>
        
        <Slider
          getAriaLabel={() => title}
          value={value}
          onChange={handleChange}
          valueLabelDisplay="auto"
          getAriaValueText={valuetext}
          min={min}
          max={max}
          sx={{
            color: '#000',
          }}
        />
    </div>

  )
}