// Interface da Fabrica Abstrata:
class FabricaAbstrata{
    criarProdutoEletronico() {

    }
    criarProdutoVestuario() {

    }
}

// Fabrica Concreta para criar Produtos Eletronicos
class FabricaEletronico extends FabricaAbstrata{
    criarProdutoEletronico(){
        return new Telefone();
    }

    criarProdutoVestuario(){
        return new Camiseta();
    }
}

// Fabrica Concreta para criar Produtos Vestuarios
class FabricaVestuario extends FabricaAbstrata{
    criarProdutoEletronico(){
        return new Telefone();
    }

    criarProdutoVestuario(){
        return new Camiseta();
    }
}

// Classe Abstrata para Produtos Eletronicos
class ProdutoEletronico{
    constructor(){
        this.tipo = "eletrônico";
    }

    descricao(){
        return `Produto ${this.tipo}: telefone`
    }
}

// Classe Abstrata para Produtos Vestuarios
class ProdutoVesturario{
    constructor(){
        this.tipo = "vestuario";
    }

    descricao(){
        return `Produto ${this.tipo}: Camiseta`
    }
}

// Classe Concreta para Produto Eletronico:
class Telefone extends ProdutoEletronico{
    descricao(){
        return `Produto ${this.tipo}: Telefone`;
    }
}

// Classe Concreta para Produto Vestuario:
class Camiseta extends ProdutoVesturario{
    descricao(){
        return `Produto ${this.tipo}: Camiseta`;
    }
}

// Simulação do Uso do Padrão em Loja Virtual
function lojaVirtual(cliente, fabrica){
    const produtoEletronico = fabrica.criarProdutoEletronico();
    const produtoVesturario = fabrica.criarProdutoVestuario();

    console.log(`${cliente} Comprou:`);
    console.log(produtoEletronico.descricao());
    console.log(produtoVesturario.descricao());
    console.log('----------------------------------');
}

// Exemplo de uso com Fabrica de Produtos Eletronicos e Vestuario:
const cliente1 = "João da Silva";
const fabricaEletronico = new FabricaEletronico();
lojaVirtual(cliente1, fabricaEletronico);

const cliente2 = "Maria da Silva";
const fabricaVestuario = new FabricaVestuario();
lojaVirtual(cliente2, fabricaVestuario);

