# ImoSimula

Simulador de investimento imobiliário para o mercado português. Analisa a rentabilidade de comprar um imóvel para arrendamento, considerando financiamento, impostos, despesas e projeções de valorização.

## Funcionalidades

- **Yields e métricas** — Yield bruta, Cap Rate, Yield líquida, Cash-on-Cash
- **Cash Flow** — Cálculo mensal e anual após despesas, IRS e prestação
- **Projeção temporal** — Evolução de equity, lucro e cash flow acumulado ao longo do tempo
- **Custos de aquisição** — IMT (tabela investimento), Imposto de Selo, registos e obras
- **P&L detalhado** — Demonstração de resultados anual (Ano 1)
- **Cenário de saída** — Lucro líquido na venda com comissão imobiliária e mais-valias
- **Gráficos interativos** — Evolução do investimento e cash flow anual

## Parâmetros configuráveis

| Grupo | Parâmetros |
|---|---|
| **Imóvel** | Preço, Renda mensal |
| **Rápidos** | Entrada (%), Obras (k€), Horizonte (anos) |
| **Financiamento** | Taxa de juro (%), Prazo (anos) |
| **Despesas** | IMI (%), Condomínio, Manutenção (%), Seguro, Gestão (%), Registos |
| **Projeção** | Valorização anual, Aumento renda, Ocupação (meses/ano), Duração contrato |

## Impostos calculados

- **IMT** — Tabela para segundas habitações / investimento (não HPP)
- **Imposto de Selo** — 0.8% sobre aquisição
- **IRS sobre rendas** — Taxa autónoma por duração de contrato (5% a 28%)
- **Mais-valias** — 50% tributado a 28%, com coeficiente de atualização monetária

## Tech Stack

- React 19 + TypeScript
- Vite
- Tailwind CSS
- Recharts (gráficos)
- Lucide React (ícones)

## Instalação

```bash
npm install
npm run dev
```

## Deploy no Railway

A configuração Infrastructure as Code está em [`.railway/railway.ts`](.railway/railway.ts).
Define o build (`npm run build`), o arranque (`npm start`, com a porta `$PORT`)
e a verificação HTTP em `/`. As dependências de infraestrutura estão separadas
da aplicação em `.railway/package.json`.

Requer Railway CLI **5.75.0 ou superior**. Na raiz do repositório:

```bash
npm install --prefix .railway
npm --prefix .railway run check
railway login
railway link
railway config plan
railway config apply
```

Selecionar o projeto e o ambiente existentes em `railway link`. Antes de aplicar,
confirmar que `service("imo-simula", ...)` usa o nome exato do serviço existente
no painel. Se o nome for diferente, ajustar essa chamada; o plano deve atualizar
esse serviço, sem criar um duplicado nem eliminar recursos.

O ficheiro exporta o partial `imo-simula`, limitando a gestão aos recursos deste
repositório. Manter esse identificador depois da primeira aplicação. As variáveis
continuam a ser geridas no Railway (`variables: { managed: false }`).

O Railway não lê `.railway/railway.ts` durante o deploy. Executar
`railway config plan` e `railway config apply` sempre que esta configuração mudar;
os deploys da aplicação continuam a usar a origem configurada no painel.

Este repositório não contém `railway.toml` nem `railway.json`. Se o serviço ainda
tiver um **Config File path** antigo definido no painel, limpar esse campo antes
do primeiro plano IaC, ou executar `railway config migrate cutover` depois de
ligar o projeto e confirmar o nome do serviço.

Referência: [Infrastructure as Code — Railway](https://docs.railway.com/infrastructure-as-code).

## Aviso

⚠️ Simulador informativo — não constitui aconselhamento financeiro.
