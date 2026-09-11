class GerenciaEstacionamento {
    constructor() {
        // Garante a instância única conforme os exemplos em aula
        if (GerenciaEstacionamento.instancia) {
            return GerenciaEstacionamento.instancia;
        }

        this.capacidadeMaxima = 10;
        this.veiculos = [];

        GerenciaEstacionamento.instancia = this;
    }

    // Metodo para retornar a unica instancia
    static getInstance() {
        if (!GerenciaEstacionamento.instancia) {
            GerenciaEstacionamento.instancia = new GerenciaEstacionamento();
        }
        return GerenciaEstacionamento.instancia;
    }

    getVagasOcupadas() {
        return this.veiculos.length;
    }

    getVagasDisponiveis() {
        return this.capacidadeMaxima - this.getVagasOcupadas();
    }

    veiculoExiste(placa) {
        for (const v of this.veiculos) {
            if (v.placa.toUpperCase() === placa.toUpperCase()) {
                return true;
            }
        }
        return false;
    }

    // Add Carro
    adicionarVeiculo(placa, modelo) {
        const placaFormatada = placa.trim().toUpperCase();
        const modeloFormatado = modelo.trim();

        if (this.getVagasDisponiveis() <= 0) {
            return { sucesso: false, mensagem: "Estacionamento Lotado!" };
        }

        if (this.veiculoExiste(placaFormatada)) {
            return { sucesso: false, mensagem: "Veículo já cadastrado!" };
        }

        const veiculo = {
            placa: placaFormatada,
            modelo: modeloFormatado
        };

        this.veiculos.push(veiculo);

        
        console.log("VEÍCULO ADICIONADO ----------------");
        console.log(`${veiculo.placa} - ${veiculo.modelo}`);

        return { sucesso: true, mensagem: `Veículo ${veiculo.placa} - ${veiculo.modelo} adicionado com sucesso!` };
    }

     // Remove carro
    removerVeiculo(placa) {
        const placaFormatada = placa.trim().toUpperCase();
        let index = -1;

        for (let i = 0; i < this.veiculos.length; i++) {
            if (this.veiculos[i].placa === placaFormatada) {
                index = i;
                break;
            }
        }

        if (index === -1) {
            return { sucesso: false, mensagem: "Veículo não encontrado!" };
        }

        const veiculoRemovido = this.veiculos.splice(index, 1)[0];

        
        console.log("VEÍCULO REMOVIDO ----------------");
        console.log(`${veiculoRemovido.placa} - ${veiculoRemovido.modelo}`);

        return { sucesso: true, mensagem: `Veículo ${veiculoRemovido.placa} - ${veiculoRemovido.modelo} removido com sucesso!` };
    }
}

// Criando referencia ao Singleton:
const estacionamento1 = GerenciaEstacionamento.getInstance();
const estacionamento2 = GerenciaEstacionamento.getInstance();

console.log("Estacionamento 1:", estacionamento1);
console.log("Estacionamento 2:", estacionamento2);
console.log("Mesma Instancia:", estacionamento1 === estacionamento2); 


// função atualizar dados da interface
function atualizarInterface(mensagem = "") {
    if (typeof document === "undefined") return;

    const estacionamento = GerenciaEstacionamento.getInstance();

    const elTotalVagas = document.getElementById("totalVagas");
    const elVagasOcupadas = document.getElementById("vagasOcupadas");
    const elVagasDisponiveis = document.getElementById("vagasDisponiveis");
    const elListaVeiculos = document.getElementById("listaVeiculos");
    const elMensagem = document.getElementById("mensagem");

    if (elTotalVagas) elTotalVagas.textContent = estacionamento.capacidadeMaxima;
    if (elVagasOcupadas) elVagasOcupadas.textContent = estacionamento.getVagasOcupadas();
    if (elVagasDisponiveis) elVagasDisponiveis.textContent = estacionamento.getVagasDisponiveis();

    if (elMensagem && mensagem !== "") {
        elMensagem.textContent = mensagem;
    }

    if (elListaVeiculos) {
        if (estacionamento.veiculos.length === 0) {
            elListaVeiculos.innerHTML = "<li>Nenhum veículo estacionado.</li>";
        } else {
            let html = "";
            for (const v of estacionamento.veiculos) {
                html += `<li>${v.placa} - ${v.modelo}</li>`;
            }
            elListaVeiculos.innerHTML = html;
        }
    }
}

// Função entrar carros
function entrarVeiculo() {
    if (typeof document === "undefined") return;

    const inputPlaca = document.getElementById("placa");
    const inputModelo = document.getElementById("modelo");

    const placa = inputPlaca ? inputPlaca.value : "";
    const modelo = inputModelo ? inputModelo.value : "";

    if (!placa || !modelo) {
        atualizarInterface("Por favor, preencha os campos Placa e Modelo!");
        return;
    }

    const estacionamento = GerenciaEstacionamento.getInstance();
    const resultado = estacionamento.adicionarVeiculo(placa, modelo);

    atualizarInterface(resultado.mensagem);

    if (resultado.sucesso) {
        if (inputPlaca) inputPlaca.value = "";
        if (inputModelo) inputModelo.value = "";
    }
}

// Função sair carros
function sairVeiculo() {
    if (typeof document === "undefined") return;

    const inputPlaca = document.getElementById("placa");
    const placa = inputPlaca ? inputPlaca.value : "";

    if (!placa) {
        atualizarInterface("Por favor, informe a Placa do veículo para realizar a saída!");
        return;
    }

    const estacionamento = GerenciaEstacionamento.getInstance();
    const resultado = estacionamento.removerVeiculo(placa);

    atualizarInterface(resultado.mensagem);

    if (resultado.sucesso) {
        if (inputPlaca) inputPlaca.value = "";
        const inputModelo = document.getElementById("modelo");
        if (inputModelo) inputModelo.value = "";
    }
}

// Função Limpar carros
function limparCampos() {
    if (typeof document === "undefined") return;

    const inputPlaca = document.getElementById("placa");
    const inputModelo = document.getElementById("modelo");

    if (inputPlaca) inputPlaca.value = "";
    if (inputModelo) inputModelo.value = "";

    const elMensagem = document.getElementById("mensagem");
    if (elMensagem) {
        elMensagem.textContent = "Nenhuma operação realizada.";
    }
}

// Carregamento inicial da tela (somente no navegador)
if (typeof window !== "undefined") {
    window.onload = function() {
        atualizarInterface();
    };
}