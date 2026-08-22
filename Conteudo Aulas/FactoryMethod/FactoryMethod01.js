// Classe Base de Veiculo
class Veiculo{
    constructor(modelo){
        this.modelo = modelo;
    }

    mostrarDetalhes(){
        console.log(`Modelo: ${this.modelo}`);
    }
}

// Subclasses de Veiculos
class Carro extends Veiculo{
    constructor(modelo){
        super(modelo);
    }
}

class Moto extends Veiculo{
    constructor(modelo){
        super(modelo);
    }
}

class Navio extends Veiculo{
    constructor(modelo){
        super(modelo);
    }
}

// Fabrica Abstrata de Veiculos
class FabricaVeiculos{
    criarVeiculo(modelo){
        throw new Error(`O metodo deve ser implementado pelas subclasses`);
    }
}

// Fabrica Concreta de Carros
class FabricaCarros extends FabricaVeiculos{
    criarVeiculo(modelo){
        return new Carro(modelo);
    }
}

// Fabrica Concreta de Motos
class FabricaMotos extends FabricaVeiculos{
    criarVeiculo(modelo){
        return new Moto(modelo);
    }
}

// Fabrica Concreta de Navios
class FabricaNavios extends FabricaVeiculos{
    criarVeiculo(modelo){
        return new Navio(modelo);
    }
}

// USO DO PADRAO ----------------------------------
const fabricaMotos  = new FabricaMotos();
const fabricaCarros = new FabricaCarros();
const fabricaNavios = new FabricaNavios();

const transporte1    = fabricaCarros.criarVeiculo('Sedan');
const transporte2    = fabricaCarros.criarVeiculo('PickUp');
const transporte3    = fabricaMotos.criarVeiculo('BigTraill');
const transporte4    = fabricaMotos.criarVeiculo('Esportiva');
const transporte5    = fabricaNavios.criarVeiculo('Cargueiro');
const transporte6    = fabricaNavios.criarVeiculo('Container');

transporte1.mostrarDetalhes();
transporte2.mostrarDetalhes();
transporte3.mostrarDetalhes();
transporte4.mostrarDetalhes();
transporte5.mostrarDetalhes();
transporte6.mostrarDetalhes();

