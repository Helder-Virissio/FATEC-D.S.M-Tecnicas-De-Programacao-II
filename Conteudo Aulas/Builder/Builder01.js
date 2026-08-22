// Definindo as Partes de um Carro:
class Motor{
    constructor(tipo){
        this.tipo = tipo;
    }
}

class Estilo{
    constructor(estilo){
        this.estilo = estilo;
    }
}

class Rodas{
    constructor(tamanho){
        this.tamanho = tamanho;
    }
}

class Interior{
    constructor(cor){
        this.cor = cor;
    }
}

// Builder
class CarroBuilder{
    constructor(){
        this.motor = null;
        this.estilo = null;
        this.rodas = null;
        this.interior = null;
    }

    addMotor(tipo){
        this.motor = new Motor(tipo);
        return this;
    }

    addEstilo(estilo){
        this.estilo = new Estilo(estilo);
        return this;
    }

    addRodas(tamanho){
        this.rodas = new Rodas(tamanho);
        return this;
    }

    addInterior(cor){
        this.interior = new Interior(cor);
        return this;
    }

    construir(){
        return new Carro(this.motor, this.estilo, this.rodas, this.interior);
    }
}

// Construindo o Carro:
class Carro{
    constructor(motor, estilo, rodas, interior){
        this.motor = motor;
        this.estilo = estilo;
        this.rodas = rodas;
        this.interior = interior;
    }

    mostrarDetalhes(){
        console.log(`CARRO: 
            \t Motor: \t${this.motor.tipo}
            \t Estilo: \t${this.estilo.estilo}
            \t Rodas: \t${this.rodas.tamanho}
            \t Interior: \t${this.interior.cor}`);
    }
}

// Usando o padrão GoF Criacional - Builder:
const builder = new CarroBuilder();

const carroPadrao = builder
    .addMotor('---')
    .addEstilo('---')
    .addRodas('---')
    .addInterior('---')
    .construir();

const carro1 = builder
    .addMotor('2.0')
    .addEstilo('Esportivo')
    //.addRodas(18)
    .addInterior('Preto')
    .construir();

const carro2 = builder
    .addMotor('1.0')
    .addEstilo('Popular')
    .addRodas(13)
    .addInterior('Vermelho')
    .construir();

const carro3 = builder
    .addMotor('1.4')
    .addEstilo('Sedan')
    .addRodas(14)
    .addInterior('Branco')
    .construir();

//carroPadrao.mostrarDetalhes();
carro1.mostrarDetalhes();
carro2.mostrarDetalhes();
carro3.mostrarDetalhes();