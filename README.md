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

Importe `fluxo-agente-gemini.n8n.json` no n8n. Ele contém um agente, um modelo Gemini e três ferramentas que executam subfluxos: consulta à base fictícia, extração de evidências textuais e checklist de revisão humana. Os subfluxos também estão disponíveis como arquivos separados para inspeção; as ferramentas já contêm cópias dos seus respectivos fluxos, por isso não é necessário configurar IDs para executá-los. Alterações nos arquivos separados não atualizam automaticamente as cópias incorporadas.

**Como funciona:**

1. O gatilho manual inicia uma vaga e uma solicitação fictícias.
2. O agente consulta as três ferramentas para obter os perfis, identificar evidências e conferir o checklist de revisão.
3. Cada ferramenta executa um subfluxo incorporado e devolve os dados ao agente.
4. O modelo elabora um relatório com evidências, pontos não identificados e limitações; a última etapa sinaliza que ele aguarda revisão humana.

Para executar, abra o nó **Gemini - inserir credencial**, crie ou selecione sua credencial Gemini no n8n e execute o fluxo manualmente. A demonstração foi testada com Gemini 3.1 Flash Lite e perfis fictícios. O uso da API está sujeito a limites e, conforme a conta e o plano, pode gerar cobrança. A análise e a decisão final são humanas. Não use dados pessoais reais nesta demonstração.

Há também uma variante OpenAI em `fluxo-agente-ia.n8n.json`; ela requer uma credencial própria e não foi testada de ponta a ponta.

Os arquivos `gerar-fluxo.cjs` e `gerar-gemini.cjs` permitem regenerar os exemplos. Esta versão é uma demonstração independente, não uma reprodução dos sistemas de uma empresa.

### Exemplo simples sem IA

O arquivo `fluxo-exemplo.n8n.json` é um exemplo importável: no editor do n8n, use **Import from File** e selecione o arquivo. Execute o fluxo manualmente para gerar dois perfis fictícios, identificar evidências textuais e preparar um pedido para revisão com IA.

O fluxo não faz chamadas externas por padrão e não inclui credenciais. Para efetuar a análise no n8n, adicione um nó de IA ou requisição HTTP após **Preparar evidências e pedido de IA**, configure suas próprias credenciais e envie o campo `pedidoParaIA`. A chamada poderá gerar custos. A integração de IA pronta para execução está na versão em Node.js descrita acima. Nenhum workflow ou integração da empresa original é incluído aqui.

## Limitações

Esta é uma demonstração independente inspirada em uma prova de conceito. Correspondência de palavras é simplificada e não mede competência. Antes de usar IA com dados reais, avalie autorização, privacidade, qualidade das evidências e supervisão humana.

