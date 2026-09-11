### 🚗 Projeto 04: Sistema de Controle de Estacionamento
- **Padrão Utilizado:** GoF Criacional – Singleton.
- **Modelagem:** A classe `GerenciaEstacionamento` controla de forma centralizada a capacidade do pátio (máximo de 10 vagas), impedindo a coexistência de múltiplas instâncias na memória através de `GerenciaEstacionamento.getInstance()`.
- **Funcionalidades:**
  - Controle de entrada/saída com validação de campos, impedimento de placas duplicadas e pátio lotado.
  - Atualização em tempo real do painel de vagas (Totais, Ocupadas e Disponíveis) e da lista exibida no DOM.
  - Registros formatados no console a cada operação e validação de identidade de instâncias (`estacionamento1 === estacionamento2`).
