import React from 'react';

const Navbar = () => {
    return (
        <nav className="flex justify-between items-center p-4 bg-slate-900 shadow-md">
            <div className="text-xl font-bold text-neutral-50">Logo</div>
            <div className="flex space-x-10">
                <a href="/" className="antialiased text-gray-400 hover:text-zinc-50 transition duration-300">Homepage</a>
                <a href="/tests" className="antialiased text-gray-400 hover:text-zinc-50 transition duration-300">Docs</a>
                <a href="/support" className="antialiased text-gray-400 hover:text-zinc-50 transition duration-300">Plugin Hub</a>
                <a href="/notice" className="antialiased text-gray-400 hover:text-zinc-50 transition duration-300">Support</a>
                <a href="/aboutus" className="antialiased text-gray-400 hover:text-zinc-50 transition duration-300">Community</a>
            </div>
            <div className="flex space-x-4">
                <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 text-neutral-50">Get a Demo</button>
                <button className="bg-stone-900 border-2 border-neutral-50 text-white px-4 py-2 rounded text-neutral-50">Start Trial</button>
            </div>
        </nav>
    );
};

export default Navbar;
