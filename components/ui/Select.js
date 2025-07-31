import React from "react";
import SelectBase from "react-select";

function Select({ options, isMulti = false, className, ...props }) {
  return (
    <SelectBase
      options={options}
      isMulti={isMulti}
      className={className}
      classNamePrefix="react-select"
      {...props}
    />
  );
}

export { Select };
