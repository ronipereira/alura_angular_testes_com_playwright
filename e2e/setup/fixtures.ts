import { test as base } from "@playwright/test"
import PaginaLogin from "../page-objects/PaginaLogin"
import PaginaPrincipal from "../page-objects/PaginaPrincipal"
import PaginaCadastro from "../page-objects/PaginaCadastro"
import PaginaPerfil from "../page-objects/PaginaPerfil"

export const test = base.extend<{ 
    paginaPrincipal: PaginaPrincipal,
    paginaLogin: PaginaLogin,
    paginaCadastro: PaginaCadastro
    paginaPerfil: PaginaPerfil
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
    },
    paginaPerfil: async ({ page }, use) => {
        const paginaPerfil = new PaginaPerfil(page)
        await use(paginaPerfil)
    }
})