import React from "react";

interface InputProps {
  label: string;
  type: string;
  value: any;
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
        className={`mt-1 block w-full px-3 py-[0.6rem] rounded-lg bg-gray-transparent text-dark text-sm font-semibold placeholder:text-gray sm:text-sm ${
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