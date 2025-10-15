"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

interface Post {
  id: string;
  title: string;
  slug?: string;
  type: "scholarship" | "visa";
  image?: string;
  createdAt?: string;
}

interface RelatedAndRecentProps {
  relatedPosts?: Post[];
  recentPosts?: Post[];
  isLoading?: boolean;
}

export default function RelatedAndRecent({
  relatedPosts = [],
  recentPosts = [],
  isLoading = false,
}: RelatedAndRecentProps) {
  const [loading, setLoading] = useState(isLoading);

  // simulate delay when no data yet (optional)
  useEffect(() => {
    if (!relatedPosts.length && !recentPosts.length) {
      setLoading(true);
    } else {
      setLoading(false);
    }
  }, [relatedPosts, recentPosts]);

  const SkeletonCard = () => (
    <div className="animate-pulse border border-gray-200 rounded-xl p-4 shadow-sm">
      <div className="h-4 bg-gray-300 rounded w-3/4 mb-3"></div>
      <div className="h-4 bg-gray-200 rounded w-1/2"></div>
    </div>
  );

  const SkeletonListItem = () => (
    <div className="animate-pulse flex items-center gap-4 p-3 border border-gray-100 rounded-lg">
      <div className="w-16 h-16 bg-gray-200 rounded-md"></div>
      <div className="flex-1">
        <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
        <div className="h-3 bg-gray-200 rounded w-1/2"></div>
      </div>
    </div>
  );

  return (
    <div className="mt-12 space-y-10">
      {/* Related Posts */}
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          Related Posts
        </h2>
        {loading ? (
          <div className="grid md:grid-cols-3 gap-4">
            {Array.from({ length: 3 }).map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        ) : relatedPosts.length > 0 ? (
          <div className="grid md:grid-cols-3 gap-4">
            {relatedPosts.slice(0, 3).map((post) => (
              <motion.div
                key={post.id}
                whileHover={{ scale: 1.02 }}
                className="border border-gray-200 rounded-xl p-4 shadow-sm hover:shadow-md transition"
              >
                <Link
                  href={`/${post.type}s/${post.id}`}
                  className="text-blue-600 font-medium hover:underline"
                >
                  {post.title}
                </Link>
              </motion.div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-sm">No related posts available.</p>
        )}
      </div>

      {/* Recently Added */}
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          Recently Added
        </h2>
        {loading ? (
          <div className="space-y-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <SkeletonListItem key={i} />
            ))}
          </div>
        ) : recentPosts.length > 0 ? (
          <div className="space-y-4">
            {recentPosts.map((post) => {
              console.log("Recent post type:", post.type, "→", post.title);

              return (
                <Link
                  key={post.id}
                  href={`/${post.type}s/${post.id}`}
                  className="flex items-center gap-4 p-3 border border-gray-100 rounded-lg hover:shadow-md transition"
                >
                  {post.image && (
                    <div className="relative w-16 h-16 rounded-md overflow-hidden flex-shrink-0">
                      <Image
                        src={post.image}
                        alt={post.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}
                  <div>
                    <h3 className="text-gray-800 font-medium hover:text-blue-600 transition line-clamp-2">
                      {post.title}
                    </h3>
                    {post.createdAt && (
                      <p className="text-sm text-gray-500">
                        {new Date(post.createdAt).toLocaleDateString()}
                      </p>
                    )}
                  </div>
                </Link>
              );
            })}
          </div>
        ) : (
          <p className="text-gray-500 text-sm">No recent posts available.</p>
        )}
      </div>
    </div>
  );
}
