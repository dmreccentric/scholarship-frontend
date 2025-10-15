"use client";

import { motion } from "framer-motion";

export default function TermsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-8 space-y-6"
      >
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
          Terms and Conditions
        </h1>

        <p className="text-gray-700 dark:text-gray-300">
          By accessing and using this website, you agree to comply with and be
          bound by the following terms and conditions. Please read them
          carefully.
        </p>

        <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
          1. Use of Our Website
        </h2>
        <p className="text-gray-700 dark:text-gray-300">
          You agree to use this website for lawful purposes only and not engage
          in any activity that could harm or disrupt the website or its users.
        </p>

        <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
          2. Intellectual Property
        </h2>
        <p className="text-gray-700 dark:text-gray-300">
          All content on this site, including text, graphics, and images, is the
          property of HS Consultancy unless otherwise stated.
        </p>

        <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
          3. Limitation of Liability
        </h2>
        <p className="text-gray-700 dark:text-gray-300">
          HS Consultancy is not responsible for any loss or damage arising from
          your use of this site or reliance on any information provided here.
        </p>

        <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
          4. Changes to Terms
        </h2>
        <p className="text-gray-700 dark:text-gray-300">
          We reserve the right to modify these terms at any time. Continued use
          of the site means you accept any updated terms.
        </p>

        <p className="text-gray-700 dark:text-gray-300">
          If you have questions about these terms, contact us at{" "}
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
