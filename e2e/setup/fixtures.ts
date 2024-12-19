import { test as base } from "@playwright/test"
import PaginaLogin from "../page-objects/PaginaLogin"
import PaginaPrincipal from "../page-objects/PaginaPrincipal"
import PaginaCadastro from "../page-objects/PaginaCadastro"

export const test = base.extend<{ 
    paginaPrincipal: PaginaPrincipal,
    paginaLogin: PaginaLogin,
    paginaCadastro: PaginaCadastro
}>({
    paginaPrincipal: async ({ page }, use) => {
        const paginaPrincipal = new PaginaPrincipal(page)
        await use(paginaPrincipal)
    },
    paginaLogin: async ({ page }, use) => {
        const paginaLogin = new PaginaLogin(page)
        await use(paginaLogin)
    },
    paginaCadastro: async ({ page }, use) => {
        const paginaPrincipal = new PaginaCadastro(page)
        await use(paginaPrincipal)
    }
})