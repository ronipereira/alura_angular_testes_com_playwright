import { test } from '../setup/fixtures'

test.describe('Buscar Passagens', () => {
  test('Deve buscar passagem de somente ida', async ({ paginaPrincipal }) => {
    await paginaPrincipal.definirSomenteIda()
    await paginaPrincipal.acessarModalPassageiros()
    await paginaPrincipal.definirPassageirosAdultos(3)
    await paginaPrincipal.definirPassageirosCriancas(1)
    await paginaPrincipal.definirPassageirosBesbes(1)
    await paginaPrincipal.fecharModalPassageiros()
    await paginaPrincipal.definirOrigemEDestino('minas gerais', 'rio de janeiro')
    await paginaPrincipal.definirData(new Date())
    await paginaPrincipal.buscarPassagens()
    await paginaPrincipal.estaMostrandoTrajeto('Somente ida', 'Minas Gerais', 'Rio de Janeiro')
  });
});