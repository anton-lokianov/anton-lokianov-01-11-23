import React from "react";

type InputProps = {
  name?: string;
  label?: string;
  icon?: React.ReactElement;
  type?: string;
  className?: string;
  placeholder?: string;
  value?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const Input = ({
  name,
  label,
  icon,
  onChange,
  type,
  placeholder,
  value,
  className,
}: InputProps) => {
  return (
    <div className={`relative ${className}`}>
      {label && (
        <label
          htmlFor={name}
          className="block text-md font-medium text-slate-900">
          {label}
        </label>
      )}
      {icon && (
        <div className="absolute right-2 bottom-[5px]">
          {React.cloneElement(icon, { className: "h-6 w-6 text-slate-900" })}
        </div>
      )}
      <input
        onChange={onChange}
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        className="px-2 py-1 w-full border rounded-md outline-none transition duration-150 ease-in-out focus:border-blue-500 
          focus:ring focus:ring-blue-200 focus:ring-opacity-50"
      />
    </div>
  );
};

export default Input;
