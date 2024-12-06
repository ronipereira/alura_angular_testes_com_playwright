import test, { expect } from "@playwright/test";

test.describe("Página Inicial", () => {
    test("Deve visitar a página inicial", async ({ page }) => {
        await page.goto("/")
        await expect(page).toHaveTitle("Jornada Milhas")

        const tituloPassagens = page.getByTestId('titulo-passagens')
        const tituloPromocoes = page.getByTestId('titulo-promocoes')

        await expect(tituloPassagens).toBeVisible();
        await expect(tituloPromocoes).toBeVisible();
    });
});