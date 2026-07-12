import React from "react";

function Footer() {
  return (
    <footer className="bg-blue-600 text-white py-6 mt-10 shadow-inner">
      <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-6">
        
      
        <h2 className="font-bold text-xl tracking-wide">RentEasy</h2>

      
        <ul className="flex gap-6 text-sm">
          <li>
            <a href="/" className="hover:underline">
              Home
            </a>
          </li>
          <li>
            <a href="/items" className="hover:underline">
              Items
            </a>
          </li>
          <li>
            <a href="/bookings" className="hover:underline">
              MyBookings
            </a>
          </li>
          <li>
            <a href="/signup" className="hover:underline">
              Signup
            </a>
          </li>
        </ul>

        {/* Right side: Social icons */}
        <div className="flex gap-4">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-200">
            {/* Facebook Icon */}
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 fill-current" viewBox="0 0 24 24">
              <path d="M22 12c0-5.522-4.477-10-10-10S2 6.478 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.988H7.898v-2.89h2.54V9.797c0-2.507 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562v1.875h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"/>
            </svg>
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-200">
            {/* Twitter Icon */}
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 fill-current" viewBox="0 0 24 24">
              <path d="M23 3a10.9 10.9 0 01-3.14 1.53A4.48 4.48 0 0022.4.36a9.1 9.1 0 01-2.88 1.1 4.52 4.52 0 00-7.7 4.13A12.82 12.82 0 013 2.1a4.52 4.52 0 001.4 6.04A4.48 4.48 0 012 7.1v.06a4.52 4.52 0 003.63 4.43 4.52 4.52 0 01-2.04.08 4.52 4.52 0 004.22 3.13A9.05 9.05 0 012 19.54a12.8 12.8 0 006.92 2.03c8.3 0 12.84-6.86 12.84-12.82 0-.2 0-.39-.01-.58A9.22 9.22 0 0023 3z"/>
            </svg>
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-200">
            {/* LinkedIn Icon */}
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 fill-current" viewBox="0 0 24 24">
              <path d="M19 0h-14C2.24 0 0 2.24 0 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5V5c0-2.76-2.24-5-5-5zM8.34 19H5.67V9h2.67v10zM7 7.67c-.85 0-1.54-.69-1.54-1.54S6.15 4.59 7 4.59s1.54.69 1.54 1.54-.69 1.54-1.54 1.54zm12 11.33h-2.67v-5.33c0-1.27-.02-2.9-1.77-2.9-1.77 0-2.04 1.38-2.04 2.8V19h-2.67V9h2.56v1.37h.04c.36-.68 1.25-1.4 2.58-1.4 2.76 0 3.27 1.82 3.27 4.19V19z"/>
            </svg>
          </a>
        </div>

        {/* Bottom: Copyright */}
        <p className="text-sm text-gray-200 text-center md:text-right">
          © {new Date().getFullYear()} RentEasy. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
