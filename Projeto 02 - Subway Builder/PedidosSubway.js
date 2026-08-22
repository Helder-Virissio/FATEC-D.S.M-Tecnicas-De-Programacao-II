// Definindo Partes do Pedido:
class TamanhoLanche{
    constructor(tamanho){
        this.tamanho = tamanho;
    }
}

class TipoPao{
    constructor(tipo){
        this.tipo = tipo;
    }
}

class TipoProteina{
    constructor(proteina){
        this.proteina = proteina;
    }
}

class Queijo{
    constructor(queijo){
        this.queijo = queijo;
    }
}

class AquecimentoLanche{
    constructor(aquecimento){
        this.aquecimento = aquecimento;
    }
}

class VegetaisSaladas{
    constructor(vegetais){
        this.vegetais = vegetais;
    }
}

class Molhos{
    constructor(molhos){
        this.molhos = molhos;
    }
}

class TemperosAdicinais{
    constructor(temperos){
        this.temperos = temperos;
    }
}

// Builder do Lanche

class LancheBuilder{
    constructor(){
        this.tamanho = null;
        this.tipo = null;
        this.proteina = null;
        this.queijo = null;
        this.aquecimento = null;
        this.vegetais = null;
        this.molhos = null;
        this.temperos = null;
    }

    addTamanho(tamanho){
        this.tamanho = new TamanhoLanche(tamanho);
        return this
    }

    addTipoPao(tipo){
        this.tipo = new TipoPao(tipo);
        return this
    }

    addProteina(proteina){
        this.proteina = new TipoProteina(proteina);
        return this
    }

    addQueijo(queijo){
        this.queijo = new Queijo(queijo);
        return this
    }

    addAquecimentoLanche(aquecimento){
        this.aquecimento = new AquecimentoLanche(aquecimento);
        return this
    }

    addVegetaisSaladas(vegetais){
        this.vegetais = new VegetaisSaladas(vegetais);
        return this
    }

    addMolhos(molhos){
        this.molhos = new Molhos(molhos);
        return this
    }

    addTemperosAdicionais(temperos){
        this.temperos = new TemperosAdicinais(temperos);
        return this
    }

    construir(){
        const lanchePronto = new Lanche(
            this.tamanho, 
            this.tipo, 
            this.proteina, 
            this.queijo, 
            this.aquecimento, 
            this.vegetais, 
            this.molhos, 
            this.temperos
        );

        this.tamanho = null;
        this.tipo = null;
        this.proteina = null;
        this.queijo = null;
        this.aquecimento = null;
        this.vegetais = null;
        this.molhos = null;
        this.temperos = null;

        return lanchePronto;
    }

}

//Construindo o Lanche

class Lanche{
    constructor(tamanho, tipo, proteina, queijo, aquecimento, vegetais, molhos, temperos){
        this.tamanho = tamanho;
        this.tipo = tipo;
        this.proteina = proteina;
        this.queijo = queijo;
        this.aquecimento = aquecimento;
        this.vegetais = vegetais;
        this.molhos = molhos;
        this.temperos = temperos;

    }

    mostrarDetalhes(numeroLanche){
        console.log(`\n\n\n*--------------------------------------------------------------------------*`);
        console.log(`\n\t                     Subway                                       `);
        console.log(`                           Pedido: ${numeroLanche}`);
        console.log(`\n`);
        console.log(`\t * Tamanho:_________________${this.tamanho.tamanho}`);
        console.log(`\t * Tipo de Pao:_____________${this.tipo.tipo}`);
        console.log(`\t * Proteina:________________${this.proteina.proteina}`);
        console.log(`\t * Queijo:__________________${this.queijo.queijo}`);
        console.log(`\t * Aquecimento:_____________${this.aquecimento.aquecimento}`);
        console.log(`\t * Vegetais e saladas:______${this.vegetais.vegetais}`);
        console.log(`\t * Molhos:__________________${this.molhos.molhos}`);
        console.log(`\t * Temperos e Adicionais:___${this.temperos.temperos}`);
        console.log(`\n\n\n*--------------------------------------------------------------------------*`);            
    }
}

//Usando o Padrao Gof Criacional - Builder

const builder = new LancheBuilder();

const pedido1 = builder
    .addTamanho('15 CM')
    .addTipoPao('Integral')
    .addProteina('Carne Bovina e atum')
    .addQueijo('Mussarela, Cheddar e Prato')
    .addAquecimentoLanche('5 Min')
    .addVegetaisSaladas('Alface e Rucula')
    .addMolhos('Barbecue e Churrasco')
    .addTemperosAdicionais('Sem temperos ou Adicionais')
    .construir();

const pedido2 = builder
    .addTamanho('30 CM')
    .addTipoPao('Italiano Branco ')
    .addProteina('Frango e Bacon')
    .addQueijo('Branco e Prato')
    .addAquecimentoLanche('3 Min ')
    .addVegetaisSaladas('Alface Americano e Pepino')
    .addMolhos('Maionese Temperada')
    .addTemperosAdicionais('Orégano e Jalapeños')
    .construir();

const pedido3 = builder
    .addTamanho('30 CM')
    .addTipoPao('Parmesão e Orégano')
    .addProteina('Vegetariano (Veggie Rosti)')
    .addQueijo('Sem Queijo')
    .addAquecimentoLanche('Não Aquecer')
    .addVegetaisSaladas('Tomate, Cebola Roxa e Azeitonas')
    .addMolhos('Chipotle e Mostarda e Mel')
    .addTemperosAdicionais('Pimenta do Reino')
    .construir();

pedido1.mostrarDetalhes('01');
pedido2.mostrarDetalhes('02');
pedido3.mostrarDetalhes('03');