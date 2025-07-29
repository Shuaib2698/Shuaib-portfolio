export default function ServicesSection() {
  const services = [
    {
      title: "Web Development",
      description: "Building modern, responsive websites and web applications using the latest technologies."
    },
    {
      title: "UI/UX Design",
      description: "Creating intuitive and visually appealing user interfaces that enhance user experience."
    },
    {
      title: "Frontend Development",
      description: "Implementing pixel-perfect frontend solutions with clean, maintainable code."
    }
  ];

  return (
    <section id="services" className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold mb-12">Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div key={index} className="border border-gray-200 p-8 hover:bg-gray-50 transition">
              <h3 className="text-2xl font-bold mb-4">{service.title}</h3>
              <p className="text-gray-600">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}