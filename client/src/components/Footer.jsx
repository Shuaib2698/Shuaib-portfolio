export default function Footer() {
  return (
    <footer className="py-12 bg-black text-white">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <div className="text-2xl font-bold mb-2">SHAIK.</div>
            <p>© {new Date().getFullYear()} All rights reserved</p>
          </div>
          <div className="flex space-x-6">
            <a href="https://github.com/yourusername" target="_blank" rel="noopener noreferrer" className="hover:text-gray-400 transition">
              GitHub
            </a>
            <a href="https://linkedin.com/in/yourprofile" target="_blank" rel="noopener noreferrer" className="hover:text-gray-400 transition">
              LinkedIn
            </a>
            <a href="mailto:youremail@example.com" className="hover:text-gray-400 transition">
              Email
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}