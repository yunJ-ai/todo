import React from "react";

interface InputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Inputs: React.FC<InputProps> = ({ value, onChange }) => {
  return (
    <input
      type="text"
      placeholder="할 일을 입력해 주세요"
      className="border border-gray-300 rounded-md px-4 py-2 w-fit"
      value={value}
      onChange={onChange}
    />
  );
};

export default Inputs;
