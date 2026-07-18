import { forwardRef } from "react";
import { HiExclamationCircle } from "react-icons/hi";

const Input = forwardRef(
  ({ label, id, error, icon: Icon, type = "text", ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label htmlFor={id} className="block text-sm font-medium text-slate-300 mb-2">
            {label}
          </label>
        )}
        <div className="relative">
          {Icon && (
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Icon className={`h-5 w-5 ${error ? "text-red-400" : "text-slate-400"}`} />
            </div>
          )}
          <input
            id={id}
            ref={ref}
            type={type}
            className={`
              block w-full rounded-xl bg-slate-900/50 text-white placeholder-slate-400 
              transition-all duration-200 focus:outline-none focus:ring-2 
              ${Icon ? "pl-10" : "pl-4"} pr-4 py-3
              ${
                error
                  ? "border-red-500/50 focus:border-red-500 focus:ring-red-500/20 ring-1 ring-red-500/50"
                  : "border-white/10 focus:border-blue-500 focus:ring-blue-500/20 border"
              }
            `}
            {...props}
          />
          {error && (
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              <HiExclamationCircle className="h-5 w-5 text-red-500" />
            </div>
          )}
        </div>
        {error && (
          <p className="mt-2 text-sm text-red-400 flex items-center">
            {error.message}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;
