import axios from "../lib/axios";
import Container from "../components/Container";
import ErrorBlock from "../components/ErrorBlock";
import Link from "next/link";

export const revalidate = 60; // ISR every 60s

type Testimonial = {
  _id: string;
  name?: string; // optional in case you add later
  profilePicture?: {
    url: string;
    public_id?: string;
    resource_type?: "image";
  };
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
  searchParams?: { page?: string };
}) {
  const page = Number(searchParams?.page) || 1;
  const limit = 12;
  let data: Testimonial[] = [];
  let total = 0;
  let error: string | null = null;

  try {
    const res = await axios.get("/testimonials", {
      params: { page, limit },
    });
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
      <section className="mb-8 text-center">
        <h1 className="text-3xl font-bold mb-2">Testimonials</h1>
        <p className="text-gray-600 mb-4">
          See what our clients and students have to say about their experience.
        </p>
      </section>

      {data && data.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.map((t) => (
            <div
              key={t._id}
              className="bg-white dark:bg-gray-800 shadow-md rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-700 flex flex-col"
            >
              {/* User info header */}
              <div className="flex items-center gap-3 p-4 border-b border-gray-100 dark:border-gray-700">
                {t.profilePicture?.url ? (
                  <img
                    src={t.profilePicture.url}
                    alt={t.name || "User profile"}
                    className="h-12 w-12 rounded-full object-cover border-2 border-purple-500"
                  />
                ) : (
                  <div className="h-12 w-12 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 border-2 border-gray-300">
                    ?
                  </div>
                )}
                <div>
                  <p className="font-semibold text-gray-800 dark:text-gray-200">
                    {t.name || "Anonymous"}
                  </p>
                  <p className="text-xs text-gray-500">
                    {new Date(t.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>

              {/* Message */}
              <div className="p-4 flex-1">
                <p className="text-gray-700 dark:text-gray-300 italic mb-3 line-clamp-4">
                  “{t.message}”
                </p>

                {/* Media */}
                {t.media?.url && (
                  <div className="mt-2">
                    {t.media.resource_type === "video" ? (
                      <video
                        src={t.media.url}
                        controls
                        className="w-full h-96 rounded-md object-full"
                      />
                    ) : (
                      <img
                        src={t.media.url}
                        alt="testimonial media"
                        className="w-full h-64 rounded-md object-cover"
                      />
                    )}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500 text-center mt-10">
          No testimonials available at the moment.
        </p>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 mt-10 flex-wrap">
          {page > 1 && (
            <Link
              href={`/testimonials?page=${page - 1}`}
              className="px-4 py-2 border rounded-md hover:bg-gray-200"
            >
              Previous
            </Link>
          )}

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => {
            if (num === 1 || num === totalPages || Math.abs(num - page) <= 1) {
              return (
                <Link
                  key={num}
                  href={`/testimonials?page=${num}`}
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
                <span key={`ellipsis-${num}`} className="px-2 text-gray-500">
                  ...
                </span>
              );
            }

            return null;
          })}

          {page < totalPages && (
            <Link
              href={`/testimonials?page=${page + 1}`}
              className="px-4 py-2 border rounded-md hover:bg-gray-200"
            >
              Next
            </Link>
          )}
        </div>
      )}
    </Container>
  );
}
