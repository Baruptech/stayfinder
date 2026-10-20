import { notFound } from "next/navigation";
import { listings } from "@/data/listings";
import BookingForm from "@/components/BookingForm";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function BookPage({ params }: PageProps) {
  const { id } = await params;
  const listing = listings.find((item) => item.id === id);

  if (!listing) {
    notFound();
  }

  return <BookingForm listing={listing} />;
}