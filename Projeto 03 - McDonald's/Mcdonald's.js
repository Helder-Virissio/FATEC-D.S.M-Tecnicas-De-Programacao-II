//Classe Lanche
class McOferta {
    constructor(numeroPedido, numero, lanche, batataTamanho, refrigeranteTamanho) {
        this.numeroPedido = numeroPedido;
        this.numero = numero;
        this.lanche = lanche;
        this.batataTamanho = batataTamanho;
        this.refrigeranteTamanho = refrigeranteTamanho;
    }

    //Método para clonar e realizar uma copia
    clone() {
        return new McOferta(
            this.numeroPedido,
            this.numero,
            this.lanche,
            this.batataTamanho,
            this.refrigeranteTamanho
        );
    } 
}

//Classe Gerencia McOferta
class GerenciaMcOferta {
    constructor() { // Corrigido de "constrctor" para "constructor"
        this.ofertas = {};
    }

    //Add uma nova McOferta
    addOferta(numero, lanche, batataTamanho = "Média", refrigeranteTamanho = "Médio") {
        const oferta = new McOferta(0, numero, lanche, batataTamanho, refrigeranteTamanho);
        this.ofertas[numero] = oferta;
    }

    //Solicita uma McOferta (retorna um clone)
    getOfertaByid(id) {
        const pedidoOriginal = this.ofertas[id];
        if (pedidoOriginal) {
            return pedidoOriginal.clone();
        } else {
            return null;
        }
    }

    //Retorna a oferta original pura (sem clonar) para exibição
    getOfertaOriginal(id) {
        return this.ofertas[id];
    }
}

//Criando uma instancia de Gerenciar Ofertas
const gerencia = new GerenciaMcOferta();

//Add as 5 McOfertas padrão
gerencia.addOferta(1, "Big Mac");
gerencia.addOferta(2, "Quarteirão com Queijo");
gerencia.addOferta(3, "McChicken");
gerencia.addOferta(4, "Cheddar McMelt");
gerencia.addOferta(5, "Quarteirão Duplo com Queijo");

//Criando os 3 pedidos personalizados (clonando e modificando)
const pedido1 = gerencia.getOfertaByid(1);
if (pedido1) {
    pedido1.numeroPedido = 101;
    pedido1.batataTamanho = "Mega";
    pedido1.refrigeranteTamanho = "Grande";
}

const pedido2 = gerencia.getOfertaByid(3);
if (pedido2) {
    pedido2.numeroPedido = 102;
    pedido2.batataTamanho = "Pequena";
    pedido2.refrigeranteTamanho = "Pequeno";
}

const pedido3 = gerencia.getOfertaByid(5);
if (pedido3) {
    pedido3.numeroPedido = 103;
    pedido3.batataTamanho = "Grande";
    pedido3.refrigeranteTamanho = "Médio";
}

//Exibindo os resultados no console
console.log("====== McOFERTAS ORIGINAIS =======");
for (let i = 1; i <= 5; i++) {
    console.log(gerencia.getOfertaOriginal(i));
}

console.log("\n====== PEDIDOS PERSONALIZADOS (CLONES) =======");
console.log(pedido1);
console.log(pedido2);
console.log(pedido3);

console.log("\n====== VERIFICAÇÃO (ORIGINAL INTACTO) =======");
console.log(gerencia.getOfertaOriginal(1)); // Deve manter batata e refri como "Média" e "Médio", e numeroPedido 0
