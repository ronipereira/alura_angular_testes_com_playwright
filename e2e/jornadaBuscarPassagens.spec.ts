import test from "@playwright/test";
import PaginaPrincipal from "./page-objects/PaginaPrincipal";

test.describe('Buscar Passagens', () => {
  test('Deve buscar passagem de somente ida', async ({ page }) => {
    const paginaPrincipal = new PaginaPrincipal(page);

    await paginaPrincipal.visitar();
    await paginaPrincipal.definirSomenteIda()
    await paginaPrincipal.acessarModalPassageiros()
    await paginaPrincipal.definirPassageirosAdultos(3)
    await paginaPrincipal.definirPassageirosCriancas(1)
    await paginaPrincipal.definirPassageirosBesbes(1)
    await paginaPrincipal.fecharModalPassageiros()
    await paginaPrincipal.definirOrigemEDestino('minas gerais', 'rio de janeiro')

  });
});