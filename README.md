# Kurio

![React](https://img.shields.io/badge/React-20232A?style=flat-square&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=flat-square&logo=vite&logoColor=white)
![TanStack Router](https://img.shields.io/badge/TanStack_Router-FF4154?style=flat-square&logo=reactrouter&logoColor=white)
![TanStack Query](https://img.shields.io/badge/TanStack_Query-FF4154?style=flat-square&logo=reactquery&logoColor=white)
![Axios](https://img.shields.io/badge/Axios-5A29E4?style=flat-square&logo=axios&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)
![shadcn/ui](https://img.shields.io/badge/shadcn%2Fui-000000?style=flat-square&logo=shadcnui&logoColor=white)
![MSW](https://img.shields.io/badge/MSW-FF6A33?style=flat-square&logo=mockserviceworker&logoColor=white)
![Socket.IO](https://img.shields.io/badge/Socket.IO-010101?style=flat-square&logo=socketdotio&logoColor=white)
![Playwright](https://img.shields.io/badge/Playwright-2EAD33?style=flat-square&logo=playwright&logoColor=white)

Kurio é um marketplace de NFTs responsivo desenvolvido com React e TypeScript.

A aplicação inclui catálogo de NFTs, busca, filtros, página de detalhes, carrinho persistente, autenticação, pagamento, confirmação de pedido, perfil e carteiras, API REST mockada, atualizações em tempo real com Socket.IO e testes end-to-end com Playwright.

## Tecnologias

- React
- TypeScript
- Vite
- TanStack Router
- TanStack Query
- Axios
- Tailwind CSS
- shadcn/ui
- MSW
- Socket.IO
- Playwright

## Funcionalidades

### Catálogo de NFTs

O catálogo possui:

- Busca
- Filtro por coleção
- Filtro por rede
- Filtro de preço mínimo e máximo em ETH
- Ordenação
- Paginação
- Estado persistido na URL
- Navegação para os detalhes de cada NFT
- Layout responsivo

O estado do catálogo é controlado pelo TanStack Router através dos parâmetros da URL.

Exemplo:

```text
/?search=nomad&page=1&sort=featured&collection=&network=&priceMin=&priceMax=
```

Isso permite manter busca, filtros, ordenação e paginação após navegação ou atualização da página.

## Detalhes do NFT

Cada NFT possui sua própria página de detalhes com:

- Imagem
- Nome
- Coleção
- Rede
- Preço em ETH
- Seleção de edição
- Controle de quantidade
- Cálculo do preço total
- Adição ao carrinho

## Carrinho

O carrinho permite:

- Adicionar NFT
- Aumentar quantidade
- Diminuir quantidade
- Remover item
- Limpar carrinho
- Persistir itens em `localStorage`
- Aplicar cupom de desconto
- Calcular valores em ETH com precisão

Exemplo de cupom:

```text
10OFFKURIO
```

O número anterior a `OFFKURIO` representa o percentual de desconto.

Por exemplo:

```text
10OFFKURIO = 10%
25OFFKURIO = 25%
```

## Precisão dos valores em ETH

Os valores em ETH são representados como strings decimais, evitando cálculos financeiros com números de ponto flutuante.

Exemplos:

```text
"1.25"
"0.003"
"9.99"
```

Os cálculos utilizam `BigInt` internamente para evitar problemas de precisão comuns em operações com `Number`.

Por exemplo:

```js
0.1 + 0.2;
```

pode produzir um resultado impreciso em JavaScript.

A implementação converte os valores para uma representação inteira antes das operações matemáticas e depois converte o resultado novamente para uma string decimal.

## Autenticação

A aplicação possui um fluxo de autenticação mockado com:

- Login
- Cadastro de usuário
- Logout
- Sessão persistente
- Acesso protegido ao pagamento
- Acesso ao perfil

Existe um usuário de demonstração:

```text
E-mail: demo@kurio.com
Senha: 123456
```

Também é possível cadastrar novos usuários pela interface.

Os usuários e a sessão são armazenados localmente apenas para fins de demonstração. Essa implementação não representa uma estratégia de autenticação para ambiente de produção.

## Perfil e carteiras

Usuários autenticados podem acessar a área de perfil para:

- Visualizar e alterar dados do perfil
- Visualizar e alterar dados da carteira
- Encerrar a sessão

Os dados são persistidos localmente.

## Pagamento

Na etapa de pagamento, o usuário pode selecionar uma das carteiras disponíveis:

- WalletConnect
- MetaMask
- Coinbase Wallet

Após selecionar a carteira, é possível confirmar a compra e criar um pedido.

## Pedidos

Os pedidos são criados através da API REST mockada:

```http
POST /api/orders
```

Cada criação de pedido envia uma chave de idempotência no header:

```http
Idempotency-Key: <uuid>
```

Requisições repetidas utilizando a mesma chave retornam o mesmo pedido, evitando a criação de pedidos duplicados.

Após uma compra concluída:

- O carrinho é limpo
- No desktop, o usuário é direcionado para a página de confirmação
- No mobile, uma confirmação simplificada é exibida

## API REST

As requisições HTTP são realizadas com Axios.

TanStack Query gerencia o estado remoto, cache e ciclo de vida das requisições.

A API é simulada utilizando MSW.

Principais endpoints:

```text
GET  /api/nfts
GET  /api/nfts/:id
POST /api/orders
```

Os componentes não consomem diretamente os dados mockados.

O fluxo de dados segue esta estrutura:

```text
Componente
    ↓
TanStack Query
    ↓
Axios
    ↓
API REST
    ↓
MSW
```

## Atualizações em tempo real

Socket.IO é utilizado para simular atualizações em tempo real.

Os eventos recebidos pela aplicação são:

```text
nft.updated
order.updated
```

O servidor mock de realtime é opcional e não é iniciado no desenvolvimento normal.

### Desenvolvimento normal

Execute:

```bash
npm run dev
```

Esse comando inicia apenas o Vite.

Nenhuma conexão com o servidor Socket.IO mock é realizada.

### Desenvolvimento com realtime

Execute:

```bash
npm run dev:realtime
```

Esse comando inicia o Vite e o servidor Socket.IO mock.

O servidor realtime é executado em:

```text
http://localhost:3001
```

### Cenário realtime de NFT

Ao executar:

```bash
npm run dev:realtime
```

o servidor simula alterações nos NFTs.

O cenário de demonstração atual realiza:

```text
Após alguns segundos:
preço do primeiro NFT é atualizado

Depois:
imagem do segundo NFT é atualizada
```

As alterações são enviadas através do evento:

```text
nft.updated
```

e refletidas na interface.

### Cenário realtime de pedido

Após a criação de um pedido, o frontend envia:

```text
order.created
```

com o ID do pedido criado.

O servidor Socket.IO recebe o evento e responde alguns segundos depois com:

```text
order.updated
```

para o mesmo ID.

Ao receber a atualização, a interface apresenta uma confirmação simples na tela.

O ID do pedido não precisa ser fixado no servidor mock, permitindo testar o fluxo com qualquer pedido criado.

## Gerenciamento de estado

Cada tipo de estado é mantido na camada correspondente à sua responsabilidade.

### Estado da URL

TanStack Router gerencia:

- Busca
- Filtros
- Ordenação
- Paginação

### Estado remoto

TanStack Query gerencia os dados obtidos através da API REST.

Exemplo de query key do catálogo:

```ts
["nfts", params];
```

### Estado local

React State e React Context são utilizados para estados locais e autenticação.

### Persistência local

`localStorage` é utilizado para persistir:

- Carrinho
- Usuários cadastrados
- Sessão
- Perfil
- Carteira

Não foi utilizada uma biblioteca adicional de estado global, pois React Context, TanStack Query e o estado da URL atendem às necessidades da aplicação.

## Responsividade

A interface foi desenvolvida considerando os seguintes tamanhos de viewport:

```text
390px
768px
1440px
```

Existem adaptações específicas para mobile, tablet e desktop.

Alguns fluxos são simplificados no mobile para manter a navegação adequada a telas menores.

## Mock Backend

A API REST é simulada utilizando MSW.

Configuração padrão:

```env
VITE_ENABLE_MOCKS=true
VITE_ENABLE_REALTIME_MOCK=false
```

O MSW permite executar e testar os principais fluxos sem depender de um backend externo.

## Variáveis de ambiente

Crie um arquivo `.env` com:

```env
VITE_ENABLE_MOCKS=true
VITE_ENABLE_REALTIME_MOCK=false
```

O repositório também possui:

```text
.env.example
```

com as variáveis necessárias.

O comando:

```bash
npm run dev:realtime
```

inicia o Vite com:

```text
VITE_ENABLE_REALTIME_MOCK=true
```

durante a execução.

## Instalação

Instale as dependências:

```bash
npm install
```

## Desenvolvimento

Para iniciar a aplicação normalmente:

```bash
npm run dev
```

Para iniciar a aplicação com o servidor realtime:

```bash
npm run dev:realtime
```

## Build de produção

Para gerar o build:

```bash
npm run build
```

Para executar o build de produção localmente:

```bash
npm run preview
```

## Testes End-to-End

Os testes end-to-end são implementados com Playwright.

Caso o Chromium ainda não esteja instalado:

```bash
npx playwright install chromium
```

Para executar os testes:

```bash
npm run test:e2e
```

Para utilizar a interface visual do Playwright:

```bash
npm run test:e2e:ui
```

Os testes atuais validam:

- Abertura de um NFT
- Adição de um NFT ao carrinho
- Login durante o fluxo de compra
- Finalização de uma compra
- Cadastro de usuário
- Logout
- Login com um usuário previamente cadastrado

## Lighthouse

O build de produção foi analisado com Lighthouse.

| Categoria      | Pontuação |
| -------------- | --------: |
| Performance    |        89 |
| Accessibility  |        98 |
| Best Practices |       100 |
| SEO            |        83 |

O Lighthouse foi executado sobre o build de produção iniciado com:

```bash
npm run preview
```

## Estrutura do projeto

```text
src/
├── api/
├── auth/
├── cart/
├── catalog/
├── components/
│   ├── auth/
│   ├── cart/
│   ├── catalog/
│   ├── home/
│   ├── layout/
│   ├── nft/
│   ├── order/
│   ├── payment/
│   └── ui/
├── lib/
├── mocks/
├── orders/
├── profile/
├── realtime/
└── routes/

scripts/
└── mock-socket-server.mjs

tests/
├── auth.spec.ts
└── purchase.spec.ts
```

## Decisões de arquitetura

### TanStack Router

Gerencia a navegação e o estado armazenado na URL.

### TanStack Query

Gerencia o estado remoto, cache e ciclo de vida das requisições.

### Axios

Realiza a comunicação HTTP.

### MSW

Simula a API REST utilizada pela aplicação.

### Socket.IO

Implementa as atualizações em tempo real.

### React Context

Gerencia o fluxo simples de autenticação.

### localStorage

Persiste os dados mockados necessários entre atualizações da página.

### BigInt

Evita perda de precisão nos cálculos de valores em ETH.

### Playwright

Valida os principais fluxos da aplicação com testes end-to-end.

## Observações

A autenticação, carteiras, pagamento e backend utilizados neste projeto são simulados.

Nenhuma transação real em blockchain é executada, nenhum valor em criptomoeda é transferido e nenhuma carteira real é conectada.

O projeto pode ser executado integralmente em ambiente local, incluindo API REST mockada, autenticação, fluxo de compra, atualizações em tempo real e testes end-to-end.
