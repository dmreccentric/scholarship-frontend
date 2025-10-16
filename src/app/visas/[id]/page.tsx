import axios from "../../lib/axios";
import { Visa } from "../../types";
import Container from "../../components/Container";
import ErrorBlock from "../../components/ErrorBlock";
import VisaClient from "./Client";
import VisaSkeleton from "../../components/VisaSkeleton";
import type { Metadata } from "next";

// ✅ Dynamic Metadata for SEO
export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  try {
    const res = await axios.get(`/visas/${id}`);
    const visa: Visa = res.data.data;

    const imageUrl =
      typeof visa.image === "string"
        ? visa.image
        : visa.image?.url || "https://yoursite.com/default-visa.jpg";

    return {
      title: `${visa.title} | ${visa.country} Visa Details & Requirements`,
      description:
        visa.description?.slice(0, 160) ||
        `Learn more about the ${visa.title} in ${visa.country}. Find eligibility, fees, and how to apply.`,
      keywords: [
        visa.title,
        `${visa.country} visa`,
        "visa requirements",
        "apply for visa",
        "international travel visa",
        "immigration programs",
      ],
      openGraph: {
        title: `${visa.title} | Visa Details`,
        description:
          visa.description?.slice(0, 160) ||
          `Learn about ${visa.title} in ${visa.country}.`,
        url: `https://yoursite.com/visas/${visa._id}`,
        type: "article",
        images: [
          {
            url: imageUrl,
            width: 1200,
            height: 630,
            alt: visa.title,
          },
        ],
      },
      twitter: {
        card: "summary_large_image",
        title: visa.title,
        description:
          visa.description?.slice(0, 160) ||
          `Explore details about ${visa.title}.`,
        images: [imageUrl],
      },
      alternates: {
        canonical: `https://yoursite.com/visas/${visa._id}`,
      },
    };
  } catch {
    return {
      title: "Visa Details | Global Visa Finder",
      description:
        "Explore global visa programs and immigration options for work, study, and travel.",
    };
  }
}

export const revalidate = 60;

export default async function VisaDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  let data: Visa | null = null;
  let related: Visa[] = [];
  let recent: Visa[] = [];
  let error: string | null = null;

  try {
    const res = await axios.get(`/visas/${id}`);
    data = res.data.data;

    if (data) {
      // Fetch related visas (same country)
      if (data.country) {
        const relatedRes = await axios.get(`/visas?country=${data.country}`);
        related = relatedRes.data.data.filter((v: Visa) => v._id !== data!._id);
      }

      // Fetch recent visas (latest 3)
      const recentRes = await axios.get(`/visas?limit=3`);
      recent = recentRes.data.data.filter((v: Visa) => v._id !== data!._id);
    }
  } catch (e: any) {
    console.error("❌ Error fetching visa:", e.message);
    error = e?.message || "Failed to load visa details.";
  }

  if (error) {
    return (
      <Container>
        <ErrorBlock message={error} />
      </Container>
    );
  }

  if (!data) {
    return (
      <Container>
        <VisaSkeleton />
      </Container>
    );
  }

  return (
    <Container>
      <VisaClient data={data} related={related} recent={recent} />
    </Container>
  );
}
