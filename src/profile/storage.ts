export interface ProfileData {
  displayName: string;
  username: string;
  email: string;
}

export interface WalletData {
  name: string;
  network: string;
  address: string;
  type: string;
}

const PROFILE_KEY = "kurio-profile";
const WALLET_KEY = "kurio-wallet";

export function loadProfile(email: string): ProfileData {
  try {
    const saved = localStorage.getItem(PROFILE_KEY);

    if (saved) {
      return JSON.parse(saved) as ProfileData;
    }
  } catch {
    // Ignore invalid stored data.
  }

  return {
    displayName: "",
    username: "",
    email,
  };
}

export function saveProfile(profile: ProfileData) {
  localStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
}

export function loadWallet(): WalletData {
  try {
    const saved = localStorage.getItem(WALLET_KEY);

    if (saved) {
      return JSON.parse(saved) as WalletData;
    }
  } catch {
    // Ignore invalid stored data.
  }

  return {
    name: "",
    network: "ethereum",
    address: "",
    type: "metamask",
  };
}

export function saveWallet(wallet: WalletData) {
  localStorage.setItem(WALLET_KEY, JSON.stringify(wallet));
}
