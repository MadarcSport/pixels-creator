export interface ArtCreation {
  id: string;
  title: string;
  category: string;
  subtitle: string;
  description: string;
  imageUrl: string;
  imageAlt: string;
  tags: string[];
  youtubeId?: string;
}

// Add future creations here to reuse the same showcase layout.
export const artCreations: ArtCreation[] = [
  {
    id: "roundy-fridge",
    title: "Roundy",
    category: "Refrigerator concept",
    subtitle: "A softer take on the everyday fridge.",
    description:
      "An original refrigerator concept for the home, shaped around rounded forms rather than sharp corners. Roundy reimagines a familiar appliance as a playful design object, giving an everyday essential a distinctive personality.",
    imageUrl:
      "https://res.cloudinary.com/db7i9febj/image/upload/v1795645170/roundyFridgeTiny_pdinxv.png",
    imageAlt: "3D design of Roundy, a home refrigerator with a rounded shape",
    tags: ["Product design", "3D art", "Rounded forms"],
    youtubeId: "wbdvP06OtFU",
  },
];
