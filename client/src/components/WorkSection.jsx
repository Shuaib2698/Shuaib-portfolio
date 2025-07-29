export default function WorkSection() {
  return (
    <section id="work" className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold mb-12">Selected Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Project 1 */}
          <div className="group">
            <div className="h-80 bg-gray-200 mb-4 overflow-hidden">
              <div className="h-full w-full bg-gray-300 group-hover:scale-105 transition-transform duration-500"></div>
            </div>
            <h3 className="text-2xl font-bold">Project Title</h3>
            <p className="text-gray-600">Web Development</p>
          </div>
          
          {/* Project 2 */}
          <div className="group">
            <div className="h-80 bg-gray-200 mb-4 overflow-hidden">
              <div className="h-full w-full bg-gray-300 group-hover:scale-105 transition-transform duration-500"></div>
            </div>
            <h3 className="text-2xl font-bold">Project Title</h3>
            <p className="text-gray-600">UI/UX Design</p>
          </div>
        </div>
      </div>
    </section>
  );
}