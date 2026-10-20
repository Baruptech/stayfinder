export interface Listing {
  id: string;
  title: string;
  location: string;
  city: string;
  description: string;
  pricePerNight: number;
  rating: number;
  image: string;
  images?: string[];
  category: "apartment" | "house" | "all";
  isPopular?: boolean;
  isNewOffer?: boolean;
  hosts?: { name: string; avatar: string }[];
}