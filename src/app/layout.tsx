import "./globals.css";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import { Toaster } from "react-hot-toast";
import Script from "next/script";
import type { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL("https://yoursite.com"),
  title: {
    default: "Scholarship Finder | Explore Global Opportunities",
    template: "%s | Scholarship Finder",
  },
  description:
    "Find and apply for verified global scholarships. Browse opportunities by country, institution, or funding type.",
  keywords: [
    "scholarships",
    "education funding",
    "study abroad",
    "international students",
    "university aid",
  ],
  authors: [{ name: "Scholarship Finder Team" }],
  openGraph: {
    title: "Scholarship Finder",
    description:
      "Discover scholarships worldwide and apply directly to verified programs.",
    url: "https://yoursite.com",
    siteName: "Scholarship Finder",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Scholarship Finder Website Preview",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Scholarship Finder | Verified Global Opportunities",
    description:
      "Explore verified scholarships from top institutions around the world.",
    images: ["/og-image.jpg"],
    creator: "@ScholarshipFinder",
  },
  alternates: {
    canonical: "https://yoursite.com",
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-XXXXXXXXXX');
          `}
        </Script>
      </head>

      <body className="bg-gray-50 text-gray-900 dark:bg-gray-900 dark:text-gray-100">
        <NavBar />
        <main id="content" role="main" className="min-h-screen">
          {children}
        </main>
        <Footer />

        {/* Global Toast Notifications */}
        <Toaster
          position="top-right"
          toastOptions={{
            success: {
              style: { background: "#059669", color: "#fff" },
            },
            error: {
              style: { background: "#dc2626", color: "#fff" },
            },
          }}
        />
      </body>
    </html>
  );
}
