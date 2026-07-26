import React, { forwardRef, memo } from "react";

const SelectField = memo(
  forwardRef(function SelectField(
    {
      label,
      id,
      name,
      value,
      onChange,
      options = [],
      placeholder = "Select an option",
      error,
      ...props
    },
    ref
  ) {
    return (
      <div className="flex flex-col text-left space-y-2 mt-4">
        <label htmlFor={id || name}>{label}</label>

        <select
          ref={ref}
          id={id || name}
          name={name}
          value={value}
          onChange={onChange}
          className={`w-full px-3 py-2 focus:outline-none border rounded-lg focus:ring-1 ${
            error ? "border-red-500" : "border-gray-300"
          }`}
          {...props}
        >
          <option value="" disabled>
            {placeholder}
          </option>

          {options.map((option) =>
            typeof option === "string" ? (
              <option key={option} value={option}>
                {option}
              </option>
            ) : (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            )
          )}
        </select>

        {error && <small className="text-red-600 text-sm">{error}</small>}
      </div>
    );
  })
);

export default SelectField;