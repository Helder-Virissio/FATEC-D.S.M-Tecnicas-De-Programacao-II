# Interface da Fabrica Abstrata:
class FabricaAbstrata:
    def criarProdutoEletronico(self):
        pass

    def criarProdutoVestuario(self):
        pass



# Fabrica Concreta para criar Produtos Eletronicos
class FabricaEletronico(FabricaAbstrata):
    def criarProdutoEletronico(self):
        return Telefone()

    def criarProdutoVestuario(self):
        return Camiseta()

# Fabrica Concreta para criar Produtos Vestuarios
class FabricaVestuario(FabricaAbstrata):
    def criarProdutoEletronico(self):
        return Telefone()
    
    def criarProdutoVestuario(self):
        return Camiseta()

# Classe Abstrata para Produtos Eletronicos
class ProdutoEletronico:
    def __init__(self):
        self.tipo = "eletronico"

    def descricao(self):
        return f"Produto {self.tipo}: Telefone"

# Classe Abstrata para Produtos Vestuarios
class ProdutoVestuario:
    def __init__(self):
        self.tipo = "vestuario"

    def descricao(self):
        return f"Produto {self.tipo}: Camiseta"

# Classe Concreta para Produto Eletronico:
class Telefone(ProdutoEletronico):
    def descricao(self):
        return f"Produto {self.tipo}: Telefone"

# Classe Concreta para Produto Vestuario:
class Camiseta(ProdutoVestuario):
    def descricao(self):
        return f"Produto {self.tipo}: Camiseta"

# Simulação do Uso do Padrão em Loja Virtual
def lojaVirtual(cliente, fabrica):
    produtoEletronico = fabrica.criarProdutoEletronico()
    produtoVestuario = fabrica.criarProdutoVestuario()

    print(f"{cliente} Comprou:")
    print(produtoEletronico.descricao())
    print(produtoVestuario.descricao())
    print("--------------------------------")

# Exemplo de uso com Fabrica de Produtos Eletronicos e Vestuario:
cliente1 = "João da Silva"
fabricaEletronico = FabricaEletronico()
lojaVirtual(cliente1, fabricaEletronico)

cliente2 = "Maria da Silva"
fabricaVestuario = FabricaVestuario()
lojaVirtual(cliente2, fabricaVestuario)