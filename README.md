# Protótipo de integração e apoio à análise com IA

Este projeto demonstra uma arquitetura para conectar dados profissionais fictícios a um processo de análise assistida por IA. A demonstração usa apenas exemplos criados para este portfólio; não contém currículos, dados de candidatos reais, credenciais ou integrações internas.

O fluxo lê uma vaga e perfis sintéticos, identifica evidências textuais relacionadas aos critérios e monta um pedido estruturado para uma etapa opcional de análise por modelo de linguagem. O resultado é apoio à revisão humana, não uma decisão automática de contratação.

## Executar

Com Node.js 18 ou superior instalado:

```bash
node demo.mjs
```

O programa exibe os sinais encontrados e um exemplo de pedido. Por padrão, a demonstração é local e não chama APIs.

### Análise opcional com IA

Para enviar os exemplos fictícios à API da OpenAI, configure sua própria chave na variável de ambiente `OPENAI_API_KEY` e execute `node demo.mjs --ia`. A chamada pode gerar cobrança na sua conta da API. O modelo padrão é `gpt-4.1-mini`; para alterar, defina `OPENAI_MODEL` no ambiente. Nunca inclua chaves no código ou no repositório.

Exemplo no PowerShell, sem gravar a chave em arquivo:

```powershell
$env:OPENAI_API_KEY = Read-Host 'Chave da API'
node demo.mjs --ia
Remove-Item Env:OPENAI_API_KEY
```

A integração requer acesso à API e créditos ou faturamento configurado; a assinatura do ChatGPT pode não incluir uso da API. O projeto não mede custos ou desempenho de provedores.

## Fluxo em n8n

### Agente de IA com ferramentas e subfluxos

Importe `fluxo-agente-ia.n8n.json` no n8n. Ele contém um agente, um modelo OpenAI e três ferramentas que executam subfluxos: consulta à base fictícia, extração de evidências textuais e checklist de revisão humana. Os subfluxos também estão disponíveis como arquivos separados para inspeção; as ferramentas já contêm cópias dos seus respectivos fluxos, por isso não é necessário configurar IDs para executá-los.

Para executar, abra o nó **Modelo OpenAI - configurar credencial**, crie ou selecione sua credencial OpenAI no n8n e execute o fluxo manualmente. O uso da API pode gerar cobrança. O agente precisa de acesso ao modelo e pode chamar as ferramentas em ordens diferentes; revise os registros de execução para confirmar as chamadas. A análise e a decisão final são humanas. Não use dados pessoais reais nesta demonstração.

O arquivo `gerar-fluxo.cjs` permite regenerar o fluxo principal e os três subfluxos. Esta versão é uma demonstração independente, não uma reprodução dos sistemas de uma empresa.

### Exemplo simples sem IA

O arquivo `fluxo-exemplo.n8n.json` é um exemplo importável: no editor do n8n, use **Import from File** e selecione o arquivo. Execute o fluxo manualmente para gerar dois perfis fictícios, identificar evidências textuais e preparar um pedido para revisão com IA.

O fluxo não faz chamadas externas por padrão e não inclui credenciais. Para efetuar a análise no n8n, adicione um nó de IA ou requisição HTTP após **Preparar evidências e pedido de IA**, configure suas próprias credenciais e envie o campo `pedidoParaIA`. A chamada poderá gerar custos. A integração de IA pronta para execução está na versão em Node.js descrita acima. Nenhum workflow ou integração da empresa original é incluído aqui.

## Limitações

Esta é uma demonstração independente inspirada em uma prova de conceito. Correspondência de palavras é simplificada e não mede competência. Antes de usar IA com dados reais, avalie autorização, privacidade, qualidade das evidências e supervisão humana.

