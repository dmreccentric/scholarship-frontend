"use client";

import { usePathname } from "next/navigation";
import NavBar from "./NavBar";
import Footer from "./Footer";
import { useEffect, useState } from "react";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [isNotFound, setIsNotFound] = useState(false);

  useEffect(() => {
    // Detect if Next.js rendered the not-found.tsx component
    const el = document.querySelector('[data-not-found="true"]');
    setIsNotFound(!!el);
  }, [pathname]);

  if (isNotFound) {
    return (
      <main id="content" role="main" className="min-h-screen">
        {children}
      </main>
    );
  }

  return (
    <>
      <NavBar />
      <main id="content" role="main" className="min-h-screen">
        {children}
      </main>
      <Footer />
    </>
  );
}
