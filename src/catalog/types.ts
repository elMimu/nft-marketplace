export interface NftItem {
  id: string;
  name: string;
  imageUrl: string;
  priceEth: string;
}

export interface CatalogParams {
  search: string;
  page: number;
}

export interface CatalogResponse {
  items: NftItem[];
  page: number;
  totalPages: number;
  totalItems: number;
}
