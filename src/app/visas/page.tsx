import axios from "../lib/axios";
import { Visa } from "../types";
import Container from "../components/Container";
import Card from "../components/Card";
import ErrorBlock from "../components/ErrorBlock";
import Pagination from "../components/Pagination";
import Script from "next/script";

export const metadata = {
  title: "Visa Opportunities | Global Visa Programs & Immigration Options",
  description:
    "Explore global visa programs, work opportunities, and study options. Find detailed information on visa requirements, eligibility, and application processes.",
  keywords: [
    "visa opportunities",
    "immigration programs",
    "work visas",
    "student visas",
    "visa requirements",
    "travel authorization",
    "international work",
  ],
  openGraph: {
    title: "Visa Opportunities | Explore Global Visa Programs",
    description:
      "Discover verified visa opportunities for work, study, and travel worldwide. Stay informed about global immigration updates and requirements.",
    url: "https://yoursite.com/visas",
    siteName: "Scholarship Finder",
    images: [
      {
        url: "https://yoursite.com/og-image-visas.jpg",
        width: 1200,
        height: 630,
        alt: "Visa Programs Worldwide",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Visa Opportunities | Global Visa and Immigration Updates",
    description:
      "Explore work, study, and travel visa programs around the world.",
    images: ["https://yoursite.com/og-image-visas.jpg"],
  },
};

export const revalidate = 60;

export default async function VisaPage({
  searchParams,
}: {
  searchParams?: Promise<{ page?: string }>;
}) {
  const params = await searchParams;
  const page = Number(params?.page) || 1;
  const limit = 9;

  let data: Visa[] = [];
  let total = 0;
  let error: string | null = null;

  try {
    const res = await axios.get("/visas", {
      params: { page, limit },
    });
    data = res.data.data;
    total = res.data.total || 0;
  } catch (e: any) {
    console.error("❌ Error fetching visas:", e);
    error = e?.response?.data?.message || e?.message || "Failed to load visas.";
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
      {/* ✅ JSON-LD Schema Script (inside the component, after data is defined) */}
      <Script
        id="visa-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ItemList",
            name: "Visa Opportunities",
            itemListElement: data.map((visa: Visa, index: number) => ({
              "@type": "ListItem",
              position: index + 1,
              name: visa.title,
              url: `https://yoursite.com/visas/${visa._id}`,
            })),
          }),
        }}
      />

      <header className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Visa Opportunities</h1>
        <p className="text-gray-600 mb-4">
          Explore visa programs and opportunities around the world.
        </p>
      </header>

      <main>
        {data.length > 0 ? (
          <>
            <div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
              aria-label="Visa listings"
            >
              {data.map((visa: Visa) => (
                <article key={visa._id}>
                  <Card
                    href={`/visas/${visa._id}`}
                    title={`${visa.title} — ${visa.country}`}
                    subtitle={visa.processingTime || ""}
                    date={visa.createdAt}
                    image={
                      typeof visa.image === "string"
                        ? visa.image
                        : visa.image?.url
                    }
                  >
                    <p className="mt-2 text-sm text-gray-600 line-clamp-2">
                      {visa.description}
                    </p>
                  </Card>
                </article>
              ))}
            </div>

            {/* Pagination */}
            <Pagination
              currentPage={page}
              totalPages={totalPages}
              basePath="/visas"
            />
          </>
        ) : (
          <p className="text-gray-500 text-center mt-10">
            No visa opportunities available at the moment.
          </p>
        )}
      </main>
    </Container>
  );
}
