# alura_angular_testes_com_playwright

Curso Alura: Angular: escreva testes end-to-end com Playwright

## Descrição

Este projeto é parte do curso da Alura sobre testes end-to-end utilizando Playwright com Angular. O objetivo é ensinar como escrever testes automatizados para aplicações web, garantindo a qualidade e a funcionalidade do software.

## Estrutura do Projeto

- **e2e/**: Contém os testes end-to-end.
  - **operacoes/**: Funções utilitárias e geração de dados de teste.
  - **page-objects/**: Objetos de página que encapsulam a interação com elementos da UI.
  - **setup/**: Configurações e fixtures para os testes.
  - **specs/**: Especificações dos testes.
- **playwright-report/**: Relatórios gerados pelo Playwright.
- **test-results/**: Resultados dos testes.
- **tests-examples/**: Exemplos de testes fornecidos pelo Playwright.

## Pré-requisitos

- Node.js
- npm

## Instalação

1. Clone o repositório:
    ```sh
    git clone https://github.com/ronipereira/alura_angular_testes_com_playwright.git
    ```
2. Navegue até o diretório do projeto:
    ```sh
    cd alura_angular_testes_com_playwright
    ```
3. Instale as dependências:
    ```sh
    npm install
    ```

## Executando os Testes

Para executar todos os testes end-to-end:
```sh
npm run e2e
```
