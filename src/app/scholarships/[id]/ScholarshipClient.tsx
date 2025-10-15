"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import axios from "../../lib/axios";
import ScholarshipSkeleton from "../../components/ScholarshipSkeleton";
import ErrorBlock from "../../components/ErrorBlock";
import {
  GraduationCap,
  Globe2,
  Calendar,
  Coins,
  Building2,
  BadgeCheck,
  Flag,
  Heart,
  Sparkles,
  Users,
} from "lucide-react";
import toast from "react-hot-toast";
import EnquiryModal from "@/app/components/EnquiryModal";

interface Scholarship {
  _id: string;
  title: string;
  institution: string;
  description: string;
  hostCountry: string;
  category: string;
  eligibleCountries: string[];
  reward: string;
  stipend: string;
  deadline: string | null;
  healthInsurance: boolean;
  ieltsRequired: boolean;
  fullyFunded: boolean;
  image?: string;
  createdAt?: string;
  updatedAt?: string;
}

interface Post {
  id: string;
  title: string;
  type: "scholarship" | "visa";
  image?: string;
  createdAt?: string;
}

export default function ScholarshipClient({ data }: { data: Scholarship }) {
  const [relatedPosts, setRelatedPosts] = useState<Post[]>([]);
  const [recentPosts, setRecentPosts] = useState<Post[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchExtraData = async () => {
      try {
        setLoading(true);
        const [relatedRes, recentRes] = await Promise.all([
          axios.get("/scholarships?limit=3"),
          axios.get("/scholarships?sort=-createdAt&limit=5"),
        ]);

        setRelatedPosts(
          relatedRes.data.data.map((s: any) => ({
            id: s._id,
            title: s.title,
            type: "scholarship",
            image: typeof s.image === "string" ? s.image : s.image?.url || "",
            createdAt: s.createdAt,
          }))
        );

        setRecentPosts(
          recentRes.data.data.map((s: any) => ({
            id: s._id,
            title: s.title,
            type: "scholarship",
            image: typeof s.image === "string" ? s.image : s.image?.url || "",
            createdAt: s.createdAt,
          }))
        );
      } catch (err: any) {
        console.error("⚠️ Error fetching related/recent posts:", err.message);
        setError("Failed to load related or recent scholarships.");
      } finally {
        setLoading(false);
      }
    };

    fetchExtraData();
  }, []);

  if (error) return <ErrorBlock message={error} />;
  if (loading) return <ScholarshipSkeleton />;

  return (
    <div className="space-y-12">
      {/* 🎓 Scholarship details section */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="bg-white dark:bg-gray-800 rounded-2xl shadow-md overflow-hidden"
      >
        {/* Cover Image */}
        {data.image && (
          <div className="relative w-full h-72 md:h-96 overflow-hidden">
            <Image
              src={data.image}
              alt={data.title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1200px"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
            <div className="absolute bottom-6 left-6">
              <h1 className="text-3xl md:text-4xl font-bold text-white drop-shadow-lg">
                {data.title}
              </h1>
              <p className="text-white/90 text-sm mt-1">
                {data.institution} — {data.hostCountry}
              </p>
            </div>
          </div>
        )}

        <div className="p-6 md:p-8 space-y-6">
          {/* Key info grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="flex items-center gap-3 text-gray-700">
              <Globe2 className="text-blue-600" />
              <span>
                <strong>Host Country:</strong> {data.hostCountry}
              </span>
            </div>
            <div className="flex items-center gap-3 text-gray-700">
              <Building2 className="text-green-600" />
              <span>
                <strong>Institution:</strong> {data.institution}
              </span>
            </div>
            <div className="flex items-center gap-3 text-gray-700">
              <Calendar className="text-rose-600" />
              <span>
                <strong>Deadline:</strong>{" "}
                {data.deadline ? data.deadline : "Not specified"}
              </span>
            </div>
            <div className="flex items-center gap-3 text-gray-700">
              <GraduationCap className="text-purple-600" />
              <span>
                <strong>Category:</strong> {data.category}
              </span>
            </div>
            <div className="flex items-center gap-3 text-gray-700">
              <Coins className="text-yellow-500" />
              <span>
                <strong>Reward:</strong> {data.reward}
              </span>
            </div>
            <div className="flex items-center gap-3 text-gray-700">
              <Heart className="text-red-500" />
              <span>
                <strong>Stipend:</strong> {data.stipend}
              </span>
            </div>
          </div>

          {/* Funding status & requirements */}
          <div className="flex flex-wrap gap-3 pt-3">
            {data.fullyFunded && (
              <span className="inline-flex items-center gap-2 bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                <Sparkles className="w-4 h-4" /> Fully Funded
              </span>
            )}
            {data.healthInsurance && (
              <span className="inline-flex items-center gap-2 bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                <Heart className="w-4 h-4" /> Health Insurance
              </span>
            )}
            <span
              className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium ${
                data.ieltsRequired
                  ? "bg-rose-100 text-rose-700"
                  : "bg-gray-100 text-gray-700"
              }`}
            >
              <BadgeCheck className="w-4 h-4" />{" "}
              {data.ieltsRequired ? "IELTS Required" : "IELTS Not Required"}
            </span>
          </div>

          {/* Eligible Countries */}
          {data.eligibleCountries?.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
                <Flag className="text-blue-600" /> Eligible Countries
              </h3>
              <div className="flex flex-wrap gap-2">
                {data.eligibleCountries.map((country, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                  >
                    {country}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Description */}
          <div>
            <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
              <Users className="text-indigo-600" /> Description
            </h3>
            <p className="text-gray-700 leading-relaxed whitespace-pre-line">
              {data.description}
            </p>
          </div>

          {/* Action buttons */}
          <div className="pt-6 flex flex-wrap gap-4">
            <Link
              href="/scholarships"
              className="inline-block px-5 py-2.5 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition"
            >
              ← Back to Scholarships
            </Link>

            <button
              onClick={() => setShowModal(true)}
              className="inline-block px-5 py-2.5 text-sm font-medium text-white bg-emerald-600 rounded-lg hover:bg-emerald-700 transition"
            >
              Enquire Now
            </button>
          </div>
        </div>
      </motion.div>

      {/* 📎 Related & Recent Section */}
      <div className="mt-12 space-y-10">
        {/* Related Scholarships */}
        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Related Scholarships
          </h2>
          {relatedPosts.length > 0 ? (
            <div className="grid md:grid-cols-3 gap-4">
              {relatedPosts.map((post) => (
                <motion.div
                  key={post.id}
                  whileHover={{ scale: 1.02 }}
                  className="border border-gray-200 rounded-xl p-4 shadow-sm hover:shadow-md transition"
                >
                  <Link
                    href={`/scholarships/${post.id}`}
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
          {recentPosts.length > 0 ? (
            <div className="space-y-4">
              {recentPosts.map((post) => (
                <Link
                  key={post.id}
                  href={`/scholarships/${post.id}`}
                  className="flex items-center gap-4 p-3 border border-gray-100 rounded-lg hover:shadow-md transition"
                >
                  {typeof post.image === "string" &&
                  post.image.trim() !== "" ? (
                    <div className="relative w-16 h-16 rounded-md overflow-hidden flex-shrink-0">
                      <Image
                        src={post.image}
                        alt={post.title}
                        fill
                        sizes="(max-width: 640px) 80px, (max-width: 1024px) 100px, 120px"
                        className="object-cover"
                      />
                    </div>
                  ) : (
                    <div className="w-16 h-16 bg-gray-100 text-gray-400 flex items-center justify-center rounded-md flex-shrink-0 text-xs">
                      No Image
                    </div>
                  )}

                  <div>
                    <h3 className="text-gray-800 font-medium hover:text-blue-600 transition">
                      {post.title}
                    </h3>
                    {post.createdAt && (
                      <p className="text-sm text-gray-500">
                        {new Date(post.createdAt).toLocaleDateString()}
                      </p>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-sm">No recent posts available.</p>
          )}
        </div>
      </div>

      <EnquiryModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        itemTitle={data.title}
        type="Schorlarship"
      />
    </div>
  );
}
