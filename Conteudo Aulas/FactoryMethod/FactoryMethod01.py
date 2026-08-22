# Classe Base de Veiculo
class Veiculo:
    def __init__(self, modelo):
        self.modelo = modelo 

    def mostrarDetalhes(self):
        print(f"Modelo: {self.modelo}")

# Subclasses  de Veiculos
class Carro(Veiculo):
    def __init__(self, modelo):
        super().__init__(modelo)

class Moto(Veiculo):
    def __init__(self, modelo):
        super().__init__(modelo)

class Navio(Veiculo):
    def __init__(self, modelo):
        super().__init__(modelo)

# Fabrica Abstrata de Veiculos
class FabricaVeiculos:
    def criarVeiculo(self, modelo):
        raise NotImplementedError("O metodo deve ser implementado pelas subclasses")

# Fabrica Concreta de Carros
class FabricaCarros(FabricaVeiculos):
    def criarVeiculo(self, modelo):
        return Carro(modelo)

# Fabrica Concreta de Motos
class FabricaMotos(FabricaVeiculos):
    def criarVeiculo(self, modelo):
        return Moto(modelo)

# Fabrica Concreta de Navios
class FabricaNavios(FabricaVeiculos):
    def criarVeiculo(self, modelo):
        return Navio(modelo)

# USO DO PADRAO ----------------------------------
fabricaMotos  = FabricaMotos()
fabricaCarros = FabricaCarros()
fabricaNavios = FabricaNavios()

transporte1    = fabricaCarros.criarVeiculo('Sedan')
transporte2    = fabricaCarros.criarVeiculo('PickUp')
transporte3    = fabricaMotos.criarVeiculo('BigTraill')
transporte4    = fabricaMotos.criarVeiculo('Esportiva')
transporte5    = fabricaNavios.criarVeiculo('Cargueiro')
transporte6    = fabricaNavios.criarVeiculo('Container')

transporte1.mostrarDetalhes()
transporte2.mostrarDetalhes()
transporte3.mostrarDetalhes()
transporte4.mostrarDetalhes()
transporte5.mostrarDetalhes()
transporte6.mostrarDetalhes()