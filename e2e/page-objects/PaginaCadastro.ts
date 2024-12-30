import { expect, Locator, Page } from "@playwright/test"
import FormBaseCadastroEPerfil from "./FormBaseCadastroEPerfil";
import { Perfil } from "../operacoes/gerarPerfil";

export default class PaginaCadastro {
    private readonly page: Page;
    private readonly formBase: FormBaseCadastroEPerfil
    private readonly botaoVisitarPaginaCadastro: Locator;
    private readonly checkboxTermos: Locator;

    constructor(page: Page) {
        this.page = page;
        this.formBase = new FormBaseCadastroEPerfil(page)
        this.botaoVisitarPaginaCadastro = page.getByRole('button', { name: 'CADASTRE-SE' });
        
        this.checkboxTermos = page
            .getByTestId('form-base-checkbox-termos')
            .getByLabel('Li e aceito os termos e condições deste cadastro');
    }

    async visitar() {
        await this.page.goto('/')
        await this.botaoVisitarPaginaCadastro.click()
        await expect(this.page).toHaveURL('/auth/cadastro')
    }
    
    async confirmarTermos() {
        await this.checkboxTermos.check();
    }

    async cadastrarUsuario(usuario: Perfil) {
        await this.formBase.preencherForm(usuario)
        await this.confirmarTermos()
        await this.formBase.clicarBotaoSubmeterFormulario()
    }

    async cadastroFeitoComSucesso() {
        await expect(this.page).toHaveURL('/auth/login')
    }

    async estaMostrandoMensagemDeErro(mensagem: string) {
        const elementoErro = this.page.getByText(mensagem)
        await expect(elementoErro).toBeVisible()
    }
}