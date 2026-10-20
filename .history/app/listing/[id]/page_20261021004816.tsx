import { notFound } from "next/navigation";
import { listings } from "@/data/listings";
import ListingDetail from "@/components/ListingDetail";

export const instant = false;

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function ListingDetailPage({ params }: PageProps) {
  const { id } = await params;
  const listing = listings.find((item) => item.id === id);

  if (!listing) {
    notFound();
  }

  return <ListingDetail listing={listing} />;
}