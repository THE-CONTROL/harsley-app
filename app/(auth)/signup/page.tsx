"use client"

import AuthAside from '@/components/authAside';
import Footer from '@/components/footer';
import Navbar from '@/components/navbar';
import Register from '@/components/register';
import VerifyOTP from '@/components/verifyOtp';
import { useState } from 'react';

export default function SignUp() {
    const [code, showCode] = useState<boolean>(false)
    const [email, setEmail] = useState<string>("")



    return (
        <div className='flex w-full min-h-screen relative'>
            <div className='w-full lg:w-1/2 2xl:w-2/5 px-4 sm:px-6 md:px-8 lg:px-10 flex flex-col'>
                <Navbar smallText="Already have an account?" btnText="Sign in" href="/signin"/>
                <div className='flex flex-col py-8 sm:py-12 md:py-16 lg:py-20 items-center justify-center w-full h-full'>
                  <div className="flex w-full sm:w-5/6 md:w-3/4 flex-col">
                        {!code ? <Register showCode={showCode} setEmail={setEmail} /> 
                            :
                        <VerifyOTP email={email} />}
                    </div>
                </div>
                <Footer/>
            </div> 
        <AuthAside/>
    </div>
  );
}
