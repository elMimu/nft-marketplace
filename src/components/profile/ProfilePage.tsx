import { useNavigate } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { useEffect, useState } from "react";

import { useAuth } from "@/auth/AuthContext";
import { Button } from "@/components/ui/button";

interface ProfileData {
  displayName: string;
  username: string;
  email: string;
}

interface WalletData {
  name: string;
  network: string;
  address: string;
  type: string;
}

type ProfileSection = "profile" | "wallet";

const PROFILE_KEY = "kurio-profile";
const WALLET_KEY = "kurio-wallet";

const HOME_SEARCH = {
  search: "",
  page: 1,
  sort: "featured",
  collection: "",
  network: "",
  priceMin: "",
  priceMax: "",
} as const;

function loadProfile(username: string, email: string): ProfileData {
  try {
    const saved = localStorage.getItem(PROFILE_KEY);

    if (saved) {
      return JSON.parse(saved) as ProfileData;
    }
  } catch {
    return {
      displayName: username,
      username,
      email,
    };
  }

  return {
    displayName: username,
    username,
    email,
  };
}

function loadWallet(): WalletData {
  try {
    const saved = localStorage.getItem(WALLET_KEY);

    if (saved) {
      return JSON.parse(saved) as WalletData;
    }
  } catch {
    return {
      name: "",
      network: "Ethereum",
      address: "",
      type: "MetaMask",
    };
  }

  return {
    name: "",
    network: "Ethereum",
    address: "",
    type: "MetaMask",
  };
}

