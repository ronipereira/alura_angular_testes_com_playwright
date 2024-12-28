import PaginaPrincipal from "../page-objects/PaginaPrincipal";
import { testeLogado } from "../setup/testeLogado";

testeLogado.describe("Página de perfil", () => {
    testeLogado("Editar perfil 1", async ( { paginaPrincipal} ) => {
        await paginaPrincipal.visitar()
    })

    testeLogado("Editar perfil 2", () => {
        
    })
})