import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";
import axios from "../lib/axios";
import Container from "../components/Container";
import ErrorBlock from "../components/ErrorBlock";

// ✅ Dynamically import Pagination for faster FCP
const Pagination = dynamic(() => import("../components/Pagination"), {
  loading: () => <p className="text-center text-gray-500">Loading...</p>,
});

export const revalidate = 60; // ISR every 60s

type Testimonial = {
  _id: string;
  name?: string;
  profilePicture?: { url: string; public_id?: string; resource_type?: "image" };
  message: string;
  media?: {
    url: string;
    public_id?: string;
    resource_type?: "image" | "video";
  };
  createdAt: string;
};

export default async function TestimonialsPage({
  searchParams,
}: {
  searchParams?: Promise<{ page?: string }>;
}) {
  const params = await searchParams;
  const page = Number(params?.page) || 1;
  const limit = 12;
  let data: Testimonial[] = [];
  let total = 0;
  let error: string | null = null;

  try {
    const res = await axios.get("/testimonials", { params: { page, limit } });
    data = res.data.data;
    total = res.data.total || 0;
  } catch (e: any) {
    console.error("❌ Error fetching testimonials:", e);
    error =
      e?.response?.data?.message ||
      e?.message ||
      "Failed to load testimonials.";
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
      {/* ✅ Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ItemList",
            itemListElement: data.map((t, i) => ({
              "@type": "Review",
              position: i + 1,
              author: t.name || "Anonymous",
              reviewBody: t.message,
              datePublished: t.createdAt,
            })),
          }),
        }}
      />

      <section className="mb-8 text-center">
        <h1 className="text-3xl font-bold mb-2">Testimonials</h1>
        <p className="text-gray-600 mb-4">
          See what our clients and students have to say about their experience.
        </p>
      </section>

      {data?.length > 0 ? (
        <section
          aria-label="Client testimonials"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {data.map((t) => (
            <article
              key={t._id}
              className="bg-white dark:bg-gray-800 shadow-md rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-700 flex flex-col"
              itemScope
              itemType="https://schema.org/Review"
            >
              {/* Header */}
              <header className="flex items-center gap-3 p-4 border-b border-gray-100 dark:border-gray-700">
                {t.profilePicture?.url ? (
                  <div className="relative w-12 h-12">
                    <Image
                      src={t.profilePicture.url}
                      alt={t.name || "User profile"}
                      fill
                      className="rounded-full object-cover border-2 border-purple-500"
                      sizes="48px"
                      priority={false}
                    />
                  </div>
                ) : (
                  <div
                    className="h-12 w-12 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 border-2 border-gray-300"
                    aria-hidden="true"
                  >
                    ?
                  </div>
                )}
                <div>
                  <p className="font-semibold text-gray-800 dark:text-gray-200">
                    {t.name || "Anonymous"}
                  </p>
                  <time
                    itemProp="datePublished"
                    className="text-xs text-gray-500"
                  >
                    {new Date(t.createdAt).toLocaleDateString()}
                  </time>
                </div>
              </header>

              {/* Message + Media */}
              <div className="p-4 flex-1" itemProp="reviewBody">
                <p className="text-gray-700 dark:text-gray-300 italic mb-3 line-clamp-4">
                  “{t.message}”
                </p>

                {t.media?.url && (
                  <figure className="mt-2">
                    {t.media.resource_type === "video" ? (
                      <video
                        src={t.media.url}
                        controls
                        preload="metadata"
                        className="w-full h-64 rounded-md object-cover"
                        itemProp="video"
                      />
                    ) : (
                      <div className="relative w-full h-64">
                        <Image
                          src={t.media.url}
                          alt="testimonial media"
                          fill
                          sizes="(max-width:768px) 100vw, 50vw"
                          className="rounded-md object-cover"
                          loading="lazy"
                        />
                      </div>
                    )}
                    {t.name && (
                      <figcaption className="sr-only">
                        {t.name} testimonial
                      </figcaption>
                    )}
                  </figure>
                )}
              </div>
            </article>
          ))}
        </section>
      ) : (
        <p className="text-gray-500 text-center mt-10">
          No testimonials available at the moment.
        </p>
      )}

      <Pagination
        currentPage={page}
        totalPages={totalPages}
        basePath="/testimonials"
      />
    </Container>
  );
}
