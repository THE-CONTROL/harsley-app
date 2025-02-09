"use client"

import { handleCredentialsSignIn } from '@/app/actions/authActions';
import AuthAside from '@/components/authAside';
import Footer from '@/components/footer';
import Input from '@/components/input';
import LoginInfo from '@/components/loginInfo';
import Navbar from '@/components/navbar';
import SubmitButton from '@/components/submitButton';
import { signInSchema } from '@/lib/definitions';
import { zodResolver } from '@hookform/resolvers/zod';
import { getSession } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

export default function SignIn() {
  const { push } = useRouter()
  const { register, handleSubmit, setError, formState: { errors, isSubmitting, isValid } } = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
    }  
  })

  const onSubmit = async (values: z.infer<typeof signInSchema>) => {
    try {
      const result = await handleCredentialsSignIn(values);
      if (!result?.success) {
        throw new Error(result?.message);
      } else {
        await getSession();
        push("/")
      }
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
    <div className='flex w-full relative'>
      <div className='w-full lg:w-1/2 2xl:w-2/5 px-4 sm:px-6 md:px-8 lg:px-10 flex flex-col'>
        <Navbar smallText="Don't have an account yet?" btnText="Sign up" href="/signup"/>
        <div className='flex flex-col py-8 sm:py-12 md:py-16 lg:py-20 items-center justify-center w-full h-full'>
          <div className="flex w-full sm:w-5/6 md:w-3/4 flex-col">
            <form 
              onSubmit={handleSubmit(onSubmit)}
              className="w-full"
            >
              <LoginInfo smallText="Sign in to continue"/>
              {errors.root && (
                <p className="text-xs mb-1 pt-2 text-red-500">{errors.root.message}</p>
              )}
              <div className='flex flex-col gap-[1.25rem]'>
                <Input id="email" label="Email" type="email" placeholder="example@mail.com" register={register} errors={errors}/>
                <Input id="password" label="Password" type="password" placeholder="example@mail.com" register={register} errors={errors}/>
              </div>
              <p className="text-xs text-gray-500 mt-1.5">Trouble signing in,  <Link className="text-blue-600" href="/reset-password">Reset Password</Link></p>
              <SubmitButton label="Sign in" isSubmitting={isSubmitting} isValid={isValid}/>
            </form>
          </div>
        </div>
        <Footer/>
      </div> 
      <AuthAside/>
    </div>
  );
}
