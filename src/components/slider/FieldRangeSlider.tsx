import Slider from "@mui/material/Slider";
import { useState, useCallback, useId } from "react";
import { formatCurrency } from "../../utils/money";
import Input from "../Input";

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

    const onHandleMinValueChange = (newMinValue: string) => {
        if (Array.isArray(value)) {
            onChange(
                new Event("change"),
                [Number(newMinValue), value[1]]
            );
        }
    };

    const onHandleMaxValueChange = (newMaxValue: string) => {
        if (Array.isArray(value)) {
            onChange(
                new Event("change"),
                [value[0], Number(newMaxValue)]
            );
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
          Array.isArray(value) &&
          <div className="flex flex-row justify-between gap-4 items-center">
              <Input 
                id="min-value-input"
                placeholder="Valor mínimo"
                value={String(value[0])}
                onChange={onHandleMinValueChange}
                className=""
              />

              <Input 
                id="min-value-input"
                placeholder="Valor mínimo"
                value={String(value[1])}
                onChange={onHandleMaxValueChange}
              />
          </div>
        }

    </div>

  )
}