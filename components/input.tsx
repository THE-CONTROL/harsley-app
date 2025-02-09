import { FieldErrors, FieldValues, Path, UseFormRegister } from "react-hook-form";

interface InputProps<T extends FieldValues> {
 id: Path<T>;
 label: string;
 type?: string;
 placeholder?: string;
 register: UseFormRegister<T>;
 errors: FieldErrors<T>;
 required?: boolean;
}

export default function Input<T extends FieldValues>({
 id,
 label,
 type = "text",
 placeholder,
 register,
 errors,
 required = false
}: InputProps<T>) {
 return (
   <div>
     <label htmlFor={id} className="text-xs sm:text-sm font-medium text-gray-900">
       {label}
     </label>
     <input
       type={type}
       id={id}
       {...register(id, { required })}
       className={`py-2.5 sm:py-3 rounded border text-gray-800 text-sm sm:text-base mt-1.5 sm:mt-2 px-3 sm:px-4 w-full focus:outline-none ${
         errors[id] ? "focus:border-red-500" : "focus:border-blue-500"
       }`}
       placeholder={placeholder}
     />
     {errors[id]?.message && (
       <p className="text-[10px] sm:text-xs pt-1.5 sm:pt-2 text-red-500">{errors[id]?.message as string}</p>
     )}
   </div>
 );
}