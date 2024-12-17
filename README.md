# Projeto de Testes de Performance com k6

Este projeto realiza testes de carga e desempenho em uma API utilizando a ferramenta **k6**. Os testes são executados para avaliar a performance de várias rotas da API, como:

- **/usuarios**: Teste de listagem de usuários.
- **/login**: Teste de login de usuários.
- **/home**: Teste de carga na página inicial.

## Requisitos

Antes de executar os testes, é necessário ter o **k6** instalado. Você pode instalar o k6 de uma das formas a seguir:

### Instalar o k6 via Homebrew (para macOS/Linux):
```bash
brew install k6
```

### Instalar o k6 via NPM (para Windows ou outros sistemas):
```bash
npm install -g k6
```

Ou siga as instruções completas no [site oficial do k6](https://k6.io/docs/getting-started/installation).

## Estrutura do Projeto

A estrutura do projeto é a seguinte:

```
/project-root
├── /tests
│   ├── homeLoadTest.js        # Teste de carga na página principal
│   ├── loginTest.js           # Teste de carga no login
│   └── usuariosTest.js        # Teste de carga na listagem de usuários
├── run_tests.sh               # Script para rodar todos os testes de uma vez
├── README.md                  # Este arquivo
```

## Testes

### 1. **HomeLoadTest** (`homeLoadTest.js`)

Este teste simula o comportamento de **usuários** acessando a página principal da API (`GET /`). Ele aplica uma carga progressiva de usuários, começando com 10 usuários virtuais (VUs) e aumentando até 50 VUs, com um pico de 1 minuto, para avaliar a performance da rota.

### 2. **LoginTest** (`loginTest.js`)

Este teste avalia a performance da rota de login (`POST /login`). Ele testa a **autenticação de usuários** com um aumento gradual de usuários virtuais, com o objetivo de simular um cenário de **pico de login**.

### 3. **UsuariosTest** (`usuariosTest.js`)

Este teste verifica a performance da rota de listagem de usuários (`GET /usuarios`). Ele também simula um aumento de usuários e avalia o comportamento da API durante esse aumento.

## Rodando os Testes

### 1. **Rodar todos os testes manualmente**

Para rodar os testes individualmente, você pode usar os seguintes comandos:

```bash
k6 run tests/homeLoadTest.js
k6 run tests/loginTest.js
k6 run tests/usuariosTest.js
```

### 2. **Rodar todos os testes automaticamente**

Você pode rodar todos os testes de uma vez utilizando o script **`run_tests.sh`**. Basta executar o seguinte comando na raiz do projeto:

```bash
bash run_tests.sh
```

Esse script vai iterar sobre todos os arquivos `.js` na pasta `tests` e rodar cada um deles automaticamente.

### 3. **Resultados Esperados**

Os testes são configurados para validar os seguintes parâmetros:

- **Status Code**: Verificar se o código de status retornado pela API é 200 (OK).
- **Tempo de Resposta**: Verificar se o tempo de resposta da API está abaixo de 200ms.

### 4. **Personalização dos Testes**

Você pode personalizar os testes editando os arquivos `.js` na pasta `tests`. A configuração de usuários virtuais, estágios de teste e o tempo de execução podem ser ajustados conforme suas necessidades.

## Autor

Este projeto foi criado por **Edmozer Cavalcante**.

