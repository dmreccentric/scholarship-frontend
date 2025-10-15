import axios from "../lib/axios";
import { Visa } from "../types";
import Container from "../components/Container";
import Card from "../components/Card";
import ErrorBlock from "../components/ErrorBlock";
import Link from "next/link";

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
      <section className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Visa Opportunities</h1>
        <p className="text-gray-600 mb-4">
          Explore visa programs and opportunities around the world.
        </p>
      </section>

      {data.length > 0 ? (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {data.map((visa) => (
              <Card
                key={visa._id}
                href={`/visas/${visa._id}`} // ✅ fixed
                title={`${visa.title} — ${visa.country}`}
                subtitle={visa.processingTime || ""}
                date={visa.createdAt}
                image={
                  typeof visa.image === "string" ? visa.image : visa.image?.url
                }
              >
                <p className="mt-2 text-sm text-gray-600 line-clamp-2">
                  {visa.description}
                </p>
              </Card>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-2 mt-10 flex-wrap">
              {page > 1 && (
                <Link
                  href={`/visas?page=${page - 1}`} // ✅ fixed
                  className="px-4 py-2 border rounded-md hover:bg-gray-200"
                >
                  Previous
                </Link>
              )}

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
                        href={`/visas?page=${num}`} // ✅ fixed
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

              {page < totalPages && (
                <Link
                  href={`/visas?page=${page + 1}`} // ✅ fixed
                  className="px-4 py-2 border rounded-md hover:bg-gray-200"
                >
                  Next
                </Link>
              )}
            </div>
          )}
        </>
      ) : (
        <p className="text-gray-500 text-center mt-10">
          No visa opportunities available at the moment.
        </p>
      )}
    </Container>
  );
}
