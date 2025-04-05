"use client";

const Teaching = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-start gap-8">
          <div className="w-full md:w-1/2 mb-8 md:mb-0">
            <div className="aspect-video bg-black rounded-lg overflow-hidden shadow-lg">
              <iframe
                width="100%"
                height="100%"
                src="https://www.youtube.com/embed/u6aEYuemt0M"
                title="Deep Learning for Computer Vision Tutorial"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              />
            </div>
          </div>

          <div className="w-full md:w-1/2">
            <h2 className="text-2xl font-bold mb-4">Teaching & Mentoring</h2>
            <p className="text-gray-700 mb-6">
              As a passionate educator in the tech community, I believe in sharing knowledge and helping others grow.
              Through tutorials, workshops, and one-on-one mentoring, I've helped numerous developers level up their skills and achieve their goals.
              My teaching philosophy focuses on practical, hands-on learning that empowers developers to build real-world applications.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Teaching;
