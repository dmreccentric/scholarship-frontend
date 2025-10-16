// src/app/scholarships/[id]/page.tsx
import type { Metadata } from "next";
import axios from "../../lib/axios";
import Container from "../../components/Container";
import ErrorBlock from "../../components/ErrorBlock";
import Loading from "../../components/Loading";
import ScholarshipClient from "./ScholarshipClient";
import { Scholarship } from "../../types";

interface Props {
  params: Promise<{ id: string }>;
}

// 🧠 DYNAMIC SEO METADATA
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;

  try {
    const res = await axios.get<{ data: Scholarship }>(`/scholarships/${id}`);
    const scholarship = res.data.data;

    const imageUrl =
      typeof scholarship.image === "string"
        ? scholarship.image
        : (scholarship.image as any)?.url || "";

    const shortDescription =
      scholarship.description.length > 160
        ? scholarship.description.slice(0, 160) + "..."
        : scholarship.description;

    return {
      title: `${scholarship.title} | ${scholarship.institution} Scholarship`,
      description: shortDescription,
      keywords: [
        scholarship.title,
        scholarship.category,
        scholarship.hostCountry,
        scholarship.institution,
        "scholarships",
        "international students",
        "study abroad",
        "financial aid",
      ],
      openGraph: {
        title: `${scholarship.title} - ${scholarship.institution}`,
        description: shortDescription,
        url: `https://yourdomain.com/scholarships/${id}`,
        images: [
          {
            url: imageUrl,
            width: 1200,
            height: 630,
            alt: scholarship.title,
          },
        ],
        type: "article",
      },
      twitter: {
        card: "summary_large_image",
        title: scholarship.title,
        description: shortDescription,
        images: [imageUrl],
      },
      alternates: {
        canonical: `https://yourdomain.com/scholarships/${id}`,
      },
      robots: { index: true, follow: true },
    };
  } catch {
    return {
      title: "Scholarship Not Found | Your Website",
      description: "The scholarship you are looking for could not be found.",
    };
  }
}

export default async function ScholarshipDetail({ params }: Props) {
  const { id } = await params;
  let data: Scholarship | null = null;
  let error: string | null = null;

  try {
    const res = await axios.get<{ data: Scholarship }>(`/scholarships/${id}`);
    data = res.data.data;
  } catch (e: any) {
    error = e?.message || "Failed to load scholarship details.";
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
        <Loading />
      </Container>
    );
  }

  return (
    <Container>
      <ScholarshipClient
        data={{
          ...data,
          image:
            typeof data.image === "string"
              ? data.image
              : (data.image as any)?.url || "",
        }}
      />
    </Container>
  );
}
