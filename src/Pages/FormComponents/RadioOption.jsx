import React, { forwardRef, memo } from "react";

const RadioOption = memo(
  forwardRef(function RadioOption(
    {
      label,
      name,
      value,
      selectedValue,
      onChange,
      error,
      ...props
    },
    ref
  ) {
    return (
      <div className="flex flex-col text-left space-y-2 mt-4">
        {label && <label>{label}</label>}

        <label className="flex items-center gap-2 cursor-pointer">
          <input
            ref={ref}
            type="radio"
            name={name}
            value={value}
            checked={selectedValue === value}
            onChange={onChange}
            className="h-4 w-4"
            {...props}
          />
          <span>{value}</span>
        </label>

        {error && <small className="text-red-600 text-sm">{error}</small>}
      </div>
    );
  })
);

export default RadioOption;