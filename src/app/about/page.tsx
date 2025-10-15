"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function AboutPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-8 space-y-6"
      >
        <div className="flex flex-col md:flex-row items-center gap-6">
          <Image
            src="/her-photo.jpg"
            alt="About HS Consultancy"
            width={300}
            height={300}
            className="rounded-2xl object-cover shadow-md"
          />
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-3">
              About HS Consultancy
            </h1>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              HS Consultancy is dedicated to connecting students and
              professionals with global opportunities. Whether you’re looking
              for scholarships, visa assistance, or expert educational advice,
              we’re here to guide you every step of the way.
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
            Our Mission
          </h2>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            To empower students through access to world-class education by
            providing transparent, personalized, and reliable guidance for
            scholarships, visas, and admissions worldwide.
          </p>
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
            What We Offer
          </h2>
          <ul className="list-disc pl-5 text-gray-700 dark:text-gray-300 space-y-2">
            <li>Comprehensive scholarship listings and application support</li>
            <li>Visa guidance and document preparation</li>
            <li>University application assistance</li>
            <li>Career and academic counseling</li>
          </ul>
        </div>
      </motion.section>
    </div>
  );
}
