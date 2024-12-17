import { Genero, gerarPerfil } from "../operacoes/gerarPerfil";
import { test } from "../setup/fixtures";

test.describe('Página de cadastro', () => {
    test("Deve conseguir fazer cadastro", async ({ paginaCadastro }) => {
        const novoUsuario = gerarPerfil()
        await paginaCadastro.visitar()

        await paginaCadastro.preencherNomeCompleto(novoUsuario.nome)
        await paginaCadastro.preencherDataNascimento(novoUsuario.dataNascimento)
        await paginaCadastro.selecionarGenero(novoUsuario.genero)
        await paginaCadastro.preencherCpf(novoUsuario.cpf)
        await paginaCadastro.preencherCidade(novoUsuario.cidade)
        await paginaCadastro.preencherEstado(novoUsuario.estado)
        await paginaCadastro.preencherTelefone(novoUsuario.telefone)
        await paginaCadastro.preencherEmail(novoUsuario.email)
        await paginaCadastro.preencherSenha(novoUsuario.senha)
        await paginaCadastro.confirmarTermos()
        await paginaCadastro.clicarBotaoCadastrarUsuario()
        await paginaCadastro.cadastroFeitoComSucesso()
    })
})