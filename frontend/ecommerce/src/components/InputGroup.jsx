import React from "react";

export const InputGroup = ({
  label,
  name,
  error,
  as = "input",
  className = "",
  children,
  ...props
}) => {
  const baseStyles =
    "w-full rounded-lg border-slate-200 bg-white px-4 py-2.5 text-slate-800 shadow-sm ring-1 ring-inset ring-slate-200 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 transition-all duration-200";

  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      <label
        htmlFor={name}
        className="block text-sm font-semibold leading-6 text-slate-900"
      >
        {label}
      </label>

      {as === "textarea" ? (
        <textarea
          id={name}
          name={name}
          className={`${baseStyles} min-h-[120px] resize-y`}
          {...props}
        />
      ) : as === "select" ? (
        <select
          id={name}
          name={name}
          className={`${baseStyles} appearance-none bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000/svg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%236b7280%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E')] bg-no-repeat bg-[length:0.7em] bg-[right:1rem_center] pr-8`}
          {...props}
        >
          {children}
        </select>
      ) : (
        <input id={name} name={name} className={baseStyles} {...props} />
      )}

      {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
    </div>
  );
};
