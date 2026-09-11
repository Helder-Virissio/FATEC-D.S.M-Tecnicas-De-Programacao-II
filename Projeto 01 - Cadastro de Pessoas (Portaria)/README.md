### 🏢 Projeto 01: Cadastro de Pessoas (Portaria)
- **Padrão Utilizado:** GoF Criacional – Factory Method.
- **Modelagem:** A classe abstrata `CadastroPessoas` define a interface padrão do método de criação (`criarPessoa`), delegando a instanciação real das subclasses (`Estudante`, `Professor`, `Administrativo`, `Terceiro` e `Visitante`) para suas respectivas fábricas concretas (`CadastroEstudante`, `CadastroProfessor`, etc.).
- **Objetivo:** Garantir o desacoplamento entre a criação dos objetos e o código cliente que os consome.
