export interface Scholarship {
  _id: string;
  title: string;
  institution: string;
  description: string;
  hostCountry: string;
  category: string;
  eligibleCountries: string[];
  reward: string;
  stipend: string;
  deadline: string | null;
  healthInsurance: boolean;
  ieltsRequired: boolean;
  fullyFunded: boolean;
  image?: string | ImageType; // ← handle both possible shapes
  createdBy?: {
    _id: string;
    name: string;
    email: string;
  };
  createdAt?: string;
  updatedAt?: string;
}

export type Visa = {
  _id: string;
  country: string;
  description?: string;
  requirements?: string[];
  image?: string | ImageType;
  [key: string]: any;
};

export type Testimonial = {
  _id: string;
  name: string;
  quote: string;
  role?: string;
  avatar?: string;
};

export interface ImageType {
  url: string;
  public_id?: string;
}
