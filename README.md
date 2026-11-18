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

O mesmo desenho pode ser montado com um gatilho manual, um nó para gerar dados fictícios, um nó Code para identificar evidências, um nó de IA configurado com credenciais próprias e uma etapa final de revisão. Nenhum workflow ou integração da empresa original é incluído aqui.

## Limitações

Esta é uma demonstração independente inspirada em uma prova de conceito. Correspondência de palavras é simplificada e não mede competência. Antes de usar IA com dados reais, avalie autorização, privacidade, qualidade das evidências e supervisão humana.

