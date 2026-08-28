//classe pessoa referencia
class Pessoa{
    constructor(id, nome, idade){
        this.id = id;
        this.nome = nome;
        this.idade = idade;
    }
//metodo para clonar e realizar uma cópia
    clone(){
        return new Pessoa(this.id,this.nome, this.idade);
    }
}

//classe Gerencia Pessoa para gerenciar istanciais 

class GerenciaPessoa{
    constructor(){
        this.pessoas = {};
    }

    //add uma nova pessoa
    addPessoa(id, nome, idade){
        const pessoa = new Pessoa(id, nome, idade);
        this. pessoas[id] = pessoa;
    }
    //Solicita uma pessoa
    getPessoaByid(id){
        const pessoaOriginal = this.pessoas[id];
        if (pessoaOriginal){
            return pessoaOriginal.clone();
        }else {
            return null;
        }
    }
}

//criando uma instancia de Gerenciar pessoas 
const gerencia = new GerenciaPessoa();

//Add Peeosas
gerencia.addPessoa(1, 'Rogerin', 44)
gerencia.addPessoa(1, 'ManoMarcos', 36)
gerencia.addPessoa(3, 'Thigas', 32)

//clonando Pessoas e modificando

const pessoaClone1 = gerencia.getPessoaByid(1);
const pessoaClone3 = gerencia.getPessoaByid(3)
if (pessoaClone1){
    pessoaClone1.nome = 'Clonaldo de Oliveira';
}
if (pessoaClone3){
    pessoaClone3.nome = 'Hckeado do Santos';
    pessoaClone3.idade = "133"  

}

//imprimindo Pesssoa

console.log("====== Pessoas Originais =======")
console.log(gerencia.getPessoaByid(1));
console.log(gerencia.getPessoaByid(2));
console.log(gerencia.getPessoaByid(3));

console.log("======== Pessoas Clonadas =======")

console.log(pessoaClone1);
console.log(pessoaClone3);