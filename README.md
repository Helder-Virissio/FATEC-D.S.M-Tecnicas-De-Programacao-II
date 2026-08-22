# 🎓 FATEC - Técnicas de Programação II

Repositório dedicado ao armazenamento das atividades de fixação e projetos práticos desenvolvidos na disciplina de Técnicas de Programação II do curso de **Desenvolvimento de Software Multiplataforma (DSM)**.

## 📁 Estrutura de Organização do Repositório

O repositório está organizado de forma limpa diretamente na raiz, facilitando a navegação entre os conteúdos teóricos e as entregas avaliativas:

* **`📁 Conteudo Aulas`**: Centraliza os códigos de exemplos práticos e exercícios de fixação desenvolvidos em sala de aula (Ex: *Factory Method*, *Abstract Factory* e conceitos iniciais de *Builder*).
* **`📁 Projeto 01 - Cadastro de Pessoas (Portaria)`**: Projeto prático individual focado na criação estruturada de diferentes tipos de pessoas no sistema de controle de acesso, aplicando o padrão **GoF – Factory Method**.
* **`📁 Projeto 02 - Subway Builder`**: Projeto prático individual focado na simulação completa e passo a passo de um sistema de pedidos personalizado, aplicando o padrão **GoF – Builder**.

---

## 🏗️ Detalhes Técnicos dos Projetos Entregues

### 🏢 Projeto 01: Cadastro de Pessoas (Portaria)
* **Padrão Utilizado**: GoF Criacional – Factory Method.
* **Modelagem**: A classe abstrata `CadastroPessoas` define a interface padrão do método de criação (`criarPessoa`), delegando a instanciação real das subclasses (`Estudante`, `Professor`, `Administrativo`, `Terceiro` e `Visitante`) para suas respectivas fábricas concretas (`CadastroEstudante`, `CadastroProfessor`, etc.).
* **Objetivo**: Garantir o desacoplamento entre a criação dos objetos e o código cliente que os consome.

### 🥪 Projeto 02: Subway Builder
* **Padrão Utilizado**: GoF Criacional – Builder.
* **Modelagem**: A classe `LancheBuilder` abstrai e encapsula todas as etapas sequenciais de montagem do objeto complexo `Lanche` (Tamanho, Pão, Proteína, Queijo, Aquecimento, Saladas, Molhos e Adicionais).
* **Isolamento de Estado**: O método `construir()` possui um mecanismo de reset manual que zera os atributos internos do builder imediatamente após a entrega do lanche, impedindo o bug de efeito cascata (um pedido herdar dados do anterior).
---

## 🚀 Como Executar os Projetos

Certifique-se de ter o [Node.js](https://nodejs.org) instalado em sua máquina.

1. Abra o prompt de comando (CMD) na pasta do projeto desejado.
2. Execute o comando passando o nome do arquivo correspondente:
```bash
node NomeDoArquivo.js
```
