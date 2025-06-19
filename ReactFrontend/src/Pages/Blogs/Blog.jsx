import React, { useEffect, useState } from "react";
import sanityClient from "../../Utlity/sanityClient";
import { Link } from "react-router-dom";

const Blog = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    sanityClient
      .fetch(
        `*[_type == "post"]{
          _id,
          title,
          slug,
          publishedAt,
          mainImage {
            asset->{
              _id,
              url
            }
          },
          author->{
            name,
            image {
              asset->{
                url
              }
            }
          },
          categories[]->{
            title
          },
          body
        }`
      )
      .then((data) => {
        setPosts(Array.isArray(data) ? data : [data]);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message || "Error fetching posts");
        setLoading(false);
      });
  }, []);

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen text-gray-500 text-lg">
        Loading...
      </div>
    );
  if (error)
    return (
      <div className="flex justify-center items-center h-screen text-red-600 text-lg">
        Error: {error}
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-6 sm:px-12 lg:px-24">
      <h1 className="text-4xl font-extrabold text-gray-900 mb-12 text-center">
        Blog Posts
      </h1>

      {posts.length === 0 ? (
        <p className="text-center text-gray-600 text-lg">No posts found.</p>
      ) : (
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <article
              key={post._id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              {post.mainImage?.asset?.url && (
                <img
                  src={post.mainImage.asset.url}
                  alt={post.title}
                  className="w-full h-48 object-cover"
                />
              )}
              <div className="p-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-2 hover:text-purple-600 cursor-pointer">
                  {post.title}
                </h2>

                <div className="flex items-center text-sm text-gray-500 mb-4">
                  {post.author?.image?.asset?.url && (
                    <img
                      src={post.author.image.asset.url}
                      alt={post.author.name}
                      className="w-8 h-8 rounded-full object-cover mr-3"
                    />
                  )}
                  <div>
                    <p>{post.author?.name || "Unknown Author"}</p>
                    <p>{new Date(post.publishedAt).toLocaleDateString()}</p>
                  </div>
                </div>

                {post.categories?.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {post.categories.map((cat, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 text-xs bg-purple-100 text-purple-700 rounded-full"
                      >
                        {cat.title}
                      </span>
                    ))}
                  </div>
                )}

                <p className="text-gray-700 text-sm line-clamp-3">
                  {/* Show a snippet of the first block of text if exists */}
                  {post.body && Array.isArray(post.body) && post.body.length > 0
                    ? post.body[0].children
                        ?.map((child) => child.text)
                        .join(" ")
                        .slice(0, 120) + "..."
                    : "No content available."}
                </p>
                <div className="mt-4">
                  <Link
                    to={`/blog/${post.slug.current}`}
                    className="inline-block px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition"
                  >
                    Read More
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
};

export default Blog;
