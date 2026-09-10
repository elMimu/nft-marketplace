import { expect, test } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("/");

  await page.evaluate(() => {
    localStorage.clear();
    sessionStorage.clear();
  });

  await page.reload();
});

test("opens an NFT and adds it to the cart", async ({ page }) => {
  const firstNft = page.locator('a[href^="/nfts/"]').first();

  await expect(firstNft).toBeVisible();
  await firstNft.click();

  const addToCart = page.getByRole("button", {
    name: "Adicionar ao carrinho",
  });

  await expect(addToCart).toBeVisible();
  await addToCart.click();

  await expect(
    page
      .getByRole("heading", {
        name: /Carrinho/i,
      })
      .first(),
  ).toBeVisible();

  const firstCartItem = page.locator("article").first();

  await expect(firstCartItem.locator("strong:visible").first()).toContainText(
    "ETH",
  );
});

test("completes the purchase flow with login", async ({ page }) => {
  await page.locator('a[href^="/nfts/"]').first().click();

  await page
    .getByRole("button", {
      name: "Adicionar ao carrinho",
    })
    .click();

  await page
    .getByRole("button", {
      name: "Conectar e finalizar",
    })
    .click();

  const dialog = page.getByRole("dialog");

  await dialog
    .getByPlaceholder("contato@email.com", {
      exact: true,
    })
    .fill("demo@kurio.com");

  await dialog
    .getByPlaceholder("Senha", {
      exact: true,
    })
    .fill("123456");

  await dialog
    .getByRole("button", {
      name: "Entrar",
      exact: true,
    })
    .last()
    .click();

  await expect(
    page.getByRole("heading", {
      name: "Pagamento com carteira",
    }),
  ).toBeVisible();

  await page
    .getByRole("button", {
      name: "Confirmar compra",
    })
    .click();

  await expect(
    page.getByRole("heading", {
      name: "Compra confirmada",
    }),
  ).toBeVisible();
});
