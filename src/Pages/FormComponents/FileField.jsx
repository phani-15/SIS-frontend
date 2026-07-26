import React, { forwardRef, memo } from "react";

const FileField = memo(
  forwardRef(function FileField(
    {
      label,
      id,
      name,
      onChange,
      accept,
      error,
      multiple = false,
      ...props
    },
    ref
  ) {
    return (
      <div className="flex flex-col text-left space-y-2 mt-4">
        <label htmlFor={id || name}>{label}</label>

        <input
          ref={ref}
          id={id || name}
          name={name}
          type="file"
          accept={accept}
          multiple={multiple}
          onChange={onChange}
          className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-1 file:mr-4 file:px-4 file:py-2 file:border-0 file:rounded-md file:bg-blue-600 file:text-white hover:file:bg-blue-700 ${
            error ? "border-red-500" : "border-gray-300"
          }`}
          {...props}
        />

        {error && <small className="text-red-600 text-sm">{error}</small>}
      </div>
    );
  })
);

export default FileField;