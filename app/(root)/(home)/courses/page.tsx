const Courses = () => {
    return (
        <div className="relative font-inter antialiased">

            {/* Search Box */}
            <div className="mt-2 mb-8 sticky top-24 w-full flex flex-row-reverse z-10">
                <form className="max-w-md">
                    <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only">Search</label>
                    <div className="relative">
                        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                            <svg className="w-4 h-4 text-gray-500 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                            </svg>
                        </div>
                        <input type="search" id="default-search" className="block w-full p-4 ps-10 text-sm text-slate-900 rounded-lg bg-gray-50 focus:ring-teal-500 focus:border-teal-500" placeholder="Search Classes..." required />
                        <button type="submit" className="text-white absolute end-2.5 bottom-2.5 bg-teal-400 hover:bg-teal-500 focus:ring-4 focus:outline-none focus:ring-teal-300 font-medium rounded-lg text-sm px-4 py-2">Search</button>
                    </div>
                </form>
            </div>

            <div className="relative flex flex-col justify-center overflow-hidden">
                <div className="w-full max-w-5xl mx-auto px-4 md:px-6">
                    <div className="max-w-xs mx-auto grid gap-6 lg:grid-cols-3 items-start lg:max-w-none mb-8">
                        <div className="flex flex-col h-full bg-slate-600 shadow-md rounded-xl overflow-hidden">
                            <img className="object-cover h-48 w-full hover:scale-110 hover:-translate-y-2 transition duration-500" src="https://cruip-tutorials.vercel.app/equal-height-cards/equal-height-02.jpg" width="304" height="192" alt="Course 01" />
                            <div className="flex-1 flex flex-col p-6">
                                <div className="flex-1">
                                    <header className="mb-2">
                                        <h2 className="text-xl font-extrabold leading-snug">
                                            <a className="text-white focus-visible:outline-none focus-visible:ring focus-visible:ring-teal-300" href="#0">
                                                Unlocking the Secrets of Productivity
                                            </a>
                                        </h2>
                                    </header>

                                    <div className="text-sm text-slate-50 mb-8">
                                        <p>Boost efficiency, accomplish more. Learn proven strategies.</p>
                                    </div>
                                </div>

                                <div className="flex justify-end space-x-2">
                                    {/* <a className="inline-flex justify-center whitespace-nowrap rounded-lg bg-transparent px-3 py-2 text-sm font-medium text-slate-50 hover:bg-red-400 focus-visible:outline-none focus-visible:ring focus-visible:ring-teal-300 transition-colors" href="#0">Cancel</a> */}
                                    <a className="inline-flex justify-center whitespace-nowrap rounded-lg bg-teal-50 px-3 py-2 text-sm font-medium text-teal-400 hover:bg-teal-100 focus-visible:outline-none focus-visible:ring focus-visible:ring-teal-300 transition-colors" href="#0">Preview</a>
                                    <a className="inline-flex justify-center whitespace-nowrap rounded-lg bg-teal-400 px-3 py-2 text-sm font-medium text-white hover:bg-teal-600 focus-visible:outline-none focus-visible:ring focus-visible:ring-teal-300 transition-colors" href="#0">Apply Now</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div >
    );
};

export default Courses;
