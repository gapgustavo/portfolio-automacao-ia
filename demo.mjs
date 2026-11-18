// Dados integralmente fictícios, criados para demonstração.
const vaga = { titulo: 'Atendimento empresarial', criterios: ['atendimento', 'organização', 'relatórios'] };
const perfis = [
  { id: 'Exemplo A', experiencia: 'Atendimento a empresas e organização de solicitações.' },
  { id: 'Exemplo B', experiencia: 'Produção de relatórios e acompanhamento de processos.' },
];

const resultados = perfis.map((perfil) => ({
  id: perfil.id,
  evidencias: vaga.criterios.filter((criterio) => perfil.experiencia.toLocaleLowerCase('pt-BR').includes(criterio)),
  naoIdentificado: vaga.criterios.filter((criterio) => !perfil.experiencia.toLocaleLowerCase('pt-BR').includes(criterio)),
}));

const pedido = {
  instrucao: 'Organize as evidências e lacunas para revisão humana. Não infira informações ausentes e não tome decisão de contratação.',
  vaga,
  perfis,
};

console.log(JSON.stringify({ resultados, pedidoExemplo: pedido }, null, 2));

// A chamada só ocorre quando solicitada explicitamente e com uma chave própria.
if (process.argv.includes('--ia')) {
  const chave = process.env.OPENAI_API_KEY;
  if (!chave) {
    console.error('Defina OPENAI_API_KEY no ambiente antes de executar com --ia.');
    process.exitCode = 1;
  } else {
    const resposta = await fetch('https://api.openai.com/v1/responses', {
      method: 'POST',
      headers: { Authorization: `Bearer ${chave}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ model: process.env.OPENAI_MODEL || 'gpt-4.1-mini', input: JSON.stringify(pedido) }),
    });
    if (!resposta.ok) {
      console.error(`A chamada de IA falhou (HTTP ${resposta.status}). Verifique a configuração da API.`);
      process.exitCode = 1;
    } else {
      const dados = await resposta.json();
      const texto = (dados.output || []).flatMap((item) => item.content || [])
        .filter((item) => item.type === 'output_text').map((item) => item.text).join('\n');
      console.log('\nAnálise da IA para revisão humana:\n' + (texto || 'A API não retornou texto.'));
    }
  }
}

