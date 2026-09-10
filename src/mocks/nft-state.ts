import { nfts } from "./nfts";

export type MockNft = (typeof nfts)[number];

export interface NftMockUpdate {
  index: number;
  priceEth?: string;
  imageUrl?: string;
}

const STORAGE_KEY = "kurio-mock-nfts";

export function getMockNfts(): MockNft[] {
  if (typeof localStorage === "undefined") {
    return [...nfts];
  }

  try {
    const saved = localStorage.getItem(STORAGE_KEY);

    if (!saved) {
      return [...nfts];
    }

    return JSON.parse(saved) as MockNft[];
  } catch {
    return [...nfts];
  }
}

export function applyMockNftUpdate(update: NftMockUpdate): MockNft | null {
  const current = getMockNfts();
  const nft = current[update.index];

  if (!nft) {
    return null;
  }

  const updatedNft = {
    ...nft,
    ...(update.priceEth !== undefined ? { priceEth: update.priceEth } : {}),
    ...(update.imageUrl !== undefined ? { imageUrl: update.imageUrl } : {}),
  };

  current[update.index] = updatedNft;

  localStorage.setItem(STORAGE_KEY, JSON.stringify(current));

  return updatedNft;
}
