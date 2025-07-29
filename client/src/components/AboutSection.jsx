export default function AboutSection() {
  return (
    <section id="about" className="py-20">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row gap-12">
          <div className="md:w-1/2">
            <h2 className="text-4xl font-bold mb-6">About Me</h2>
            <p className="text-lg mb-4">
              I'm a software developer based in Bangalore, specializing in creating exceptional digital experiences.
            </p>
            <p className="text-lg mb-8">
              With expertise in modern web technologies, I build responsive, user-friendly applications that deliver real value.
            </p>
            <a href="#contact" className="px-6 py-3 border border-black hover:bg-black hover:text-white transition">
              Get in Touch
            </a>
          </div>
          <div className="md:w-1/2">
            <div className="h-80 bg-gray-200"></div>
          </div>
        </div>
      </div>
    </section>
  );
}