import { LogOut, User, Wallet } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";

import { useAuth } from "@/auth/AuthContext";
import { Button } from "@/components/ui/button";
import {
  loadProfile,
  loadWallet,
  saveProfile,
  saveWallet,
} from "@/profile/storage";

type Section = "profile" | "wallets";

export function ProfilePage() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [section, setSection] = useState<Section>("profile");
  const [profile, setProfile] = useState(() => loadProfile(user?.email ?? ""));
  const [wallet, setWallet] = useState(loadWallet);
  const [message, setMessage] = useState("");

  function handleProfileSave() {
    saveProfile(profile);
    setMessage("Perfil salvo.");
  }

  function handleWalletSave() {
    saveWallet(wallet);
    setMessage("Carteira salva.");
  }

  function handleLogout() {
    logout();

    navigate({
      to: "/",
      search: {
        search: "",
        page: 1,
        sort: "featured",
        collection: "",
        network: "",
        priceMin: "",
        priceMax: "",
      },
    });
  }

  return (
    <main className="mx-auto w-full max-w-[1200px] px-6 py-8 lg:px-0 lg:py-10">
      <div className="grid gap-8 lg:grid-cols-[260px_minmax(0,1fr)]">
        <aside className="h-fit rounded-xl border p-4">
          <h1 className="mb-4 text-xl font-bold">Meu perfil</h1>

          <div className="space-y-2">
            <button
              type="button"
              onClick={() => {
                setSection("profile");
                setMessage("");
              }}
              className={`flex w-full items-center gap-3 rounded-lg px-3 py-3 text-left ${section === "profile"
                  ? "bg-primary/10 font-semibold text-primary"
                  : "hover:bg-muted"
                }`}
            >
              <User className="h-5 w-5" />
              Dados do perfil
            </button>

            <button
              type="button"
              onClick={() => {
                setSection("wallets");
                setMessage("");
              }}
              className={`flex w-full items-center gap-3 rounded-lg px-3 py-3 text-left ${section === "wallets"
                  ? "bg-primary/10 font-semibold text-primary"
                  : "hover:bg-muted"
                }`}
            >
              <Wallet className="h-5 w-5" />
              Carteiras
            </button>

            <button
              type="button"
              onClick={handleLogout}
              className="flex w-full items-center gap-3 rounded-lg border-t px-3 py-3 text-left hover:bg-muted"
            >
              <LogOut className="h-5 w-5" />
              Sair
            </button>
          </div>
        </aside>

        {section === "profile" && (
          <section>
            <h2 className="text-xl font-bold">Perfil do colecionador</h2>

            <div className="mt-8 grid gap-6 lg:grid-cols-2">
              <label>
                <span className="mb-2 block text-sm font-medium">
                  Nome de exibição
                </span>

                <input
                  type="text"
                  value={profile.displayName}
                  onChange={(event) =>
                    setProfile({
                      ...profile,
                      displayName: event.target.value,
                    })
                  }
                  className="h-11 w-full rounded-lg border bg-background px-3 outline-none"
                />
              </label>

              <label>
                <span className="mb-2 block text-sm font-medium">
                  Nome de usuário
                </span>

                <input
                  type="text"
                  value={profile.username}
                  onChange={(event) =>
                    setProfile({
                      ...profile,
                      username: event.target.value,
                    })
                  }
                  className="h-11 w-full rounded-lg border bg-background px-3 outline-none"
                />
              </label>

              <label>
                <span className="mb-2 block text-sm font-medium">E-mail</span>

                <input
                  type="email"
                  value={profile.email}
                  onChange={(event) =>
                    setProfile({
                      ...profile,
                      email: event.target.value,
                    })
                  }
                  className="h-11 w-full rounded-lg border bg-background px-3 outline-none"
                />
              </label>
            </div>

            <Button type="button" className="mt-8" onClick={handleProfileSave}>
              Salvar
            </Button>

            {message && (
              <p className="mt-3 text-sm text-muted-foreground">{message}</p>
            )}
          </section>
        )}

        {section === "wallets" && (
          <section>
            <div>
              <h2 className="text-xl font-bold">Carteira principal</h2>

              <p className="mt-1 text-sm text-muted-foreground">
                Esta carteira poderá ser usada para receber NFTs comprados.
              </p>
            </div>

            <div className="mt-8 grid gap-6 lg:grid-cols-2">
              <label>
                <span className="mb-2 block text-sm font-medium">
                  Nome de exibição
                </span>

                <input
                  type="text"
                  value={wallet.name}
                  onChange={(event) =>
                    setWallet({
                      ...wallet,
                      name: event.target.value,
                    })
                  }
                  placeholder="Minha carteira"
                  className="h-11 w-full rounded-lg border bg-background px-3 outline-none"
                />
              </label>

              <label>
                <span className="mb-2 block text-sm font-medium">Rede</span>

                <select
                  value={wallet.network}
                  onChange={(event) =>
                    setWallet({
                      ...wallet,
                      network: event.target.value,
                    })
                  }
                  className="h-11 w-full rounded-lg border bg-background px-3"
                >
                  <option value="ethereum">Ethereum</option>
                  <option value="polygon">Polygon</option>
                  <option value="solana">Solana</option>
                </select>
              </label>

              <label>
                <span className="mb-2 block text-sm font-medium">
                  Endereço da carteira
                </span>

                <input
                  type="text"
                  value={wallet.address}
                  onChange={(event) =>
                    setWallet({
                      ...wallet,
                      address: event.target.value,
                    })
                  }
                  placeholder="0x..."
                  className="h-11 w-full rounded-lg border bg-background px-3 outline-none"
                />
              </label>

              <label>
                <span className="mb-2 block text-sm font-medium">
                  Tipo de carteira
                </span>

                <select
                  value={wallet.type}
                  onChange={(event) =>
                    setWallet({
                      ...wallet,
                      type: event.target.value,
                    })
                  }
                  className="h-11 w-full rounded-lg border bg-background px-3"
                >
                  <option value="metamask">MetaMask</option>
                  <option value="walletconnect">WalletConnect</option>
                  <option value="coinbase">Coinbase Wallet</option>
                </select>
              </label>
            </div>

            <Button type="button" className="mt-8" onClick={handleWalletSave}>
              Salvar carteira
            </Button>

            {message && (
              <p className="mt-3 text-sm text-muted-foreground">{message}</p>
            )}
          </section>
        )}
      </div>
    </main>
  );
}
