"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Home, ArrowLeft } from "lucide-react";

export default function NotFound() {
  const router = useRouter();

  return (
    <main
      data-not-found="true"
      className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 px-6 text-center"
      role="main"
      aria-label="404 page not found"
    >
      <motion.h1
        className="text-[120px] font-extrabold text-blue-600 drop-shadow-sm"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        404
      </motion.h1>

      <motion.h2
        className="text-2xl md:text-3xl font-semibold text-gray-800"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        Oops! Page not found.
      </motion.h2>

      <motion.p
        className="mt-3 text-gray-600 max-w-md"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        The page you’re looking for doesn’t exist or has been moved.
      </motion.p>

      <motion.div
        className="flex gap-4 mt-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 px-5 py-2.5 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-full font-medium transition-all"
        >
          <ArrowLeft size={18} /> Go Back
        </button>

        <button
          onClick={() => router.push("/")}
          className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-full font-medium transition-all shadow-md"
        >
          <Home size={18} /> Home
        </button>
      </motion.div>
    </main>
  );
}
