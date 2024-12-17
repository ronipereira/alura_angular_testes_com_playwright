import { expect, Locator, Page } from "@playwright/test"
import { Genero } from "../operacoes/gerarPerfil";
import { formatarDataParaForm } from "../operacoes/datas";

export default class PaginaCadastro {
    private readonly page: Page;
    private readonly botaoVisitarPaginaCadastro: Locator;
    private readonly inputNome: Locator;
    private readonly inputDataNascimento: Locator;
    private readonly radiosGenero: { [chave in Genero]: Locator };
    private readonly inputCpf: Locator;
    private readonly inputCidade: Locator;
    private readonly inputTelefone: Locator;
    private readonly inputEstado: Locator;
    private readonly inputEmail: Locator;
    private readonly inputSenha: Locator;
    private readonly inputConfirmarEmail: Locator;
    private readonly inputConfirmarSenha: Locator;
    private readonly botaoSubmeterForm: Locator;
    private readonly checkboxTermos: Locator;

    constructor(page: Page) {
        this.page = page;
        this.botaoVisitarPaginaCadastro = page.getByRole('button', { name: 'CADASTRE-SE' });
        
        this.inputNome = page.getByTestId('form-base-input-nome');
        this.inputDataNascimento = page.getByTestId('form-base-input-data-nascimento');

        const radioGeneroFeminino = page 
            .getByTestId('form-base-radio-genero-feminino')
            .getByLabel('Feminino')

        const radioGeneroMasculino = page 
            .getByTestId('form-base-radio-genero-masculino')
            .getByLabel('Masculino')

        const radioGeneroOutros = page 
            .getByTestId('form-base-radio-genero-nao-informar')
            .getByLabel('Prefiro não informar')

        this.radiosGenero = {
            [Genero.FEMININO]: radioGeneroFeminino,
            [Genero.MASCULINO]: radioGeneroMasculino,
            [Genero.OUTRO]: radioGeneroOutros
        }

        this.inputCpf = page.getByTestId('form-base-input-cpf');
        this.inputCidade = page.getByTestId('form-base-input-cidade');
        this.inputTelefone = page.getByTestId('form-base-input-telefone');
        
        this.inputEstado = page
            .getByTestId('form-base-container-estado')
            .getByLabel('Estado');
            
        this.inputEmail = page.getByTestId('form-base-input-email');
        this.inputSenha = page.getByTestId('form-base-input-senha');
        this.inputConfirmarEmail = page.getByTestId('form-base-input-confirmar-email');
        this.inputConfirmarSenha = page.getByTestId('form-base-input-confirmar-senha');
        
        this.botaoSubmeterForm = page.getByTestId('form-base-botao-submeter-form');
        this.checkboxTermos = page
            .getByTestId('form-base-checkbox-termos')
            .getByLabel('Li e aceito os termos e condições deste cadastro');
    }

    async visitar() {
        await this.page.goto('/')
        await this.botaoVisitarPaginaCadastro.click()
        await expect(this.page).toHaveURL('/auth/cadastro')
    }

    async preencherNomeCompleto(nomeCompleto: string) {
        await this.inputNome.fill(nomeCompleto)
    }

    async preencherDataNascimento(dataNascimento: Date) {
        const dataFormatada = formatarDataParaForm(dataNascimento);
        await this.inputDataNascimento.fill(dataFormatada);
    }

    async selecionarGenero(genero: Genero) {
        const radioGenero = this.radiosGenero[genero]
        await radioGenero.check()
    }

    async preencherCpf(cpf: string) {
        await this.inputCpf.fill(cpf)
    }

    async preencherCidade(cidade: string) {
        await this.inputCidade.fill(cidade)
    }

    async preencherEstado(estado: string) {
        await this.inputEstado.fill(estado)
        await this.inputEstado.press('Enter')
    }

    async preencherTelefone(telefone: string) {
        await this.inputTelefone.fill(telefone)
    }

    async preencherEmail(email: string) {
        await this.inputEmail.fill(email)
        await this.inputConfirmarEmail.fill(email)
    }

    async preencherSenha(senha: string) {
        await this.inputSenha.fill(senha)
        await this.inputConfirmarSenha.fill(senha)
    }

    async confirmarTermos() {
        await this.checkboxTermos.check();
    }

    async clicarBotaoCadastrarUsuario() {
        await this.botaoSubmeterForm.click()
    }

    async cadastroFeitoComSucesso() {
        await expect(this.page).toHaveURL('/auth/login')
    }

    async estaMostrandoMensagemDeErro(mensagem: string) {
        const elementoErro = this.page.getByText(mensagem)
        await expect(elementoErro).toBeVisible()
    }
}