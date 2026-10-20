import { Listing } from "@/types";

export const listings: Listing[] = [
  {
    id: "1",
    title: "Indigo House",
    location: "Abuja, Nigeria",
    city: "Abuja",
    description:
      "The room is located in the middle of Abuja. There is a rooftop and a poolside.",
    pricePerNight: 38000,
    rating: 4.5,
    image:
      "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&q=80",
    category: "house",
    isPopular: true,
    hosts: [
      { name: "Host 1", avatar: "https://i.pravatar.cc/100?img=1" },
      { name: "Host 2", avatar: "https://i.pravatar.cc/100?img=5" },
    ],
  },
  {
    id: "2",
    title: "Emerald Suite",
    location: "Lagos, Nigeria",
    city: "Lagos",
    description:
      "The room is located in the middle of Lagos. There is a rooftop and a poolside.",
    pricePerNight: 39000,
    rating: 4.8,
    image:
      "https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=800&q=80",
    category: "apartment",
    isPopular: true,
  },
  {
    id: "3",
    title: "Skyline Apartment",
    location: "Abuja, Nigeria",
    city: "Abuja",
    description: "Modern apartment with city views and rooftop access.",
    pricePerNight: 42000,
    rating: 4.7,
    image:
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&q=80",
    category: "apartment",
    isNewOffer: true,
  },
  {
    id: "4",
    title: "Palm Residence",
    location: "Lagos, Nigeria",
    city: "Lagos",
    description: "Spacious house with private pool and garden.",
    pricePerNight: 55000,
    rating: 4.9,
    image:
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80",
    category: "house",
    isNewOffer: true,
  },
];