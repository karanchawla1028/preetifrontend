import React from "react";

// --- Hotels Section Component ---
const Services = () => {
  const canadianHotels = [
    {
      name: "Fairmont Banff Springs",
      location: "Banff, Alberta",
      img: "https://images.unsplash.com/photo-1579991911993-7278bac75f53?q=80&w=1974&auto=format&fit=crop",
      description:
        "Nestled in the heart of Banff National Park, this iconic castle offers timeless luxury and breathtaking views.",
      rating: 5,
    },
    {
      name: "Château Frontenac",
      location: "Quebec City, Quebec",
      img: "https://images.unsplash.com/photo-1541542428-c831a2734139?q=80&w=1964&auto=format&fit=crop",
      description:
        "Dominating the city skyline, this historic hotel provides an unforgettable experience in Old Quebec.",
      rating: 5,
    },
    {
      name: "The Ritz-Carlton",
      location: "Toronto, Ontario",
      img: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?q=80&w=2070&auto=format&fit=crop",
      description:
        "Experience modern elegance and sophisticated service in downtown Toronto's vibrant core.",
      rating: 5,
    },
  ];

  return (
    <section className="bg-gray-50 py-20">
      <div className="container mx-auto px-6 lg:px-8 text-center">
        <h2 className="text-3xl font-bold text-[#0A2342] mb-4">
          Featured Hotels in Canada
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto mb-12">
          Discover unparalleled luxury and comfort in Canada's most iconic
          hotels.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {canadianHotels.map((hotel) => (
            <div
              key={hotel.name}
              className="bg-white rounded-lg overflow-hidden shadow-lg group transform hover:-translate-y-2 transition-all duration-300 hover:shadow-2xl"
            >
              <div className="relative overflow-hidden">
                <img
                  src={hotel.img}
                  alt={hotel.name}
                  className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                <div className="absolute bottom-4 left-4">
                  <h3 className="text-xl font-bold text-white drop-shadow-md">
                    {hotel.name}
                  </h3>
                  <p className="text-sm text-gray-200">{hotel.location}</p>
                </div>
              </div>
              <div className="p-6 text-left">
                <p className="text-gray-600 text-sm mb-4 h-20">
                  {hotel.description}
                </p>
                <div className="flex justify-between items-center">
                  <div className="text-lg font-bold text-[#D4AF37]">
                    {"★".repeat(hotel.rating)}
                    <span className="text-gray-300">
                      {"★".repeat(5 - hotel.rating)}
                    </span>
                  </div>
                  <a
                    href="#"
                    className="bg-[#0A2342] text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-900 transition duration-300"
                  >
                    View Details
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
