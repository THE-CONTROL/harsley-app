"use client"

import Input from '@/components/input';
import LoginInfo from '@/components/loginInfo';
import SubmitButton from '@/components/submitButton';
import { emailOnlySchema } from '@/lib/definitions';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

interface RegisterProps{
    showCode: React.Dispatch<React.SetStateAction<boolean>>;
    setEmail: React.Dispatch<React.SetStateAction<string>>;
}

export default function Register({showCode, setEmail} : RegisterProps) {
      const { register, handleSubmit, setError, formState: { errors, isSubmitting, isValid } } = useForm<z.infer<typeof emailOnlySchema>>({
        resolver: zodResolver(emailOnlySchema),
        defaultValues: {
          email: "", 
        }  
      })
    
      const onSubmit = async (values: z.infer<typeof emailOnlySchema>) => {
          try {
              console.info("Signup successful")
              console.info(values)
              setEmail(values.email)
              showCode(true)
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
    
    <form 
        onSubmit={handleSubmit(onSubmit)}
        className="w-full"
        >
              <LoginInfo smallText="Sign up to get startedSign up to get started"/>
              {errors.root && (
                <p className="text-xs mb-1 pt-2 text-red-500">{errors.root.message}</p>
              )}
              <div className='flex flex-col gap-[1.25rem]'>
                <Input id="email" label="Email" type="email" placeholder="example@mail.com" register={register} errors={errors}/>
              </div>
              <SubmitButton label="Sign up" isSubmitting={isSubmitting} isValid={isValid}/>
            </form>
  );
}
