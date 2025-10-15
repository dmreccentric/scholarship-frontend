"use client";
import React from "react";
import Link from "next/link";
import {
  Instagram,
  Facebook,
  Linkedin,
  Twitter,
  MessageCircle,
} from "lucide-react";
import { FaTiktok } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 shadow-inner mt-16 rounded-t-3xl">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-center md:text-left">
          {/* Brand */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
              HS Consultancy Services
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
              Empowering students with global opportunities. Explore, apply, and
              achieve your dreams with us.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
              Quick Links
            </h3>
            <ul className="space-y-2 text-gray-600 dark:text-gray-400 text-sm">
              <li>
                <Link
                  href="/about"
                  className="hover:text-blue-600 dark:hover:text-blue-400 transition"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="hover:text-blue-600 dark:hover:text-blue-400 transition"
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy-policy"
                  className="hover:text-blue-600 dark:hover:text-blue-400 transition"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="hover:text-blue-600 dark:hover:text-blue-400 transition"
                >
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
              Connect With Us
            </h3>
            <div className="flex justify-center md:justify-start space-x-4">
              {[
                {
                  href: "https://instagram.com/yourusername",
                  icon: <Instagram size={22} className="text-pink-500" />,
                },
                {
                  href: "https://wa.me/+447392893665",
                  icon: <MessageCircle size={22} className="text-green-500" />,
                },
                {
                  href: "https://www.facebook.com/consulant.sameera",
                  icon: <Facebook size={22} className="text-blue-600" />,
                },
                {
                  href: "tiktok.com/@hs.consultancyservice",
                  icon: <FaTiktok size={22} className="text-sky-500" />,
                },
              ].map((social, i) => (
                <a
                  key={i}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-gray-100 dark:bg-gray-800 rounded-full hover:scale-110 transition-transform duration-300 shadow-sm"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-200 dark:border-gray-700 mt-10 pt-6 text-center text-sm text-gray-500 dark:text-gray-400">
          © {new Date().getFullYear()}{" "}
          <span className="font-medium text-gray-800 dark:text-gray-200">
            HS Consultancy Services
          </span>
          . All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
