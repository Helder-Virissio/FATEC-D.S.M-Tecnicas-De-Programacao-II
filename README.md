# 🎓 FATEC — Técnicas de Programação II

<p align="center">
  <img src="https://img.shields.io/badge/Curso-DSM-blue?style=for-the-badge" alt="DSM" />
  <img src="https://img.shields.io/badge/Instituição-FATEC-red?style=for-the-badge" alt="FATEC" />
  <img src="https://img.shields.io/badge/Linguagem-JavaScript-yellow?style=for-the-badge&logo=javascript" alt="JavaScript" />
  <img src="https://img.shields.io/badge/Padrões-GoF-brightgreen?style=for-the-badge" alt="GoF Patterns" />
</p>

> Repositório dedicado ao armazenamento das atividades de fixação e projetos práticos desenvolvidos na disciplina de **Técnicas de Programação II** do curso de *Desenvolvimento de Software Multiplataforma (DSM)*.

---

## 📁 Estrutura de Organização do Repositório

O repositório está organizado de forma limpa diretamente na raiz, facilitando a navegação entre os conteúdos teóricos e as entregas avaliativas:

* **`📁 Conteudo Aulas`**: Centraliza os códigos de exemplos práticos e exercícios de fixação desenvolvidos em sala de aula (Ex: *Factory Method*, *Abstract Factory*, *Builder* e *Singleton*).
* **`📁 Projeto 01 - Cadastro de Pessoas (Portaria)`**: Projeto prático individual focado na criação estruturada de diferentes tipos de pessoas no sistema de controle de acesso, aplicando o padrão **GoF – Factory Method**.
* **`📁 Projeto 02 - Subway Builder`**: Projeto prático individual focado na simulação completa e passo a passo de um sistema de pedidos personalizado, aplicando o padrão **GoF – Builder**.
* **`📁 Projeto 03 - McDonald's`**: Exercício prático focado na prototipagem e gerenciamento estruturado de ofertas.
* **`📁 Projeto 04 - Estacionamento`**: Sistema prático de controle de entrada e saída de veículos integrado à interface HTML e Node.js, aplicando o padrão **GoF – Singleton**.

---

## 🏗️ Detalhes Técnicos dos Projetos Entregues

### 🏢 Projeto 01: Cadastro de Pessoas (Portaria)
- **Padrão Utilizado:** GoF Criacional – Factory Method.
- **Modelagem:** A classe abstrata `CadastroPessoas` define a interface padrão do método de criação (`criarPessoa`), delegando a instanciação real das subclasses (`Estudante`, `Professor`, `Administrativo`, `Terceiro` e `Visitante`) para suas respectivas fábricas concretas (`CadastroEstudante`, `CadastroProfessor`, etc.).
- **Objetivo:** Garantir o desacoplamento entre a criação dos objetos e o código cliente que os consome.

---

### 🥪 Projeto 02: Subway Builder
- **Padrão Utilizado:** GoF Criacional – Builder.
- **Modelagem:** A classe `LancheBuilder` abstrai e encapsula todas as etapas sequenciais de montagem do objeto complexo `Lanche` (Tamanho, Pão, Proteína, Queijo, Aquecimento, Saladas, Molhos e Adicionais).
- **Isolamento de Estado:** O método `construir()` possui um mecanismo de reset manual que zera os atributos internos do builder imediatamente após a entrega do lanche, impedindo o bug de efeito cascata (um pedido herdar dados do anterior).

---

### 🍔 Projeto 03: McDonald's
- **Modelagem:** Implementação e gerenciamento centralizado de ofertas e protótipos de lanches utilizando classes como `McOferta` e `GerenciaMcOferta`.

---

### 🚗 Projeto 04: Sistema de Controle de Estacionamento
- **Padrão Utilizado:** GoF Criacional – Singleton.
- **Modelagem:** A classe `GerenciaEstacionamento` controla de forma centralizada a capacidade do pátio (máximo de 10 vagas), impedindo a coexistência de múltiplas instâncias na memória através de `GerenciaEstacionamento.getInstance()`.
- **Funcionalidades:**
  - Controle de entrada/saída com validação de campos, impedimento de placas duplicadas e pátio lotado.
  - Atualização em tempo real do painel de vagas (Totais, Ocupadas e Disponíveis) e da lista exibida no DOM.
  - Registros formatados no console a cada operação e validação de identidade de instâncias (`estacionamento1 === estacionamento2`).

---

## 🚀 Como Executar os Projetos

Certifique-se de ter o [Node.js](https://nodejs.org) instalado em sua máquina.

### 💻 Via Node.js (Terminal)
1. Abra o prompt de comando (CMD) ou terminal na pasta do projeto desejado.
2. Execute o comando passando o nome do arquivo correspondente:
   ```bash
   node script.js
