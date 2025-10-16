import Container from "./components/Container";
import Card from "./components/Card";
import axios from "./lib/axios";
import { Scholarship } from "./types";
import ErrorBlock from "./components/ErrorBlock";
import Link from "next/link";

export const revalidate = 60; // (optional) ISR every 60s

export const metadata = {
  title: "Scholarships | Explore Global Opportunities for Students",
  description:
    "Browse verified global scholarships from top institutions. Filter, explore, and apply for opportunities that match your dreams.",
  keywords: [
    "scholarships",
    "study abroad",
    "student funding",
    "education grants",
    "international scholarships",
    "university aid",
  ],
  openGraph: {
    title: "Scholarships | Explore Global Opportunities for Students",
    description:
      "Discover global scholarships and apply for verified funding opportunities.",
    url: "https://yoursite.com/",
    siteName: "Scholarship Finder",
    images: [
      {
        url: "https://yoursite.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Scholarship Finder - Global Opportunities",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Scholarships | Explore Global Opportunities",
    description:
      "Find and apply for verified scholarships worldwide with ease.",
    images: ["https://yoursite.com/og-image.jpg"],
  },
};

export default async function Home({
  searchParams,
}: {
  searchParams?: Promise<{ page?: string }>;
}) {
  const params = await searchParams;
  const page = Number(params?.page) || 1;
  const limit = 9;
  let data: Scholarship[] = [];
  let total = 0;
  let error: string | null = null;

  try {
    const res = await axios.get("/scholarships", {
      params: { page, limit },
      withCredentials: true,
    });
    data = res.data.data;
    total = res.data.total || 0;
  } catch (e: any) {
    console.error("❌ SSR Fetch error:", e);
    error =
      e?.response?.data?.message || e?.message || "Failed to load scholarships";
  }

  const totalPages = Math.ceil(total / limit);

  if (error) {
    return (
      <Container>
        <ErrorBlock message={error} />
      </Container>
    );
  }

  return (
    <Container>
      <header className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Scholarships</h1>
        <p className="text-gray-600 mb-4">
          Browse available scholarships and click to view details.
        </p>
      </header>

      {data && data.length > 0 ? (
        <>
          {/* Scholarships Grid */}
          <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {data.map((s) => (
              <article key={s._id}>
                <Card
                  href={`/scholarships/${s._id}`}
                  title={s.title}
                  subtitle={`${s.institution ?? ""} • ${s.hostCountry ?? ""}`}
                  date={s.createdAt}
                  image={typeof s.image === "string" ? s.image : s.image?.url}
                >
                  <p className="mt-2 text-sm text-gray-600 line-clamp-2">
                    {s.description}
                  </p>
                </Card>
              </article>
            ))}
          </section>

          {/* Pagination */}
          {totalPages > 1 && (
            <nav
              aria-label="Pagination"
              className="flex justify-center items-center gap-2 mt-10 flex-wrap"
            >
              {/* Previous */}
              {page > 1 && (
                <Link
                  href={`/?page=${page - 1}`}
                  className="px-4 py-2 border rounded-md hover:bg-gray-200"
                >
                  Previous
                </Link>
              )}

              {/* Page numbers */}
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (num) => {
                  if (
                    num === 1 ||
                    num === totalPages ||
                    Math.abs(num - page) <= 1
                  ) {
                    return (
                      <Link
                        key={num}
                        href={`/?page=${num}`}
                        className={`px-3 py-1 rounded-md border ${
                          num === page
                            ? "bg-gray-800 text-white"
                            : "hover:bg-gray-200"
                        }`}
                      >
                        {num}
                      </Link>
                    );
                  }

                  if (
                    (num === page - 2 && num > 1) ||
                    (num === page + 2 && num < totalPages)
                  ) {
                    return (
                      <span
                        key={`ellipsis-${num}`}
                        className="px-2 text-gray-500"
                      >
                        ...
                      </span>
                    );
                  }

                  return null;
                }
              )}

              {/* Next */}
              {page < totalPages && (
                <Link
                  href={`/?page=${page + 1}`}
                  className="px-4 py-2 border rounded-md hover:bg-gray-200"
                >
                  Next
                </Link>
              )}
            </nav>
          )}
        </>
      ) : (
        <p className="text-gray-500 text-center mt-10">
          No scholarships available at the moment.
        </p>
      )}
    </Container>
  );
}
