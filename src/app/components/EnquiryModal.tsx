"use client";

import { motion } from "framer-motion";
import toast from "react-hot-toast";
import axios from "../lib/axios";
import { FaTiktok, FaWhatsapp, FaEnvelope } from "react-icons/fa";
import Script from "next/script"; // ✅ For structured data (SEO)

interface EnquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  itemTitle: string;
  type: string;
}

export default function EnquiryModal({
  isOpen,
  onClose,
  itemTitle,
  type,
}: EnquiryModalProps) {
  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const name = (
      e.currentTarget.elements.namedItem("name") as HTMLInputElement
    ).value;
    const email = (
      e.currentTarget.elements.namedItem("email") as HTMLInputElement
    ).value;
    const message = (
      e.currentTarget.elements.namedItem("message") as HTMLTextAreaElement
    ).value;

    try {
      await axios.post("/enquiry", {
        name,
        email,
        message,
        scholarship: itemTitle,
      });
      toast.success("Enquiry sent successfully! 🎉");
      onClose();

      const text = `Hello! My name is ${name}. I just enquired about: ${itemTitle}.`;
      window.open(
        `https://wa.me/447392893665?text=${encodeURIComponent(text)}`,
        "_blank"
      );
    } catch (err) {
      console.error("Error sending enquiry:", err);
      toast.error("Failed to send enquiry. Please try again.");
    }
  };

  return (
    <>
      {/* ✅ Structured Data (helps Google understand this as a contact/enquiry form) */}
      <Script
        id="enquiry-jsonld"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ContactPage",
            name: `Enquiry for ${itemTitle}`,
            description: `Send an enquiry about ${itemTitle} ${type}.`,
            url: "https://yourdomain.com/contact",
          }),
        }}
      />

      {/* 🔒 Modal Overlay */}
      <div
        className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4"
        role="dialog"
        aria-modal="true"
        aria-labelledby="enquiry-title"
        aria-describedby="enquiry-description"
      >
        <motion.section
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg max-w-md w-full relative"
        >
          {/* ❌ Close Button */}
          <button
            onClick={onClose}
            aria-label="Close enquiry modal"
            className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
          >
            ✕
          </button>

          {/* 🧠 Heading + Description */}
          <header>
            <h2
              id="enquiry-title"
              className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2"
            >
              Enquire About This {type}
            </h2>
            <p
              id="enquiry-description"
              className="text-gray-600 dark:text-gray-300 text-sm mb-4"
            >
              Fill in your details below and we’ll get back to you shortly.
            </p>
          </header>

          {/* 📄 Form */}
          <form
            onSubmit={handleSubmit}
            className="space-y-4"
            aria-label="Enquiry form"
          >
            <label htmlFor="name" className="sr-only">
              Your Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              placeholder="Your Name"
              autoComplete="name"
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />

            <label htmlFor="email" className="sr-only">
              Your Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="Your Email"
              autoComplete="email"
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />

            <label htmlFor="message" className="sr-only">
              Your Message
            </label>
            <textarea
              id="message"
              name="message"
              placeholder="Your message"
              rows={3}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 text-gray-700"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white"
              >
                Send
              </button>
            </div>
          </form>

          <div
            className="border-t border-gray-200 dark:border-gray-700 my-4"
            aria-hidden="true"
          />

          {/* 📱 Contact Buttons */}
          <nav aria-label="Contact options" className="flex flex-col gap-3">
            <button
              className="flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg"
              onClick={() =>
                window.open(
                  `https://wa.me/447392893665?text=Hello!%20I'm%20interested%20in%20${encodeURIComponent(
                    itemTitle
                  )}.`,
                  "_blank"
                )
              }
            >
              <FaWhatsapp aria-hidden="true" /> WhatsApp
            </button>

            <button
              className="flex items-center justify-center gap-2 bg-black hover:opacity-90 text-white px-4 py-2 rounded-lg"
              onClick={() =>
                window.open(
                  "https://www.tiktok.com/@hs.consultancyservice",
                  "_blank"
                )
              }
            >
              <FaTiktok aria-hidden="true" /> TikTok
            </button>

            <button
              className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
              onClick={() =>
                window.open(
                  `mailto:hibasameera06@gmail.com?subject=Enquiry:%20${encodeURIComponent(
                    itemTitle
                  )}`,
                  "_blank"
                )
              }
            >
              <FaEnvelope aria-hidden="true" /> Email
            </button>
          </nav>
        </motion.section>
      </div>
    </>
  );
}