export function ProfilePage() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const [section, setSection] = useState<ProfileSection>("profile");

  const [profile, setProfile] = useState<ProfileData>(() =>
    loadProfile(user?.username ?? "", user?.email ?? ""),
  );

  const [wallet, setWallet] = useState<WalletData>(loadWallet);

  const [profileSaved, setProfileSaved] = useState(false);

  const [walletSaved, setWalletSaved] = useState(false);

  useEffect(() => {
    if (!user) {
      return;
    }

    const username = user.username ?? "";
    const email = user.email ?? "";

    setProfile((current) => ({
      ...current,
      username: current.username || username,
      email: current.email || email,
      displayName: current.displayName || username,
    }));
  }, [user]);

  function handleBack() {
    if (window.history.length > 1) {
      window.history.back();
      return;
    }

    navigate({
      to: "/",
      search: HOME_SEARCH,
    });
  }

  function handleProfileSave() {
    localStorage.setItem(PROFILE_KEY, JSON.stringify(profile));

    setProfileSaved(true);

    window.setTimeout(() => {
      setProfileSaved(false);
    }, 1500);
  }

  function handleWalletSave() {
    localStorage.setItem(WALLET_KEY, JSON.stringify(wallet));

    setWalletSaved(true);

    window.setTimeout(() => {
      setWalletSaved(false);
    }, 1500);
  }

  function handleLogout() {
    logout();

    navigate({
      to: "/",
      search: HOME_SEARCH,
    });
  }

  return (
    <main
      className="
        mx-auto min-h-screen
        w-full max-w-[1200px]
        px-6 py-6
        lg:px-0 lg:py-12
      "
    >
      <button
        type="button"
        onClick={handleBack}
        className="
          mb-6 flex h-10 w-10
          items-center justify-center
          rounded-full
          text-foreground
          transition-colors
          hover:bg-card
          lg:hidden
        "
        aria-label="Voltar"
      >
        <ArrowLeft className="h-6 w-6" strokeWidth={2} />
      </button>

      <div
        className="
          grid gap-8
          lg:grid-cols-[220px_minmax(0,1fr)]
          lg:gap-12
        "
      >
        <aside
          className="
            hidden bg-card
            p-6
            lg:block
          "
        >
          <h1
            className="
              text-[20px] font-bold
              text-foreground
            "
          >
            Minha conta
          </h1>

          <nav className="mt-8 space-y-2">
            <button
              type="button"
              onClick={() => setSection("profile")}
              className={`
                w-full py-2
                text-left text-[14px]
                ${section === "profile"
                  ? "font-bold text-accent"
                  : "text-muted-foreground"
                }
              `}
            >
              Dados do perfil
            </button>

            <button
              type="button"
              onClick={() => setSection("wallet")}
              className={`
                w-full py-2
                text-left text-[14px]
                ${section === "wallet"
                  ? "font-bold text-accent"
                  : "text-muted-foreground"
                }
              `}
            >
              Carteiras
            </button>

            <button
              type="button"
              onClick={handleLogout}
              className="
                w-full py-2
                text-left text-[14px]
                text-muted-foreground
              "
            >
              Sair
            </button>
          </nav>
        </aside>

        <section>
          <div
            className="
              mb-8 flex gap-6
              border-b-[0.3px]
              border-primary
              lg:hidden
            "
          >
            <button
              type="button"
              onClick={() => setSection("profile")}
              className={`
                border-b-[3px]
                pb-3 text-[14px]
                ${section === "profile"
                  ? "border-primary font-bold text-accent"
                  : "border-transparent text-muted-foreground"
                }
              `}
            >
              Dados do perfil
            </button>

            <button
              type="button"
              onClick={() => setSection("wallet")}
              className={`
                border-b-[3px]
                pb-3 text-[14px]
                ${section === "wallet"
                  ? "border-primary font-bold text-accent"
                  : "border-transparent text-muted-foreground"
                }
              `}
            >
              Carteiras
            </button>
          </div>

          {section === "profile" && (
            <div className="max-w-[620px]">
              <h2
                className="
                  text-[28px] font-bold
                  text-foreground
                "
              >
                Dados do perfil
              </h2>

              <p
                className="
                  mt-2 text-[14px]
                  leading-[22px]
                  text-muted-foreground
                "
              >
                Atualize as informações da sua conta.
              </p>

              <div className="mt-8 space-y-5">
                <label className="block">
                  <span
                    className="
                      mb-2 block
                      text-[14px]
                      text-foreground
                    "
                  >
                    Nome
                  </span>

                  <input
                    type="text"
                    value={profile.displayName}
                    onChange={(event) =>
                      setProfile((current) => ({
                        ...current,
                        displayName: event.target.value,
                      }))
                    }
                    className="
                      h-[44px] w-full
                      rounded-[6px]
                      bg-muted px-4
                      text-[14px]
                      text-foreground
                      outline-none
                      focus:ring-1
                      focus:ring-primary
                    "
                  />
                </label>

                <label className="block">
                  <span
                    className="
                      mb-2 block
                      text-[14px]
                      text-foreground
                    "
                  >
                    Nome de usuário
                  </span>

                  <input
                    type="text"
                    value={profile.username}
                    onChange={(event) =>
                      setProfile((current) => ({
                        ...current,
                        username: event.target.value,
                      }))
                    }
                    className="
                      h-[44px] w-full
                      rounded-[6px]
                      bg-muted px-4
                      text-[14px]
                      text-foreground
                      outline-none
                      focus:ring-1
                      focus:ring-primary
                    "
                  />
                </label>

                <label className="block">
                  <span
                    className="
                      mb-2 block
                      text-[14px]
                      text-foreground
                    "
                  >
                    E-mail
                  </span>

                  <input
                    type="email"
                    value={profile.email}
                    onChange={(event) =>
                      setProfile((current) => ({
                        ...current,
                        email: event.target.value,
                      }))
                    }
                    className="
                      h-[44px] w-full
                      rounded-[6px]
                      bg-muted px-4
                      text-[14px]
                      text-foreground
                      outline-none
                      focus:ring-1
                      focus:ring-primary
                    "
                  />
                </label>
              </div>

              <div className="mt-8 flex items-center gap-4">
                <Button
                  type="button"
                  onClick={handleProfileSave}
                  className="
                    h-[40px]
                    rounded-[6px]
                    bg-primary px-6
                    text-[14px] font-bold
                    text-[var(--link)]
                    hover:bg-accent
                  "
                >
                  Salvar
                </Button>

                {profileSaved && (
                  <span
                    className="
                      text-[13px]
                      text-accent
                    "
                  >
                    Dados salvos
                  </span>
                )}
              </div>
            </div>
          )}

          {section === "wallet" && (
            <div className="max-w-[620px]">
              <h2
                className="
                  text-[28px] font-bold
                  text-foreground
                "
              >
                Carteiras
              </h2>

              <p
                className="
                  mt-2 text-[14px]
                  leading-[22px]
                  text-muted-foreground
                "
              >
                Configure os dados da sua carteira.
              </p>

              <div className="mt-8 space-y-5">
                <label className="block">
                  <span
                    className="
                      mb-2 block
                      text-[14px]
                      text-foreground
                    "
                  >
                    Nome da carteira
                  </span>

                  <input
                    type="text"
                    value={wallet.name}
                    onChange={(event) =>
                      setWallet((current) => ({
                        ...current,
                        name: event.target.value,
                      }))
                    }
                    placeholder="Minha carteira"
                    className="
                      h-[44px] w-full
                      rounded-[6px]
                      bg-muted px-4
                      text-[14px]
                      text-foreground
                      outline-none
                      placeholder:text-muted-foreground
                      focus:ring-1
                      focus:ring-primary
                    "
                  />
                </label>

                <label className="block">
                  <span
                    className="
                      mb-2 block
                      text-[14px]
                      text-foreground
                    "
                  >
                    Tipo
                  </span>

                  <select
                    value={wallet.type}
                    onChange={(event) =>
                      setWallet((current) => ({
                        ...current,
                        type: event.target.value,
                      }))
                    }
                    className="
                      h-[44px] w-full
                      rounded-[6px]
                      bg-muted px-4
                      text-[14px]
                      text-foreground
                      outline-none
                      focus:ring-1
                      focus:ring-primary
                    "
                  >
                    <option value="MetaMask">MetaMask</option>

                    <option value="WalletConnect">WalletConnect</option>

                    <option value="Coinbase Wallet">Coinbase Wallet</option>
                  </select>
                </label>

                <label className="block">
                  <span
                    className="
                      mb-2 block
                      text-[14px]
                      text-foreground
                    "
                  >
                    Rede
                  </span>

                  <select
                    value={wallet.network}
                    onChange={(event) =>
                      setWallet((current) => ({
                        ...current,
                        network: event.target.value,
                      }))
                    }
                    className="
                      h-[44px] w-full
                      rounded-[6px]
                      bg-muted px-4
                      text-[14px]
                      text-foreground
                      outline-none
                      focus:ring-1
                      focus:ring-primary
                    "
                  >
                    <option value="Ethereum">Ethereum</option>

                    <option value="Polygon">Polygon</option>

                    <option value="Solana">Solana</option>
                  </select>
                </label>

                <label className="block">
                  <span
                    className="
                      mb-2 block
                      text-[14px]
                      text-foreground
                    "
                  >
                    Endereço
                  </span>

                  <input
                    type="text"
                    value={wallet.address}
                    onChange={(event) =>
                      setWallet((current) => ({
                        ...current,
                        address: event.target.value,
                      }))
                    }
                    placeholder="0x..."
                    className="
                      h-[44px] w-full
                      rounded-[6px]
                      bg-muted px-4
                      text-[14px]
                      text-foreground
                      outline-none
                      placeholder:text-muted-foreground
                      focus:ring-1
                      focus:ring-primary
                    "
                  />
                </label>
              </div>

              <div className="mt-8 flex items-center gap-4">
                <Button
                  type="button"
                  onClick={handleWalletSave}
                  className="
                    h-[40px]
                    rounded-[6px]
                    bg-primary px-6
                    text-[14px] font-bold
                    text-[var(--link)]
                    hover:bg-accent
                  "
                >
                  Salvar
                </Button>

                {walletSaved && (
                  <span
                    className="
                      text-[13px]
                      text-accent
                    "
                  >
                    Dados salvos
                  </span>
                )}
              </div>
            </div>
          )}

          <button
            type="button"
            onClick={handleLogout}
            className="
              mt-10 text-[14px]
              text-muted-foreground
              transition-colors
              hover:text-foreground
              lg:hidden
            "
          >
            Sair
          </button>
        </section>
      </div>
    </main>
  );
}
