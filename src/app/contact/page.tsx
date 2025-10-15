"use client";
import { useState } from "react";
import toast from "react-hot-toast";
import axios from "../lib/axios";
import { motion } from "framer-motion";
import { FaTiktok, FaWhatsapp, FaEnvelope } from "react-icons/fa";

export default function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await axios.post("/enquiry", {
        name,
        email,
        message,
        scholarship: "General Contact Form",
      });

      toast.success("Message sent successfully! 📬");
      setName("");
      setEmail("");
      setMessage("");

      // Optional: open WhatsApp automatically
      const text = `Hello! My name is ${name}. I just sent you a message via your contact page.`;
      window.open(
        `https://wa.me/447392893665?text=${encodeURIComponent(text)}`,
        "_blank"
      );
    } catch (error) {
      console.error("❌ Error sending message:", error);
      toast.error("Failed to send message. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="max-w-lg mx-auto p-8 bg-white dark:bg-gray-800 shadow-lg rounded-2xl space-y-4"
    >
      <h2 className="text-2xl font-bold text-center mb-4 text-gray-800 dark:text-gray-200">
        Contact Me
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Your Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          required
        />

        <input
          type="email"
          placeholder="Your Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          required
        />

        <textarea
          placeholder="Your Message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={6}
          className="w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition resize-none"
          required
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold transition disabled:opacity-50"
        >
          {loading ? "Sending..." : "Send Message"}
        </button>
      </form>

      {/* 🌐 Social Media Links */}
      <div className="mt-6 flex items-center justify-center gap-4 flex-wrap">
        {/* WhatsApp */}
        <button
          onClick={() =>
            window.open(
              "https://wa.me/447392893665?text=Hello!%20I%20want%20to%20know%20more%20about%20your%20services.",
              "_blank"
            )
          }
          className="w-12 h-12 rounded-full bg-green-500 hover:bg-green-600 flex items-center justify-center transition"
        >
          <FaWhatsapp className="w-6 h-6 text-white" />
        </button>

        {/* TikTok */}
        <button
          onClick={() =>
            window.open(
              "https://www.tiktok.com/@hs.consultancyservice",
              "_blank"
            )
          }
          className="w-12 h-12 rounded-full bg-black hover:opacity-90 flex items-center justify-center transition"
        >
          <FaTiktok className="w-6 h-6 text-white" />
        </button>

        {/* Email */}
        <button
          onClick={() =>
            window.open(
              "mailto:assettv481@gmail.com?subject=General%20Enquiry",
              "_blank"
            )
          }
          className="w-12 h-12 rounded-full bg-blue-600 hover:bg-blue-700 flex items-center justify-center transition"
        >
          <FaEnvelope className="w-6 h-6 text-white" />
        </button>
      </div>
    </motion.div>
  );
}
