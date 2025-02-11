
import React from "react";

interface OtpInputProps {
  value: string;
  onChange: (value: string) => void;
}

const OtpInput: React.FC<OtpInputProps> = ({ value, onChange }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value.replace(/\D/g, ""); // Allow only digits
    if (inputValue.length <= 6) {
      onChange(inputValue); // Update the OTP value
    }
  };

  return (
    <input
      type="text"
      value={value}
      onChange={handleChange}
      maxLength={6}
      placeholder="Enter OTP"
      className="w-full p-2 border rounded"
    />
  );
};

export default OtpInput;