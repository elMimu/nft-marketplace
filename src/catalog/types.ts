export interface NftItem {
  id: string;
  name: string;
  imageUrl: string;
  priceEth: string;
  collection: string;
  network: string;
}

export interface CatalogParams {
  search: string;
  page: number;
  sort: string;
  collection: string;
  network: string;
  priceMin: string;
  priceMax: string;
}

export interface CatalogResponse {
  items: NftItem[];
  page: number;
  totalPages: number;
  totalItems: number;
}
