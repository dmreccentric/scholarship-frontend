"use client";

import { motion } from "framer-motion";
import toast from "react-hot-toast";
import axios from "../lib/axios";
import { FaTiktok, FaWhatsapp, FaEnvelope } from "react-icons/fa";

interface EnquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  itemTitle: string; // can be scholarship or visa
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
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg max-w-md w-full relative"
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
        >
          ✕
        </button>

        <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-3">
          Enquire About This {type}
        </h2>
        <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
          Fill in your details, and we’ll get back to you shortly.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <textarea
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

        <div className="border-t border-gray-200 dark:border-gray-700 my-4" />

        <div className="flex flex-col gap-3">
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
            <FaWhatsapp /> WhatsApp
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
            <FaTiktok /> TikTok
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
            <FaEnvelope /> Email
          </button>
        </div>
      </motion.div>
    </div>
  );
}
