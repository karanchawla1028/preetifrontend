import { useDispatch, useSelector } from "react-redux";
import BlogsLayout from "./BlogLayout";
import { useEffect } from "react";
import { getBlogsList } from "../../toolkit/slices/blogSlice";

const getCategoryName = (id) => {
  const categoryMap = {
    1: "Plastic Recycling",
    2: "Sustainability",
    3: "Waste Management",
  };
  return categoryMap[id] || "Unknown Category";
};

export default function BlogPage() {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.blogs.blogList);

  useEffect(() => {
    dispatch(getBlogsList());
  }, [dispatch]);

  return (
    <div>
      <BlogsLayout
        blogs={data?.length > 0 ? data : []}
        getCategoryName={getCategoryName}
      />
    </div>
  );
}
