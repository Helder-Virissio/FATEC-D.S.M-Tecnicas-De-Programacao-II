//Classe Base Portaria
class Pessoa{
    constructor(nome, identificacao){
        this.nome = nome;
        this.identificacao = identificacao;
    }

    mostrarDetalhes(){
        console.log(`Nome: ${this.nome}`)
        console.log(`Cadastro: ${this.identificacao}`)
    }
}

//Subclasses da Portaria

class Estudante extends Pessoa{
    constructor(nome, identificacao){
        super(nome, identificacao);
    }

}

class Professor extends Pessoa{
    constructor(nome, identificacao){
        super(nome, identificacao);
    }
}

class Administrativo extends Pessoa{
    constructor(nome, identificacao){
        super(nome, identificacao);
    }
}

class Terceiro extends Pessoa{
    constructor(nome, identificacao){
        super(nome, identificacao);
    }
}

class Visitante extends Pessoa{
    constructor(nome, identificacao){
        super(nome, identificacao);
    }
}

//Fabrica Abstrata de Cadastro

class CadastroPessoas{
    criarCadastro(nome, identificacao){
        throw new Error(`O metodo deve ser implementado pelas subclasses`)
    }
}

//Fabrica Concreta de Estudante

class CadastroEstudante extends CadastroPessoas{
    criarCadastro(nome, identificacao){
        return new Estudante(nome, identificacao)
    }
}

//Fabrica Concreta de Professor

class CadastroProfessor extends CadastroPessoas{
    criarCadastro(nome, identificacao){
        return new Professor(nome, identificacao)
    }
}
//Fabrica Concreta de Administrativo

class CadastroAdministrativo extends CadastroPessoas{
    criarCadastro(nome, identificacao){
        return new Administrativo(nome, identificacao)
    }
}
//Fabrica Concreta de Terceiro

class CadastroTerceiro extends CadastroPessoas{
    criarCadastro(nome, identificacao){
        return new Terceiro(nome, identificacao)
    }
}
//Fabrica Concreta de Visitante

class CadastroVisitante extends CadastroPessoas{
    criarCadastro(nome, identificacao){
        return new Visitante(nome, identificacao)
    }
}

//Uso Do Padrao

const cadastroEstudante = new CadastroEstudante();
const cadastroProfessor = new CadastroProfessor();
const cadastroAdministrativo = new CadastroAdministrativo();
const cadastroTerceiro = new CadastroTerceiro();
const cadastroVisitante = new CadastroVisitante();

const cadastro1 = cadastroEstudante.criarCadastro('Helder Araujo', 'Estudante' )
const cadastro2 = cadastroProfessor.criarCadastro('Micheal Jackson', 'Professor' )
const cadastro3 = cadastroAdministrativo.criarCadastro('Dona Marcia', 'Administrativo - RH' )
const cadastro4 = cadastroTerceiro.criarCadastro('Jonas Bueno', 'Terceiro' )
const cadastro5 = cadastroVisitante.criarCadastro('Jesus Cristo', 'Visitante' )

console.log("--------------------------------------------");
cadastro1.mostrarDetalhes();
console.log("--------------------------------------------");
cadastro2.mostrarDetalhes();
console.log("--------------------------------------------");
cadastro3.mostrarDetalhes();
console.log("--------------------------------------------");
cadastro4.mostrarDetalhes();
console.log("--------------------------------------------");
cadastro5.mostrarDetalhes();
console.log("--------------------------------------------");