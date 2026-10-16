// ==========================================
// 1. SISTEMA LEGADO DE BEBIDAS
// ==========================================
class SistemaLegadoBebidas {
  buscarBebidaPorCodigo(codigo) {
    const catalogo = {
      101: { nome: "Refrigerante", tamanho: "300ml", preco: 6.0 },
      102: { nome: "Refrigerante", tamanho: "500ml", preco: 8.0 },
      103: { nome: "Refrigerante", tamanho: "700ml", preco: 10.0 },
      201: { nome: "Suco Natural", tamanho: "300ml", preco: 7.0 },
      202: { nome: "Suco Natural", tamanho: "500ml", preco: 9.0 },
      203: { nome: "Suco Natural", tamanho: "700ml", preco: 11.0 }
    };

    if (!catalogo[codigo]) {
      throw new Error(`Código ${codigo} inválido.`);
    }

    return catalogo[codigo];
  }
}

// ==========================================
// 2. ADAPTER (Adapta o legado para o novo sistema)
// ==========================================

// Base para todas as bebidas
class Bebida {
  getDescrição() {
    throw new Error("Implementar método");
  }
  getPreço() {
    throw new Error("Implementar método");
  }
}

// Bebidas do sistema novo
class BebidaNativa extends Bebida {
  constructor(tipo, tamanho, preco) {
    super();
    this.tipo = tipo;
    this.tamanho = tamanho;
    this.preco = preco;
  }

  getDescrição() {
    return `${this.tipo} ${this.tamanho}`;
  }

  getPreço() {
    return this.preco;
  }
}

// Adapter para usar o código legado como uma Bebida comum
class BebidaLegadaAdapter extends Bebida {
  constructor(sistemaLegado, codigo) {
    super();
    this.codigo = codigo;
    this.dados = sistemaLegado.buscarBebidaPorCodigo(codigo);
  }

  getDescrição() {
    return `${this.dados.nome} ${this.dados.tamanho} (Legado #${this.codigo})`;
  }

  getPreço() {
    return this.dados.preco;
  }
}

// ==========================================
// 3. OUTROS COMPONENTES DO COMBO
// ==========================================

class Lanche {
  constructor(nome, preco) {
    this.nome = nome;
    this.preco = preco;
  }

  getDescrição() {
    return this.nome;
  }

  getPreço() {
    return this.preco;
  }
}

class Batata {
  constructor(tamanho, preco) {
    this.tamanho = tamanho;
    this.preco = preco;
  }

  getDescrição() {
    return `Batata Frita ${this.tamanho}`;
  }

  getPreço() {
    return this.preco;
  }
}

// ==========================================
// 4. BRIDGE (Conecta o Combo aos seus itens)
// ==========================================

class Combo {
  constructor(lanche, bebida, batata) {
    this.lanche = lanche;
    this.bebida = bebida;
    this.batata = batata;
  }

  // Permitir troca dos itens em tempo de execução
  setBebida(novaBebida) {
    this.bebida = novaBebida;
  }

  setBatata(novaBatata) {
    this.batata = novaBatata;
  }

  setLanche(novoLanche) {
    this.lanche = novoLanche;
  }

  calcularPrecoTotal() {
    return this.lanche.getPreço() + this.bebida.getPreço() + this.batata.getPreço();
  }

  exibirResumo(idCombo) {
    console.log("----------------------------------------------------");
    console.log(`🍔 COMBO #${idCombo}`);
    console.log(` • Lanche: ${this.lanche.getDescrição()} (R$ ${this.lanche.getPreço().toFixed(2)})`);
    console.log(` • Bebida: ${this.bebida.getDescrição()} (R$ ${this.bebida.getPreço().toFixed(2)})`);
    console.log(` • Batata: ${this.batata.getDescrição()} (R$ ${this.batata.getPreço().toFixed(2)})`);
    console.log(` 💰 TOTAL: R$ ${this.calcularPrecoTotal().toFixed(2)}`);
    console.log("----------------------------------------------------\n");
  }
}

// ==========================================
// 5. TESTES E DEMONSTRAÇÃO
// ==========================================

function executar() {
  console.log("=== SISTEMA DE COMBOS ===\n");

  const sistemaLegado = new SistemaLegadoBebidas();

  // Opções de Lanches e Batatas
  const bigMac = new Lanche("Big Mac", 22.0);
  const quarteirao = new Lanche("Quarteirão", 21.0);
  const mcFish = new Lanche("McFish", 19.0);

  const batataP = new Batata("Pequena", 8.0);
  const batataM = new Batata("Média", 10.0);
  const batataG = new Batata("Grande", 12.0);

  // Bebidas Nativas
  const refri500 = new BebidaNativa("Refrigerante", "500ml", 8.0);
  const suco300 = new BebidaNativa("Suco Natural", "300ml", 7.0);

  // 1. Criando 5 combos
  console.log(">>> [1] Criando 5 Combos Iniciais\n");

  const combo1 = new Combo(bigMac, refri500, batataM);
  const combo2 = new Combo(quarteirao, suco300, batataG);
  const combo3 = new Combo(mcFish, new BebidaNativa("Refrigerante", "700ml", 10.0), batataP);
  const combo4 = new Combo(bigMac, new BebidaNativa("Suco Natural", "500ml", 9.0), batataP);
  
  // Combo 5 usa bebida legada via Adapter
  const bebidaLegada203 = new BebidaLegadaAdapter(sistemaLegado, 203);
  const combo5 = new Combo(quarteirao, bebidaLegada203, batataM);

  combo1.exibirResumo(1);
  combo2.exibirResumo(2);
  combo3.exibirResumo(3);
  combo4.exibirResumo(4);
  combo5.exibirResumo(5);

  // 2. Alterando combos já criados
  console.log(">>> [2] Alterando Combos Existentes\n");

  console.log("🔄 Alterando batata do Combo #1 para Grande:");
  combo1.setBatata(batataG);
  combo1.exibirResumo("1 (Atualizado)");

  console.log("🔄 Alterando bebida do Combo #2 para Refri 700ml do Legado (Código 103):");
  const bebidaLegada103 = new BebidaLegadaAdapter(sistemaLegado, 103);
  combo2.setBebida(bebidaLegada103);
  combo2.exibirResumo("2 (Atualizado)");
}

executar();
