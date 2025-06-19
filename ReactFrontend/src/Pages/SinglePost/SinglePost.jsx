import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import sanityClient from "../../Utlity/sanityClient";

const SinglePost = () => {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    sanityClient
      .fetch(
        `*[_type == "post" && slug.current == $slug][0]{
          title,
          slug,
          publishedAt,
          mainImage {
            asset -> {
              _id,
              url
            }
          },
          author -> {
            name,
            image {
              asset -> {
                url
              }
            }
          },
          categories[] -> {
            title
          },
          body
        }`,
        { slug }
      )
      .then((data) => setPost(data))
      .catch((err) => setError(err.message));
  }, [slug]);

  if (error)
    return (
      <div className="flex justify-center items-center h-screen text-red-600 text-lg">
        Error: {error}
      </div>
    );

  if (!post)
    return (
      <div className="flex justify-center items-center h-screen text-gray-600 text-lg">
        Loading post...
      </div>
    );

  return (
    <section className="min-h-screen bg-gray-50 px-4 py-12">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-xl p-8">
        {post.mainImage?.asset?.url && (
          <img
            src={post.mainImage.asset.url}
            alt={post.title}
            className="w-full h-80 object-cover rounded-xl mb-6"
          />
        )}

        <h1 className="text-4xl font-bold text-gray-800 mb-2">{post.title}</h1>

        <div className="flex items-center mb-4 gap-4">
          {post.author?.image?.asset?.url && (
            <img
              src={post.author.image.asset.url}
              alt={post.author.name}
              className="w-10 h-10 rounded-full object-cover"
            />
          )}
          <div>
            <p className="text-sm font-medium text-gray-700">
              {post.author?.name}
            </p>
            <p className="text-xs text-gray-500">
              {new Date(post.publishedAt).toLocaleDateString()}
            </p>
          </div>
        </div>

        {post.categories?.length > 0 && (
          <div className="flex gap-2 mb-6 flex-wrap">
            {post.categories.map((cat, index) => (
              <span
                key={index}
                className="px-3 py-1 text-xs bg-purple-100 text-purple-700 rounded-full"
              >
                {cat.title}
              </span>
            ))}
          </div>
        )}

        <div className="space-y-4 text-gray-700 text-lg">
          {post.body && Array.isArray(post.body) ? (
            post.body.map((block, index) => (
              <p key={index} className="leading-relaxed">
                {block.children?.map((child, i) => (
                  <span key={i}>{child.text}</span>
                ))}
              </p>
            ))
          ) : (
            <p>No content available.</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default SinglePost;
