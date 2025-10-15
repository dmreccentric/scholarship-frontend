"use client";

import { motion } from "framer-motion";

export default function PrivacyPolicyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-8 space-y-6"
      >
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
          Privacy Policy
        </h1>
        <p className="text-gray-700 dark:text-gray-300">
          At HS Consultancy, we value your privacy. This policy explains how we
          collect, use, and protect your personal information when you use our
          website and services.
        </p>

        <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
          1. Information We Collect
        </h2>
        <p className="text-gray-700 dark:text-gray-300">
          We may collect your name, email address, and other contact details
          when you submit forms or make enquiries on our website.
        </p>

        <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
          2. How We Use Your Information
        </h2>
        <p className="text-gray-700 dark:text-gray-300">
          Your information is used to respond to enquiries, provide updates on
          scholarships or visa opportunities, and improve our services.
        </p>

        <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
          3. Data Security
        </h2>
        <p className="text-gray-700 dark:text-gray-300">
          We use secure systems and encryption to protect your personal data.
          However, no system is 100% secure, so please be cautious when sharing
          information online.
        </p>

        <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
          4. Contact Us
        </h2>
        <p className="text-gray-700 dark:text-gray-300">
          If you have any questions about this policy, contact us at{" "}
          <a
            href="mailto:hibasameera06@gmail.com"
            className="text-blue-600 hover:underline"
          >
            hibasameera06@gmail.com
          </a>
          .
        </p>
      </motion.section>
    </div>
  );
}
