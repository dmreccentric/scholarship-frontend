import "./globals.css";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import { Toaster } from "react-hot-toast";

export const metadata = {
  title: "Browse through different scholarships",
  description: "Scholarship listing and visa guidance",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-gray-50 text-gray-900 dark:bg-gray-900 dark:text-gray-100">
        <NavBar />
        <Toaster
          position="top-right"
          toastOptions={{
            success: {
              style: {
                background: "#059669",
                color: "#fff",
              },
            },
            error: {
              style: {
                background: "#dc2626",
                color: "#fff",
              },
            },
          }}
        />
        <main className="py-8">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
