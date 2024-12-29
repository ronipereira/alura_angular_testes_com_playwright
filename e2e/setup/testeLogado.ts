import * as path from "path";
import * as fs from "fs";
import { test as baseTest } from "./fixtures";
import PaginaCadastro from "../page-objects/PaginaCadastro";
import PaginaLogin from "../page-objects/PaginaLogin";
import { gerarPerfil } from "../operacoes/gerarPerfil";
import { expect } from "@playwright/test";

export const testeLogado = baseTest.extend<{}, { arquivoInfoLogin: string }>({
    arquivoInfoLogin: [async ({ browser }, use) => {
        const id = baseTest.info().parallelIndex;
        const caminhoArquivo = path.resolve(baseTest.info().project.outputDir, `.auth/usuario-${id}.json`);

        if (fs.existsSync(caminhoArquivo)) {
            await use(caminhoArquivo);
            return;
        }

        const page = await browser.newPage({ storageState: undefined });
        const novoUsuario = await criarNovoUsuario(page, caminhoArquivo);

        await use(caminhoArquivo);
        await page.close();
    }, { scope: "worker" }],
    storageState: ({ arquivoInfoLogin }, use) => use(arquivoInfoLogin)
});

async function criarNovoUsuario(page, caminhoArquivo) {
    const paginaCadastro = new PaginaCadastro(page);
    const paginaLogin = new PaginaLogin(page);
    const novoUsuario = gerarPerfil();

    await page.goto('http://localhost:4200/auth/cadastro');
    await paginaCadastro.cadastrarUsuario(novoUsuario);
    await expect(page).toHaveURL('http://localhost:4200/auth/login');
    await paginaLogin.fazerLogin(novoUsuario.email, novoUsuario.senha);
    await expect(page).toHaveURL('http://localhost:4200/home');

    await page.context().storageState({ path: caminhoArquivo });

    return novoUsuario;
}