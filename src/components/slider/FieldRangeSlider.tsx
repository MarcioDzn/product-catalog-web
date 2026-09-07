import Slider from "@mui/material/Slider";
import { useState, useCallback, useId } from "react";
import { formatCurrency } from "../../utils/money";
import Input from "../Input";

interface FieldRangeSliderProps { 
  title: string
  value: number[] | number
  min: number
  max: number
  valuetext: (value: number) => string
  onChange: (e: Event, range: number[]) => void
  onApply: () => void;
  valueFormatter?: (value: string) => string
}

export default function FieldRangeSlider({
  title, 
  value, 
  min, 
  max,
  valuetext, 
  onChange,
  onApply,
  valueFormatter
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
          onChangeCommitted={onApply}
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
                value={valueFormatter ? valueFormatter(String(value[0])) : String(value[0])}
                onChange={onHandleMinValueChange}
                onBlur={onApply}
                onKeyDown={(e) => {
                    if (e.key === "Enter") {
                        onApply();
                    }
                }}
                className="text-xs rounded-sm"
              />

              <Input 
                id="min-value-input"
                placeholder="Valor mínimo"
                value={valueFormatter ? valueFormatter(String(value[1])) : String(value[1])}
                onChange={onHandleMaxValueChange}
                onBlur={onApply}
                onKeyDown={(e) => {
                    if (e.key === "Enter") {
                        onApply();
                    }
                }}
                className="text-xs rounded-sm"
              />
          </div>
        }

    </div>

  )
}