import { test } from '../setup/fixtures';

test.describe('Buscar Passagens', () => {
  test.beforeEach(async ({ paginaPrincipal }) => {
    await paginaPrincipal.visitar();
  });

  test('Deve buscar passagem de somente ida', async ({ paginaPrincipal }) => {
    await paginaPrincipal.definirSomenteIda();
    await paginaPrincipal.configurarPassageiros(3, 1, 1);
    await paginaPrincipal.definirOrigemEDestino('minas gerais', 'rio de janeiro');
    await paginaPrincipal.definirData(new Date());
    await paginaPrincipal.buscarPassagens();
    await paginaPrincipal.estaMostrandoTrajeto('Somente ida', 'Minas Gerais', 'Rio de Janeiro');
  });

  test('Deve buscar passagem somente de ida, executiva', async ({ page, paginaPrincipal }) => {
    const dataIda = new Date();
    await paginaPrincipal.mockarRespostaBuscaPassagens();
    await paginaPrincipal.definirSomenteIda();
    await paginaPrincipal.configurarPassageiros(1, 0, 0);
    await paginaPrincipal.definirOrigemEDestino('paraíba', 'roraima');
    await paginaPrincipal.definirData(dataIda);
    await paginaPrincipal.buscarPassagens();
    await paginaPrincipal.estaMostrandoTrajeto('Somente ida', 'Paraíba', 'Roraima');
  });
});