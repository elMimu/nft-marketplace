import { expect, test } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("/");

  await page.evaluate(() => {
    localStorage.clear();
    sessionStorage.clear();
  });

  await page.reload();
});

test("registers and logs in with the created account", async ({ page }) => {
  await page
    .getByRole("button", {
      name: "Entrar",
      exact: true,
    })
    .click();

  let dialog = page.getByRole("dialog");

  await dialog
    .getByRole("button", {
      name: "Criar conta",
      exact: true,
    })
    .first()
    .click();

  await dialog
    .getByPlaceholder("Nome de usuário", {
      exact: true,
    })
    .fill("playwright-user");

  await dialog
    .getByPlaceholder("Digite seu e-mail", {
      exact: true,
    })
    .fill("playwright@kurio.com");

  await dialog
    .getByPlaceholder("Senha", {
      exact: true,
    })
    .fill("123456");

  await dialog
    .getByPlaceholder("Confirmar senha", {
      exact: true,
    })
    .fill("123456");

  await dialog
    .getByRole("button", {
      name: "Criar conta",
      exact: true,
    })
    .last()
    .click();

  const profileLink = page.locator('a[href="/profile"]');

  await expect(profileLink).toBeVisible();
  await profileLink.click();

  await page
    .getByRole("button", {
      name: "Sair",
    })
    .click();

  await page
    .getByRole("button", {
      name: "Entrar",
      exact: true,
    })
    .click();

  dialog = page.getByRole("dialog");

  await dialog
    .getByPlaceholder("contato@email.com", {
      exact: true,
    })
    .fill("playwright@kurio.com");

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

  await expect(page.locator('a[href="/profile"]')).toBeVisible();
});
