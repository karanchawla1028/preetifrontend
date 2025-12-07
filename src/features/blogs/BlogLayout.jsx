import React, { useMemo } from "react";
import { motion } from "framer-motion";

const BlogsLayout = ({ blogs, getCategoryName }) => {
  // Group by categoryId
  const groupedBlogs = useMemo(() => {
    const groups = {};
    blogs.forEach((blog) => {
      if (!groups[blog.categoryId]) groups[blog.categoryId] = [];
      groups[blog.categoryId].push(blog);
    });
    return groups;
  }, [blogs]);

  return (
    <div className="w-full p-6 space-y-10">
      {Object.entries(groupedBlogs).map(([categoryId, items]) => (
        <div key={categoryId} className="space-y-4">
          {/* Category Name */}
          <h2 className="text-2xl font-semibold">
            {getCategoryName(Number(categoryId))}
          </h2>

          {/* Horizontal Scroll List */}
          <div className="relative">
            <div className="flex gap-4 overflow-x-auto scrollbar-hide snap-x snap-mandatory py-2">
              {items.map((blog) => (
                <motion.div
                  key={blog.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="min-w-[250px] snap-start bg-white shadow-md rounded-xl overflow-hidden border hover:scale-105 transition duration-300 cursor-pointer"
                >
                  <img
                    src={blog.thumbnailUrl}
                    alt={blog.title}
                    className="w-full h-40 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="text-lg font-semibold line-clamp-2">
                      {blog.title}
                    </h3>
                    <p className="text-gray-600 text-sm mt-1 line-clamp-2">
                      {blog.excerpt}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BlogsLayout;
