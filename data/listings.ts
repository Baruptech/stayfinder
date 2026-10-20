import { Listing } from "@/types";

export const listings: Listing[] = [
  {
    id: "1",
    title: "Indigo House",
    location: "Abuja, FCT",
    city: "Abuja",
    description:
      "Stylish home in the heart of Abuja with a rooftop terrace and private poolside area. Perfect for business or leisure stays.",
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
    location: "Lagos, Lagos State",
    city: "Lagos",
    description:
      "Modern apartment in the middle of Lagos with rooftop access and poolside views. Ideal for city explorers.",
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
    location: "Abuja, FCT",
    city: "Abuja",
    description:
      "Contemporary apartment with panoramic city views and easy access to major landmarks in Abuja.",
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
    location: "Lagos, Lagos State",
    city: "Lagos",
    description:
      "Spacious house featuring a private pool, lush garden, and serene atmosphere in a quiet Lagos neighborhood.",
    pricePerNight: 55000,
    rating: 4.9,
    image:
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80",
    category: "house",
    isNewOffer: true,
  },
  {
    id: "5",
    title: "Garden City Villa",
    location: "Port Harcourt, Rivers State",
    city: "Port Harcourt",
    description:
      "Elegant villa surrounded by greenery in Port Harcourt. Features a large living area, modern kitchen, and outdoor seating.",
    pricePerNight: 48000,
    rating: 4.6,
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80",
    category: "house",
    isPopular: true,
    hosts: [
      { name: "Ada", avatar: "https://i.pravatar.cc/100?img=9" },
    ],
  },
  {
    id: "6",
    title: "Heritage Apartment",
    location: "Enugu, Enugu State",
    city: "Enugu",
    description:
      "Comfortable and well-furnished apartment in the coal city. Close to restaurants, markets, and cultural sites.",
    pricePerNight: 32000,
    rating: 4.4,
    image:
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80",
    category: "apartment",
    isNewOffer: true,
  },
  {
    id: "7",
    title: "Calabar Waterfront Home",
    location: "Calabar, Cross River State",
    city: "Calabar",
    description:
      "Beautiful waterfront property with stunning views. Ideal for relaxation and short getaways in the tourism capital.",
    pricePerNight: 45000,
    rating: 4.8,
    image:
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80",
    category: "house",
    isPopular: true,
  },
  {
    id: "8",
    title: "Ibadan Hills Retreat",
    location: "Ibadan, Oyo State",
    city: "Ibadan",
    description:
      "Peaceful hillside retreat with modern amenities and panoramic views of Ibadan. Perfect for quiet weekends.",
    pricePerNight: 35000,
    rating: 4.5,
    image:
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&q=80",
    category: "house",
    isNewOffer: true,
  },
];