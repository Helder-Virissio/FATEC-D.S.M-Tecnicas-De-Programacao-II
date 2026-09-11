🎓 FATEC - Técnicas de Programação II

Repositório dedicado ao armazenamento das atividades de fixação e projetos práticos desenvolvidos na disciplina de Técnicas de Programação II do curso de Desenvolvimento de Software Multiplataforma (DSM).

📁 Estrutura de Organização do Repositório

O repositório está organizado de forma limpa diretamente na raiz, facilitando a navegação entre os conteúdos teóricos e as entregas avaliativas:
- 📁 Conteudo Aulas: Centraliza os códigos de exemplos práticos e exercícios de fixação desenvolvidos em sala de aula.
- 📁 Projeto 01 - Cadastro de Pessoas (Portaria): Projeto prático focado no controle de acesso, aplicando o padrão GoF – Factory Method.
- 📁 Projeto 02 - Subway Builder: Projeto prático focado na simulação de um sistema de pedidos personalizado, aplicando o padrão GoF – Builder.
- 📁 Projeto 03 - McDonald's: Exercício prático focado em prototipagem e gerenciamento de ofertas.
- 📁 Projeto 04 - Estacionamento: Sistema de controle de entrada e saída de veículos integrado ao HTML e Node.js, aplicando o padrão GoF – Singleton.

🏗️ Detalhes Técnicos dos Projetos Entregues

🏢 Projeto 01: Cadastro de Pessoas (Portaria)
- Padrão Utilizado: GoF Criacional – Factory Method.
- Modelagem: A classe abstrata CadastroPessoas define a interface de criação (criarPessoa), delegando a instanciação para fábricas concretas (CadastroEstudante, CadastroProfessor, etc.).
- Objetivo: Desacoplamento entre a criação dos objetos e a regra de negócio.

🥪 Projeto 02: Subway Builder
- Padrão Utilizado: GoF Criacional – Builder.
- Modelagem: A classe LancheBuilder abstrai a montagem do objeto Lanche (Tamanho, Pão, Proteína, Queijo, Saladas e Adicionais).
- Isolamento de Estado: Método construir() realiza reset manual para impedir acúmulo de dados entre pedidos.

🍔 Projeto 03: McDonald's
- Modelagem: Implementação e gerenciamento de ofertas e protótipos de lanches utilizando classes como McOferta e GerenciaMcOferta.

🚗 Projeto 04: Sistema de Controle de Estacionamento
- Padrão Utilizado: GoF Criacional – Singleton.
- Modelagem: A classe GerenciaEstacionamento gerencia de forma centralizada as vagas (limite máximo de 10 vagas), garantindo uma única instância na memória através de `GerenciaEstacionamento.getInstance()`.
- Funcionalidades:
  - Controle de entrada/saída com validação de campos, placas duplicadas e pátio lotado.
  - Atualização automática dos contadores de vagas (Totais, Ocupadas e Disponíveis) e da lista no DOM.
  - Logs formatados no console a cada operação e validação de igualdade de instância (`estacionamento1 === estacionamento2`).

🚀 Como Executar os Projetos

Via Node.js (Terminal):
1. Certifique-se de ter o Node.js instalado.
2. Abra o terminal na pasta do projeto desejado.
3. Execute:
   node script.js

Via Navegador (Projetos com HTML):
1. Abra a pasta do projeto no VS Code.
2. Clique com o botão direito sobre o arquivo index.html e selecione "Open with Live Server".
