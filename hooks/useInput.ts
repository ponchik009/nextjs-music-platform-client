import React from "react";

export const useInput = (initialValue) => {
  const [value, setVaule] = React.useState(initialValue);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVaule(e.target.value);
  };

  return {
    value,
    onChange,
  };
};
