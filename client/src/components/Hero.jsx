import { motion } from 'framer-motion';

export default function Hero() {
  return (
    <section className="min-h-screen flex items-center pt-20 px-6">
      <div className="container mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl"
        >
          <p className="text-lg mb-4">Hey, there</p>
          
          <div className="space-y-2 mb-8">
            <div className="flex items-center">
              <div className="w-2 h-2 bg-black rounded-full mr-2"></div>
              <p>Available for new opportunities</p>
            </div>
            <div className="flex items-center">
              <div className="w-2 h-2 bg-black rounded-full mr-2"></div>
              <p>Specialized in Web Development, UI/UX, and Front End Development.</p>
            </div>
          </div>

          <h1 className="text-6xl md:text-8xl font-bold mb-4 leading-tight">I AM SHUAIB</h1>
          <h2 className="text-3xl md:text-4xl font-light mb-8">SOFTWARE DEVELOPER</h2>
          
          <div className="flex space-x-4">
            <a 
              href="#contact" 
              className="px-6 py-3 bg-black text-white hover:bg-gray-800 transition flex items-center"
            >
              Contact Me
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </a>
            <a 
              href="#work" 
              className="px-6 py-3 border border-black hover:bg-gray-100 transition flex items-center"
            >
              View Projects
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}