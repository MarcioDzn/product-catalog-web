import Slider from "@mui/material/Slider";
import { useState, useCallback, useId } from "react";
import { formatCurrency } from "../../utils/money";

interface FieldRangeSliderProps { 
  title: string,
  value: number[] | number,
  displayValue: string[] | string
  min: number,
  max: number,
  valuetext: (value: number) => string,
  onChange: (e: Event, range: number[]) => void;
}

export default function FieldRangeSlider({
  title, 
  value, 
  displayValue,
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

        {
          Array.isArray(value) ?
          <div className="flex flex-row justify-between items-center">
              <span className="text-sm">
                  {displayValue[0]}
              </span>
              <span className="text-sm">
                  {displayValue[1]}
              </span>
          </div>

          :

          <div className="flex flex-row justify-start items-center">
              <span className="text-sm">
                  {displayValue}
              </span>
          </div>
        }

    </div>

  )
}