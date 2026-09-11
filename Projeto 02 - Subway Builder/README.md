### 🥪 Projeto 02: Subway Builder
- **Padrão Utilizado:** GoF Criacional – Builder.
- **Modelagem:** A classe `LancheBuilder` abstrai e encapsula todas as etapas sequenciais de montagem do objeto complexo `Lanche` (Tamanho, Pão, Proteína, Queijo, Aquecimento, Saladas, Molhos e Adicionais).
- **Isolamento de Estado:** O método `construir()` possui um mecanismo de reset manual que zera os atributos internos do builder imediatamente após a entrega do lanche, impedindo o bug de efeito cascata (um pedido herdar dados do anterior).
