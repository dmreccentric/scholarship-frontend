import axios from "../../lib/axios";
import { Visa } from "../../types";
import Container from "../../components/Container";
import ErrorBlock from "../../components/ErrorBlock";
import VisaClient from "./Client";
import VisaSkeleton from "../../components/VisaSkeleton";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function VisaDetail({ params }: Props) {
  const { id } = await params;

  let data: Visa | null = null;
  let related: Visa[] = [];
  let recent: Visa[] = [];
  let error: string | null = null;

  try {
    // 1️⃣ Fetch main visa
    const res = await axios.get(`/visas/${id}`);
    data = res.data.data;

    // 2️⃣ Fetch related visas (same country)
    if (data?.country) {
      const relatedRes = await axios.get(`/visas?country=${data.country}`);
      related = relatedRes.data.data.filter((v: Visa) => v._id !== data?._id);
    }

    // 3️⃣ Fetch recent visas (latest 3)
    const recentRes = await axios.get(`/visas?limit=3`);
    recent = recentRes.data.data.filter((v: Visa) => v._id !== data?._id);
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
