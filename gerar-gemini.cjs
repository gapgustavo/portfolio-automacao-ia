const fs = require('node:fs');
const path = require('node:path');
const dir = __dirname;
const workflow = JSON.parse(fs.readFileSync(path.join(dir, 'fluxo-agente-ia.n8n.json'), 'utf8'));
workflow.name = 'Portfólio - agente Gemini e ferramentas (dados fictícios)';
const model = workflow.nodes.find(node => node.id === 'model');
model.name = 'Gemini - inserir credencial';
model.type = '@n8n/n8n-nodes-langchain.lmChatGoogleGemini';
model.typeVersion = 1;
model.parameters = { modelName: 'models/gemini-3.1-flash-lite', options: { temperature: 0 } };
delete workflow.connections['Modelo OpenAI - configurar credencial'];
workflow.connections[model.name] = { ai_languageModel: [[{ node: 'Agente de análise assistida', type: 'ai_languageModel', index: 0 }]] };
fs.writeFileSync(path.join(dir, 'fluxo-agente-gemini.n8n.json'), JSON.stringify(workflow, null, 2) + '\n');
console.log('Fluxo Gemini gerado sem credenciais.');

