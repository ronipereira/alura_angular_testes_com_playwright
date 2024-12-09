import { Locator, Page } from "@playwright/test";

export default class PaginaPrincipal {
    private readonly page: Page;
    private readonly campoDropDownOrigem: Locator;
    private readonly campoDropDownDestino: Locator;
    private readonly botaoSomenteIda: Locator;
    private readonly botaoIdaEVolta: Locator;
    private readonly botaoModalPassageiros: Locator;
    private readonly botaoModalClasse: Locator;
    private readonly botaoIncrementarAdultos: Locator;
    private readonly botaoDiminuirAdultos: Locator;
    private readonly botaoIncrementarCriancas: Locator;
    private readonly botaoDiminuirCriancas: Locator;
    private readonly botaoIncrementarBebes: Locator;
    private readonly botaoDiminuirBebes: Locator;
    private readonly botaoCategoriaEconomica: Locator;
    private readonly botaoCategoriaExecutiva: Locator;
    private readonly botaoBuscar: Locator;
    private readonly campoDataIda: Locator;
    private readonly campoDataVolta: Locator;
    private readonly botaoBuscarPassagens: Locator;

    constructor(page: Page) {
        this.page = page

        this.campoDropDownOrigem = page
            .getByTestId('campo-dropdown-origem')
            .getByLabel('Origem')

        this.campoDropDownDestino = page
            .getByTestId('campo-dropdown-destino')
            .getByLabel('Destino')

        this.campoDataIda = page.getByTestId('campo-data-ida');

        this.campoDataVolta = page.getByText('Data da Volta')
        
        this.botaoBuscarPassagens = page.getByTestId('botao-buscar-passagens')

        this.botaoSomenteIda = page.getByRole('button', { name: 'SOMENTE IDA' })

        this.botaoIdaEVolta = page.getByRole('button', { name: 'IDA E VOLTA' })

        this.botaoModalPassageiros = page.getByTestId('abrir-modal-passageiros')

        this.botaoModalClasse = page.getByTestId('botao-mudar-tipo-passagem')
        
        this.botaoIncrementarAdultos = page
            .getByTestId('seletor-passageiro-adultos')
            .getByRole('button', { name: 'adição' });

        this.botaoDiminuirAdultos = page
            .getByTestId('seletor-passageiro-adultos')
            .getByRole('button', { name: 'subtração' });

        this.botaoIncrementarCriancas = page
            .getByTestId('seletor-passageiro-criancas')
            .getByRole('button', { name: 'adição' });
        
        this.botaoDiminuirCriancas = page
            .getByTestId('seletor-passageiro-criancas')
            .getByRole('button', { name: 'subtração' });

        this.botaoIncrementarBebes = page
            .getByTestId('seletor-passageiro-bebes')
            .getByRole('button', { name: 'adição' });
        
        this.botaoDiminuirBebes = page
            .getByTestId('seletor-passageiro-bebes')
            .getByRole('button', { name: 'subtração' });

        this.botaoCategoriaEconomica = page
            .getByText('Categoria Econômica Executiva')
            .getByRole('option', { name: 'Econômica' })

        this.botaoCategoriaExecutiva = page
            .getByText('Categoria Econômica Executiva')
            .getByRole('option', { name: 'Executiva' })

        this.botaoBuscar = page.getByTestId('fechar-modal-passageiros')
    }

    async visitar() {
        await this.page.goto('/')
    }

    async acessarModalPassageiros() {
        await this.botaoModalPassageiros.click()
    }

    async definirSomenteIda() {
        await this.botaoSomenteIda.click()
    }

    async definirPassageirosAdultos(quantidade: number) {
        for (let i = 1; i < quantidade; i++) {
            await this.botaoIncrementarAdultos.click()
        }
    }

    async diminuirPassageirosAdultos(quantidade: number) {
        for (let i = 1; i < quantidade; i++) {
            await this.botaoIncrementarAdultos.click()
        }
    }

    async definirPassageirosCriancas(quantidade: number) {
        for (let i = 0; i < quantidade; i++) {
            await this.botaoIncrementarCriancas.click()
        }
    }

    async definirPassageirosBesbes(quantidade: number) {
        for (let i = 0; i < quantidade; i++) {
            await this.botaoIncrementarBebes.click()
        }
    }

    async fecharModalPassageiros() {
        await this.botaoBuscar.click()
    }

    async definirOrigemEDestino(origem: string, destino: string) {
        await this.campoDropDownOrigem.fill(origem)
        await this.campoDropDownOrigem.press('Enter')

        await this.campoDropDownDestino.fill(destino)
        await this.campoDropDownDestino.press('Enter')
    }
}