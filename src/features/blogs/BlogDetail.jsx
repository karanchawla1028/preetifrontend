import React from "react";

export default function BlogDetail() {
  return (
    <div className="w-full bg-white text-gray-900 flex justify-center py-10">
      <div className="w-full max-w-7xl grid grid-cols-1 md:grid-cols-3 gap-10 px-4">
        {/* LEFT SIDE - CONTENT */}
        <div className="md:col-span-2">
          {/* Cover Image */}
          <div className="relative w-full mb-8">
            <img
              src="https://via.placeholder.com/900x500"
              alt="Blog Cover"
              className="rounded shadow-lg w-full object-cover"
            />
            <div className="absolute top-4 left-4 bg-white px-3 py-2 shadow text-center text-blue-900 border border-gold-500">
              <p className="text-xs font-semibold">APR</p>
              <p className="text-lg font-bold">27</p>
            </div>
          </div>

          {/* Title */}
          <h1 className="text-4xl font-bold text-blue-900 mb-6">
            How to Clean Precious Jewelry at Home
          </h1>

          {/* Paragraphs */}
          <div className="space-y-6 leading-7 text-gray-700">
            <p>
              As gold and platinum are both commonly used interchangeably as settings
              diamonds and gemstones, the same basic need to consider what other
              jewellery you wear close by if you have a gold engagement ring,
              then you would want to choose a gold wedding ring to wear alongside
              it.
            </p>
            <p>
              But rinsing and rubbing fragile jewelry too much can cause
              unnecessary damage and premature wear—and cleaning too little can
              cause your beloved pieces to degrade over time.
            </p>
            <p>
              How often you clean your jewelry depends on how often it is worn…
            </p>
          </div>

          {/* Author Box */}
          <div className="border p-6 mt-12 rounded-md bg-blue-50">
            <div className="flex items-center gap-5">
              <img
                src="https://via.placeholder.com/100"
                className="w-20 h-20 rounded-full object-cover"
                alt="Author"
              />
              <div>
                <h3 className="text-xl font-bold text-blue-900">Jena Peter</h3>
                <p className="text-gray-700 mt-1">
                  Founded in Italy, we offer divine and timeless jewelry pieces.
                  We focus on quality, uniqueness, versatility, and great
                  craftsmanship!
                </p>

                <div className="flex gap-4 mt-3 text-blue-900 text-xl">
                  <i className="fa-brands fa-facebook"></i>
                  <i className="fa-brands fa-instagram"></i>
                  <i className="fa-brands fa-tiktok"></i>
                  <i className="fa-brands fa-twitter"></i>
                </div>
              </div>
            </div>
          </div>

          {/* Comments */}
          <h2 className="text-2xl font-bold mt-12 mb-4">3 Comments</h2>

          <div className="space-y-8">
            {[1, 2, 3].map((c) => (
              <div key={c} className="flex gap-4">
                <img
                  src="https://via.placeholder.com/80"
                  className="w-16 h-16 rounded-full"
                />
                <div>
                  <p className="text-sm font-semibold text-blue-900 uppercase">
                    Jena Peter | May 31, 2024
                  </p>
                  <p className="mt-2 text-gray-700 w-11/12">
                    Keep in mind that all of these methods call for gentle
                    rubbing, brushing or wiping. You don’t want to be too rough
                    with your delicate treasures.
                  </p>
                  <button className="text-blue-900 mt-2 font-semibold">Reply</button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT SIDE - SIDEBAR */}
        <div className="space-y-10">
          {/* Search */}
          <div>
            <input
              type="text"
              placeholder="Search..."
              className="w-full border px-4 py-3 rounded shadow-sm focus:outline-none"
            />
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-blue-900">Categories</h3>
            <ul className="space-y-2 text-gray-700">
              {["Earrings", "Rings", "Necklaces", "Bracelets", "Best Sellers", "Classic Jewelry", "Gifts Set"].map(
                (cat) => (
                  <li key={cat} className="cursor-pointer hover:text-blue-800">
                    {cat.toUpperCase()}
                  </li>
                )
              )}
            </ul>
          </div>

          {/* Instagram */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-blue-900">Instagram</h3>
            <div className="grid grid-cols-3 gap-2">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <img
                  key={i}
                  src={`https://via.placeholder.com/120`}
                  className="rounded object-cover"
                />
              ))}
            </div>
          </div>

          {/* Follow Us */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-blue-900">Follow Us</h3>
            <div className="flex gap-4 text-blue-900 text-2xl">
              <i className="fa-brands fa-facebook"></i>
              <i className="fa-brands fa-instagram"></i>
              <i className="fa-brands fa-tiktok"></i>
              <i className="fa-brands fa-twitter"></i>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
