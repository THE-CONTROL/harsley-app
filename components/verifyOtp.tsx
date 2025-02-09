"use client"

import Link from 'next/link';
import { Fragment } from 'react';
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from 'next/navigation';

const otpSchema = z.object({
 code: z.string().length(6, "Please enter a valid 6-digit code")
});

type OTPFormData = z.infer<typeof otpSchema>;

interface VerifyOTPProps {
 email: string;
}

export default function VerifyOTP({ email }: VerifyOTPProps) {
 const { push } = useRouter();
 const {
   handleSubmit,
   setError,
   formState: { errors, isSubmitting },
   setValue,
   watch
 } = useForm<OTPFormData>({
   resolver: zodResolver(otpSchema),
   defaultValues: {
     code: ""
   }
 });

 const handleChange = (index: number, value: string) => {
 if (value.length <= 1 && /^\d*$/.test(value)) {
   const currentCode = watch("code")?.split("") || Array(6).fill("");
   currentCode[index] = value;
   const newCode = currentCode.join("");
   setValue("code", newCode);

   if (value && index < 5) {
     const nextInput = document.getElementsByName(`input${index + 1}`)[0] as HTMLInputElement;
     nextInput?.focus();
   }

   // Auto submit when last digit is entered
   if (index === 5 && value && newCode.length === 6) {
     handleSubmit(onSubmit)();
   }
 }
};

 const onSubmit = async (data: OTPFormData) => {
   try {
     console.info("Successful")
     console.info(data)
     push("/signin");
     
   } catch (error) {
     if (error instanceof Error) {
        setError("root", {
          message: error.message,
        });
      } else {
        setError("root", {
          message: "An unexpected error occurred.",
        });
      }
   }
 };

 const handleResendCode = async () => {
   try {
     console.info("code sent") 
   } catch (error) {
     if (error instanceof Error) {
        setError("root", {
          message: error.message,
        });
      } else {
        setError("root", {
          message: "An unexpected error occurred.",
        });
      }
   }
 };

 return (
   <form className="w-full">
     <h2 className="text-xl md:text-xl font-semibold pb-3">Check your email for a code</h2>
     <p className="text-gray-700 text-base">
       We&apos;ve sent a 6-digit code to {email?.replace(/(?<=.{1}).*(?=@)/, '*****')}, 
       the code expires in 10 minutes, please enter it soon.
     </p>

     <div className="py-5 sm:py-8">
       <div className="flex space-x-0.5">
         {Array(6).fill('').map((_, index) => (
           <Fragment key={index}>
             <input
               type="text"
               maxLength={1}
               name={`input${index}`}
               onChange={(e) => handleChange(index, e.target.value)}
               value={watch("code")?.charAt(index) || ""}
               className="border border-gray-300 text-gray-800 focus:outline-none mt-[0.5rem] py-[0.625rem] pr-[1rem] w-12 h-14 sm:w-16 sm:h-20 pl-5 text-lg sm:text-2xl rounded text-center"
               required
               pattern="[\d]{1,}"
             />
             {index === 2 && (
               <span className="inline-block px-1 sm:px-3 text-gray-300 my-auto">-</span>
             )}
           </Fragment>
         ))}
       </div>

       {isSubmitting && (
         <p className="text-gray-600 text-xs py-3">
           <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="inline-block fill-current w-4 mr-1">
             <path d="M8 0.5C8.41423 0.5 8.75 0.83579 8.75 1.25V3.5C8.75 3.91421 8.41423 4.25 8 4.25C7.58577 4.25 7.25 3.91421 7.25 3.5V1.25C7.25 0.83579 7.58577 0.5 8 0.5ZM8 11.75C8.41423 11.75 8.75 12.0858 8.75 12.5V14.75C8.75 15.1642 8.41423 15.5 8 15.5C7.58577 15.5 7.25 15.1642 7.25 14.75V12.5C7.25 12.0858 7.58577 11.75 8 11.75ZM15.5 8C15.5 8.41423 15.1642 8.75 14.75 8.75H12.5C12.0858 8.75 11.75 8.41423 11.75 8C11.75 7.58577 12.0858 7.25 12.5 7.25H14.75C15.1642 7.25 15.5 7.58577 15.5 8ZM4.25 8C4.25 8.41423 3.91421 8.75 3.5 8.75H1.25C0.83579 8.75 0.5 8.41423 0.5 8C0.5 7.58577 0.83579 7.25 1.25 7.25H3.5C3.91421 7.25 4.25 7.58577 4.25 8Z" />
           </svg>
           Checking...
         </p>
       )}

       {errors.code && (
         <p className="font-bold text-red-500 text-xs pb-3">
           <svg width="14" height="12" viewBox="0 0 14 12" fill="none" xmlns="http://www.w3.org/2000/svg" className="inline-block fill-current w-5 mr-1">
             <path fillRule="evenodd" clipRule="evenodd" d="M5.78806 0.996098C6.32646 0.0624984 7.67366 0.0624984 8.21206 0.996098L13.2361 9.6961C13.7745 10.6297 13.1001 11.7961 12.0233 11.7961H1.97606C0.898462 11.7961 0.224862 10.6297 0.764062 9.6961L5.78806 0.996098Z" />
           </svg>
           {errors.code.message || "The code was incorrect"} 
           <button type="button" onClick={handleResendCode} className="text-blue-600 ml-1">
             Resend code
           </button>
         </p>
       )}

       <div className="mt-[70px] flex bg-slate-200 text-sm p-4 rounded-xl">
         <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="inline-block fill-success w-16 mb-auto mr-2 mt-1">
           <path d="M12 22C6.49 22 2 17.51 2 12C2 6.49 6.49 2 12 2C17.51 2 22 6.49 22 12C22 17.51 17.51 22 12 22Z" />
         </svg>
         <div className="text-grey-700">
           <h6 className="font-bold pb-0.5">Why do I need a code</h6>
           <p>We&apos;re committed to keeping your account secure, the OTP code helps us to do so, learn about our <Link className="text-blue-600 underline" href="/">Privacy Policy</Link></p>
         </div>
       </div>
     </div>
   </form>
 );
}