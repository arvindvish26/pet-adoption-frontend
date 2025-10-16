// Mock data for pet adoption site

export interface Pet {
  id: string;
  name: string;
  breed: string;
  age: string;
  size: 'Small' | 'Medium' | 'Large';
  gender: 'Male' | 'Female';
  description: string;
  image: string;
  adoptionFee: number;
  formattedAdoptionFee?: string
  currency: 'INR' | 'USD';
  vaccinated: boolean;
  neutered: boolean;
  goodWithKids: boolean;
  goodWithPets: boolean;
}

export interface Accessory {
  id: string;
  name: string;
  category: 'Food' | 'Toys' | 'Beds' | 'Collars' | 'Health' | 'Grooming';
  price: number;
  currency: 'INR' | 'USD';
  image: string;
  description: string;
  rating: number;
  inStock: boolean;
}

export interface CartItem extends Accessory {
  quantity: number;
}

export const mockPets: Pet[] = [
  {
    id: '1',
    name: 'Luna',
    breed: 'Golden Retriever',
    age: '2 years',
    size: 'Large',
    gender: 'Female',
    description: 'Luna is a gentle, loving dog who adores children and other pets. She loves long walks and playing fetch in the yard.',
    image: 'https://images.unsplash.com/photo-1552053831-71594a27632d?w=400&h=300&fit=crop',
    adoptionFee: 15000,
    formattedAdoptionFee: "INR 15000",
    currency: 'INR',
    vaccinated: true,
    neutered: true,
    goodWithKids: true,
    goodWithPets: true,
  },
  {
    id: '2',
    name: 'Max',
    breed: 'Labrador Mix',
    age: '3 years',
    size: 'Large',
    gender: 'Male',
    description: 'Max is an energetic and loyal companion who loves adventures and meeting new people. Perfect for an active family.',
    image: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=400&h=300&fit=crop',
    adoptionFee: 12500,
    formattedAdoptionFee: "INR 12500",
    currency: 'INR',
    vaccinated: true,
    neutered: true,
    goodWithKids: true,
    goodWithPets: false,
  },
  {
    id: '3',
    name: 'Whiskers',
    breed: 'Maine Coon',
    age: '1 year',
    size: 'Medium',
    gender: 'Male',
    description: 'Whiskers is a playful and affectionate cat who loves to cuddle and play with feather toys. Great with children.',
    image: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=400&h=300&fit=crop',
    adoptionFee: 8500,
    formattedAdoptionFee: "INR 8500",
    currency: 'INR',
    vaccinated: true,
    neutered: false,
    goodWithKids: true,
    goodWithPets: true,
  },
  {
    id: '4',
    name: 'Bella',
    breed: 'Siamese Mix',
    age: '4 years',
    size: 'Small',
    gender: 'Female',
    description: 'Bella is a calm and independent cat who enjoys quiet moments and gentle pets. Perfect for a peaceful home.',
    image: 'https://images.unsplash.com/photo-1573865526739-10659fec78a5?w=400&h=300&fit=crop',
    adoptionFee: 6500,
    formattedAdoptionFee: "INR 6500",
    currency: 'INR',
    vaccinated: true,
    neutered: true,
    goodWithKids: false,
    goodWithPets: false,
  },
  {
    id: '5',
    name: 'Rocky',
    breed: 'Bulldog',
    age: '5 years',
    size: 'Medium',
    gender: 'Male',
    description: 'Rocky is a gentle giant who loves naps and belly rubs. He\'s great with kids and has a calm demeanor.',
    image: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=400&h=300&fit=crop',
    adoptionFee: 10500,
    formattedAdoptionFee: "INR 10500",
    currency: 'INR',
    vaccinated: true,
    neutered: true,
    goodWithKids: true,
    goodWithPets: true,
  },
  {
    id: '6',
    name: 'Mia',
    breed: 'Border Collie',
    age: '1 year',
    size: 'Medium',
    gender: 'Female',
    description: 'Mia is highly intelligent and eager to learn. She needs an active family who can provide mental stimulation.',
    image: 'https://images.unsplash.com/photo-1551717743-49959800b1f6?w=400&h=300&fit=crop',
    adoptionFee: 18000,
    formattedAdoptionFee: "INR 18000",
    currency: 'INR',
    vaccinated: true,
    neutered: false,
    goodWithKids: true,
    goodWithPets: true,
  }
];

export const mockAccessories: Accessory[] = [
  {
    id: 'acc1',
    name: 'Premium Dog Food - 15kg',
    category: 'Food',
    price: 2499,
    currency: 'INR',
    image: 'https://images.unsplash.com/photo-1589924691995-400dc9ecc119?w=400&h=300&fit=crop',
    description: 'High-quality, nutritious dog food made with real meat and vegetables.',
    rating: 4.8,
    inStock: true,
  },
  {
    id: 'acc2',
    name: 'Cozy Pet Bed',
    category: 'Beds',
    price: 1299,
    currency: 'INR',
    image: 'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=400&h=300&fit=crop',
    description: 'Soft and comfortable bed perfect for cats and small dogs.',
    rating: 4.5,
    inStock: true,
  },
  {
    id: 'acc3',
    name: 'Interactive Puzzle Toy',
    category: 'Toys',
    price: 699,
    currency: 'INR',
    image: 'https://images.unsplash.com/photo-1605568427561-40dd23c2acea?w=400&h=300&fit=crop',
    description: 'Mental stimulation toy that keeps pets entertained for hours.',
    rating: 4.7,
    inStock: true,
  },
  {
    id: 'acc4',
    name: 'Leather Dog Collar',
    category: 'Collars',
    price: 549,
    currency: 'INR',
    image: 'https://images.unsplash.com/photo-1601758125946-6ec2ef64daf8?w=400&h=300&fit=crop',
    description: 'Durable leather collar with personalized name tag included.',
    rating: 4.6,
    inStock: true,
  },
  {
    id: 'acc5',
    name: 'Cat Grooming Kit',
    category: 'Grooming',
    price: 899,
    currency: 'INR',
    image: 'https://images.unsplash.com/photo-1560807707-8cc77767d783?w=400&h=300&fit=crop',
    description: 'Complete grooming set with brush, nail clippers, and cleaning wipes.',
    rating: 4.4,
    inStock: false,
  },
  {
    id: 'acc6',
    name: 'Pet Health Supplements',
    category: 'Health',
    price: 799,
    currency: 'INR',
    image: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400&h=300&fit=crop',
    description: 'Essential vitamins and minerals to keep your pet healthy and happy.',
    rating: 4.3,
    inStock: true,
  }
];

// Mock API functions
export const fetchPets = (): Promise<Pet[]> => {
  // Deprecated in integration; replaced by API in src/lib/api.ts
  return new Promise((resolve) => {
    setTimeout(() => resolve(mockPets), 500);
  });
};

export const fetchAccessories = (): Promise<Accessory[]> => {
  // Deprecated in integration; replaced by API in src/lib/api.ts
  return new Promise((resolve) => {
    setTimeout(() => resolve(mockAccessories), 300);
  });
};