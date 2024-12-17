import { test } from "../setup/fixtures";

test.describe('Página de cadastro', () => {
    test("Deve conseguir fazer cadastro", async ({paginaCadastro}) => {
        await paginaCadastro.visitar()
    })
})