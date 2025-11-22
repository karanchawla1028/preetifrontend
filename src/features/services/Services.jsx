import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getServiceDetailBySlugName } from "../../toolkit/slices/serviceSlice";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";

const Services = () => {
  const dispatch = useDispatch();
  const { slugName } = useParams();

  const detail = useSelector((state) => state.service.serviceDetailBySlug);

  useEffect(() => {
    dispatch(getServiceDetailBySlugName(slugName));
  }, [slugName]);

  return (
    <>
      <Helmet>
        <title>{detail?.metaTitle || "PreetiNest Services"}</title>
        <meta name="description" content={detail?.metaDescription || ""} />
        <meta name="keywords" content={detail?.metaKeyword || ""} />
      </Helmet>

      {/* 🔥 Dynamic Banner Section */}
      <div
        className="relative bg-cover bg-center bg-no-repeat min-h-[60vh] flex items-center justify-center"
        style={{
          backgroundImage: `url(${detail?.image || detail?.bannerImage})`,
        }}
      >
        <div className="absolute inset-0 bg-black/50"></div>

        <h1 className="relative z-10 text-4xl md:text-5xl font-bold text-white drop-shadow-lg text-center">
          {detail?.name}
        </h1>
      </div>

      {/* 🔥 Service Description */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-6 lg:px-8 text-center">
          <p className="text-gray-600 text-lg max-w-3xl mx-auto">
            {detail?.description || detail?.shortDescription}
          </p>
        </div>
      </section>

      {/* 🔥 Dynamic Content Cards */}
      {detail?.contentList?.length > 0 && (
        <section className="bg-gray-50 py-20">
          <div className="container mx-auto px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-[#0A2342] mb-4">
              Top {detail?.name} Options
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">
              {detail.contentList.map((item, index) => (
                <div
                  key={index}
                  className="bg-white rounded-lg overflow-hidden shadow-lg group transform hover:-translate-y-2 transition-all duration-300 hover:shadow-2xl"
                >
                  <div className="relative">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>

                    <div className="absolute bottom-4 left-4 text-left">
                      <h3 className="text-xl font-bold text-white drop-shadow-md">
                        {item.title}
                      </h3>
                      {item.location && (
                        <p className="text-sm text-gray-200">
                          {item.location}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="p-6 text-left">
                    <p className="text-gray-600 text-sm mb-4 h-20">
                      {item.description}
                    </p>

                    <div className="flex justify-between items-center">
                      {/* ⭐ Rating */}
                      {item.rating && (
                        <div className="text-lg font-bold text-[#D4AF37]">
                          {"★".repeat(item.rating)}
                          <span className="text-gray-300">
                            {"★".repeat(5 - item.rating)}
                          </span>
                        </div>
                      )}

                      <button className="bg-[#0A2342] text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-900 transition duration-300">
                        View Details
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default Services;
