'use client';

import { useActionState } from 'react';
import { loginAction } from '@/app/actions/auth';
import Link from 'next/link';

export default function LoginPage() {
  const [state, formAction, isPending] = useActionState(loginAction, null);
  
    return (
        <section className="flex items-center justify-center h-screen h-full text-gray-400 bg-gray-900 body-font">
            <div className="container px-5 py-24 mx-auto flex flex-wrap items-center">
                <div className="lg:w-2/6 md:w-1/2 bg-gray-800 bg-opacity-50 rounded-lg p-8 flex flex-col md:mx-auto w-full mt-10 md:mt-0">
                    <form action={formAction}>
                    {state?.error && <p style={{ color: 'red' }}>{state.error}</p>}
                    <h2 className="text-white text-lg font-medium title-font mb-5">Login</h2>
                    <div className="relative mb-4">
                        <label htmlFor="email" className="leading-7 text-sm text-gray-400">Email</label>
                        <input type="email" id="email" name="email" className="w-full bg-gray-600 bg-opacity-20 focus:bg-transparent focus:ring-2 focus:ring-indigo-900 rounded border border-gray-600 focus:border-indigo-500 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                    </div>
                    <div className="relative mb-4">
                        <label htmlFor="password" className="leading-7 text-sm text-gray-400">Password</label>
                        <input type="password" id="password" name="password" className="w-full bg-gray-600 bg-opacity-20 focus:bg-transparent focus:ring-2 focus:ring-indigo-900 rounded border border-gray-600 focus:border-indigo-500 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                    </div> 
                    <button type="submit" disabled={isPending} className="text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg">
                        {isPending ? 'Logging in...' : 'Login'}
                    </button>
                    <p className="text-xs mt-3">Don't have an account ? <Link href="/register" className="text-indigo-400 hover:text-indigo-300">Register here</Link>.</p>
                    </form>                 
                </div>
            </div>
        </section>
    );
}