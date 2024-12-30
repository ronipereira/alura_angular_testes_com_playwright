import { Locator, Page } from "@playwright/test";
import { Genero, Perfil } from "../operacoes/gerarPerfil";
import { formatarDataParaForm } from "../operacoes/datas";

export default class FormBaseCadastroEPerfil {
    readonly page: Page;
    readonly inputNome: Locator;
    readonly inputDataNascimento: Locator;
    readonly radiosGenero: { [chave in Genero]: Locator };
    readonly inputCpf: Locator;
    readonly inputCidade: Locator;
    readonly inputTelefone: Locator;
    readonly inputEstado: Locator;
    readonly inputEmail: Locator;
    readonly inputSenha: Locator;
    readonly inputConfirmarEmail: Locator;
    readonly inputConfirmarSenha: Locator;
    readonly botaoSubmeterForm: Locator;

    constructor(page: Page) {
        this.page = page;
        
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

    async preencherForm(dados: Perfil) {
        await this.preencherNomeCompleto(dados.nome)
        await this.preencherDataNascimento(dados.dataNascimento)
        await this.selecionarGenero(dados.genero)
        await this.preencherCpf(dados.cpf)
        await this.preencherCidade(dados.cidade)
        await this.preencherEstado(dados.estado)
        await this.preencherTelefone(dados.telefone)
        await this.preencherEmail(dados.email)
        await this.preencherSenha(dados.senha)
    }

    async obterDadosForm() {
        return {
            nome: await this.inputNome.inputValue(),
            dataNascimento: await this.inputDataNascimento.inputValue(),
            genero: await this.radiosGenero[Genero.FEMININO].inputValue(),
            cpf: await this.inputCpf.inputValue(),
            cidade: await this.inputCidade.inputValue(),
            telefone: await this.inputTelefone.inputValue(),
            estado: await this.inputEstado.inputValue(),
            email: await this.inputEmail.inputValue(),
            senha: await this.inputSenha.inputValue()
        }
    }

    async clicarBotaoSubmeterFormulario() {
        await this.botaoSubmeterForm.click()
    }

    async obterValorInputEmail() {
        return this.inputEmail.inputValue()
    }
}