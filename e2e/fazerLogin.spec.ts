import test from "@playwright/test"
import PaginaLogin from "./page-objects/PaginaLogin"

test.describe("Página de Login", () => {
    test("Deve conseguir fazer login com email e senha válidos", async ({ page }) => {
        const paginaLogin = new PaginaLogin(page)
        
        await paginaLogin.visitar()
        await paginaLogin.fazerLogin('ronicp@hotmail.com', '123456')
        await paginaLogin.loginFeitoComSucesso()
    })

    test("Não deve realizar login com email inválido", async ({ page }) => {
        const paginaLogin = new PaginaLogin(page)

        await paginaLogin.visitar()
        await paginaLogin.fazerLogin('invalido@gmail.com', '123456')
        await paginaLogin.estaMostrandoMensagemDeErro('Você não está autorizado a acessar este recurso')
    })

    test("Não deve realizar login com formato de email inválido", async ({ page }) => {
        const paginaLogin = new PaginaLogin(page)

        await paginaLogin.visitar()
        await paginaLogin.preencherEmailESenha('invalido', '')
        await paginaLogin.estaMostrandoMensagemDeErro('E-mail inválido')
    })
})  