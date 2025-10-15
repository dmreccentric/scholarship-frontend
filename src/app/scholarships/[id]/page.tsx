// src/app/scholarships/[id]/page.tsx
import axios from "../../lib/axios";
import { Scholarship } from "../..//types";
import Container from "../../components/Container";
import ErrorBlock from "../../components/ErrorBlock";
import Loading from "../../components/Loading";
import ScholarshipClient from "./ScholarshipClient";

interface Props {
  params: Promise<{ id: string }>; // 👈 new Next.js 15 style
}

export default async function ScholarshipDetail({ params }: Props) {
  const { id } = await params; // ✅ safely unwrap params

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
