import React from 'react';
import { Link } from 'react-router-dom';

// --- Placeholder Blog Data (Updated with Online Images) ---
const blogPosts = [
  {
    id: 1,
    title: "Top 5 Cities for Corporate Meetings in 2025",
    description: "Explore the most dynamic and cost-effective locations around the globe ideal for your next major corporate event or conference.",
    imageUrl: "https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2", // Image of a city skyline/meeting room
    date: "Oct 28, 2025",
    author: "PreetiNest Team",
    category: "Events",
  },
  {
    id: 2,
    title: "How to Save on Group Travel Bookings",
    description: "Our insider tips and negotiation strategies to help you secure exclusive group rates and significantly reduce your business travel expenses.",
    imageUrl: "https://images.pexels.com/photos/3183197/pexels-photo-3183197.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2", // Image showing cost savings/team planning
    date: "Oct 20, 2025",
    author: "Karan Chawla",
    category: "Travel Tips",
  },
  {
    id: 3,
    title: "Creating Impactful Business Events on a Budget",
    description: "Learn how to maximize attendee engagement and perceived value without overspending on venue, catering, or décor.",
    imageUrl: "https://images.pexels.com/photos/2088200/pexels-photo-2088200.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2", // Image of a clean, well-lit event space
    date: "Oct 15, 2025",
    author: "PreetiNest Team",
    category: "Planning",
  },
  {
    id: 4,
    title: "The Rise of Hybrid Events: What You Need to Know",
    description: "A comprehensive guide to successfully integrating virtual and in-person elements for maximum reach and accessibility.",
    imageUrl: "https://images.pexels.com/photos/5668858/pexels-photo-5668858.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2", // Image showing screens and an audience (hybrid)
    date: "Sep 30, 2025",
    author: "Jane Doe",
    category: "Technology",
  },
  {
    id: 5,
    title: "7 Must-Have Hotel Amenities for Executive Stays",
    description: "From connectivity to security, ensure your executives have everything they need for a productive and comfortable trip.",
    imageUrl: "https://images.pexels.com/photos/2034335/pexels-photo-2034335.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2", // Image of a high-end hotel room/suite
    date: "Sep 18, 2025",
    author: "PreetiNest Team",
    category: "Hotels",
  },
  {
    id: 6,
    title: "Negotiating Venue Contracts: Key Clauses to Watch",
    description: "Protect your business by understanding the critical terms and conditions in every venue agreement before you sign.",
    imageUrl: "https://images.pexels.com/photos/3184405/pexels-photo-3184405.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2", // Image of a contract/signing
    date: "Sep 10, 2025",
    author: "John Smith",
    category: "Legal",
  },
  {
    id: 7,
    title: "Sustainable Travel: Making Corporate Trips Greener",
    description: "Practical steps your company can take to reduce the environmental footprint of business travel and events.",
    imageUrl: "https://images.pexels.com/photos/15830933/pexels-photo-15830933/free-photo-of-two-green-leaves.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2", // Image related to green travel/nature
    date: "Aug 25, 2025",
    author: "PreetiNest Team",
    category: "Sustainability",
  },
];


// --- Blog Component ---
const BlogPost = () => {
  return (
    <main className="relative">
      {/* --- Hero Section --- */}
      <div className="relative bg-[#0A2342] pt-32 pb-24 md:pt-40 md:pb-32">
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-transparent"></div>
        <div className="relative z-10 container mx-auto px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold text-white leading-tight">
            Our Insights & Resources
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-300">
            Stay ahead with the latest trends, tips, and best practices in corporate travel and event planning.
          </p>
        </div>
      </div>

      {/* --- Blog Grid Section --- */}
      <section className="bg-gray-50 py-20">
        <div className="container mx-auto px-6 lg:px-8">
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            
            {blogPosts.map((post) => (
              <div
                key={post.id}
                className="bg-white rounded-xl shadow-xl overflow-hidden group transition-all duration-300 hover:shadow-2xl hover:-translate-y-1"
              >
                
                {/* Image */}
                <Link to={`/blog/${post.id}`}>
                    <img
                        src={post.imageUrl}
                        alt={post.title}
                        className="w-full h-56 object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    />
                </Link>

                <div className="p-6">
                  {/* Category Tag */}
                  <span className="inline-block bg-[#D4AF37]/20 text-[#0A2342] text-xs font-semibold px-3 py-1 rounded-full mb-3">
                    {post.category}
                  </span>

                  {/* Title */}
                  <Link to={`/blog/${post.id}`}>
                    <h3 className="text-xl font-bold text-[#0A2342] mb-3 leading-snug hover:text-blue-700 transition duration-300">
                      {post.title}
                    </h3>
                  </Link>

                  {/* Description */}
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {post.description}
                  </p>
                  
                  {/* Meta Data */}
                  <div className="flex justify-between items-center text-sm text-gray-500 border-t pt-4">
                    <span>By {post.author}</span>
                    <span>{post.date}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* --- CTA / Load More Section --- */}
       <section className="bg-white py-12 text-center">
        <p className="text-gray-700 text-lg mb-4">
            Want more expert advice?
        </p>
         <button
            // In a real application, this button would fetch more blog posts
            className="inline-block cursor-pointer bg-[#D4AF37] text-[#0A2342] font-bold py-3 px-8 
                       rounded-lg hover:bg-yellow-400 transition duration-300 text-lg"
          >
            Load More Posts
          </button>
      </section>
    </main>
  );
};

export default BlogPost;