export default function RegisterPage() {
    return (
        <section className="flex items-center justify-center h-screen h-full text-gray-400 bg-gray-900 body-font">
            <div className="container px-5 py-24 mx-auto flex flex-wrap items-center">
                <div className="lg:w-2/6 md:w-1/2 bg-gray-800 bg-opacity-50 rounded-lg p-8 flex flex-col md:mx-auto w-full mt-10 md:mt-0">
                    <h2 className="text-white text-lg font-medium title-font mb-5">Sign Up</h2>
                    <div className="relative mb-4">
                        <label htmlFor="full-name" className="leading-7 text-sm text-gray-400">Full Name</label>
                        <input type="text" id="full-name" name="full-name" className="w-full bg-gray-600 bg-opacity-20 focus:bg-transparent focus:ring-2 focus:ring-indigo-900 rounded border border-gray-600 focus:border-indigo-500 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                    </div>
                    <div className="relative mb-4">
                        <label htmlFor="email" className="leading-7 text-sm text-gray-400">Email</label>
                        <input type="email" id="email" name="email" className="w-full bg-gray-600 bg-opacity-20 focus:bg-transparent focus:ring-2 focus:ring-indigo-900 rounded border border-gray-600 focus:border-indigo-500 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                    </div>
                    <div className="relative mb-4">
                        <label htmlFor="password" className="leading-7 text-sm text-gray-400">Password</label>
                        <input type="password" id="password" name="password" className="w-full bg-gray-600 bg-opacity-20 focus:bg-transparent focus:ring-2 focus:ring-indigo-900 rounded border border-gray-600 focus:border-indigo-500 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                    </div>                    
                    <button className="text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg">Button</button>
                    <p className="text-xs mt-3">Have an account ? <a href="/login" className="text-indigo-400 hover:text-indigo-300">Login here</a>.</p>
                </div>
            </div>
        </section>
    );
}