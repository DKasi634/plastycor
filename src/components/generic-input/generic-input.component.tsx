import React from "react";

interface InputProps {
  label: string;
  type: string;
  value: string;
  name:string,
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  placeholder?: string;
}

const GenericInput: React.FC<InputProps> = ({
  label,
  type,
  value,
  onChange,
  error,
  placeholder,
  name
}) => {
  return (
    <div>
      <label className="block text-xs font-bold text-dark/80">{label}</label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        name={name}
        className={`mt-1 block w-full px-3 py-[0.4rem] border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${
          error ? "border-red-500" : "border-gray/70"
        }`}
      />
      {error && (
        <p className="mt-1 text-xs text-red-400">{error}</p>
      )}
    </div>
  );
};

export default GenericInput;