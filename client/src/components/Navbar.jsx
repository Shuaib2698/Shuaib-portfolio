import { Link } from 'react-router-dom';
import { Bars3Icon } from '@heroicons/react/24/outline';

export default function Navbar() {
  return (
    <nav className="fixed w-full bg-white z-50 border-b border-gray-100">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">SHAIK SHUAIB AHMED.</Link>
        <div className="hidden md:flex space-x-8">
          <Link to="/" className="hover:text-gray-500 transition">Home</Link>
          <Link to="#work" className="hover:text-gray-500 transition">Works</Link>
          <Link to="#about" className="hover:text-gray-500 transition">About</Link>
          <Link to="#services" className="hover:text-gray-500 transition">Services</Link>
          <Link to="#contact" className="hover:text-gray-500 transition">Contact</Link>
          <Link to="/admin" className="text-gray-500 hover:text-black transition">Admin</Link>
        </div>
        <button className="md:hidden">
          <Bars3Icon className="w-6 h-6" />
        </button>
      </div>
    </nav>
  );
}