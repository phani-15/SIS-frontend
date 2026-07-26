import React, { forwardRef, memo } from "react";

const InputField = memo(
  forwardRef(function InputField(
    { label, id, name, type = "text", value, onChange, error, ...props },
    ref
  ) {
    return (
      <div className="flex flex-col text-left space-y-2 mt-4">
        <label htmlFor={id || name}>{label}</label>
        <input
          ref={ref}
          id={id || name}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          className={`w-full pl-3 pr-3 py-2 focus:outline-none border border-gray-500 rounded-lg focus:ring-1  ${
            error ? "border-red-500" : "border-gray-300 "
          }`}
          {...props}
        />
        {error && <small className="text-red-600 text-sm">{error}</small>}
      </div>
    );
  })
);

export default InputField;