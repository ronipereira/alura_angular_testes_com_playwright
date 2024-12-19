import { gerarPerfil } from '../operacoes/gerarPerfil'
import { test } from '../setup/fixtures'

test.describe("Página de Login", () => {
    test.beforeEach(async ( { paginaLogin}  ) => {
        await paginaLogin.visitar()
    })
    
    test("Deve conseguir fazer login com email e senha válidos", async ({ paginaLogin, paginaCadastro }) => {
        const novoUsuario = gerarPerfil()
        await paginaCadastro.visitar()
        await paginaCadastro.cadastrarUsuario(novoUsuario)
        await paginaCadastro.cadastroFeitoComSucesso()

        await paginaLogin.visitar()
        await paginaLogin.fazerLogin(novoUsuario.email, novoUsuario.senha)
        await paginaLogin.loginFeitoComSucesso()
    })

    test("Não deve realizar login com email inválido", async ({ paginaLogin }) => {
        await paginaLogin.fazerLogin('invalido@gmail.com', '123456')
        await paginaLogin.estaMostrandoMensagemDeErro('Você não está autorizado a acessar este recurso')
    })

    test("Não deve realizar login com formato de email inválido", async ({ paginaLogin }) => {
        await paginaLogin.preencherEmailESenha('invalido', '')
        await paginaLogin.estaMostrandoMensagemDeErro('E-mail inválido')
    })
})  