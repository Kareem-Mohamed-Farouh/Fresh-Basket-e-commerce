export interface Icategory {
  _id: string;
  name: string;
  slug: string;
  image: string;
  createdAt: string;
  updatedAt: string;
}
export interface RootObject {
  results: number;
  metadata: Metadata;
  data: Icategory[];
}

export interface Metadata {
  currentPage: number;
  numberOfPages: number;
  limit: number;
}
