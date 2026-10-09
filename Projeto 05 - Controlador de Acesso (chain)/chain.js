// Importação da instância do banco de dados SQLite para realizar consultas e registros
import db from './database.js';

/**
 * CLASSE BASE - HANDLER ABSTRATO
 * Define a estrutura padrão e o encadeamento dos elos na Corrente de Responsabilidade (Chain of Responsibility).
 */
class AccessHandler {
    constructor() {
        this.proximo = null; // Guarda a referência para o próximo manipulador da corrente
    }

    /**
     * Define qual será o próximo manipulador a ser executado na sequência.
     * Retorna o próprio manipulador informado para permitir o encadeamento em linha (.setProximo().setProximo())
     */
    setProximo(proximo) {
        this.proximo = proximo;
        return proximo;
    }

    /**
     * Passa a execução para o próximo manipulador da cadeia, se houver.
     * Se for o último elo, retorna o resultado acumulado no objeto de contexto.
     */
    async processar(contexto) {
        if (this.proximo) {
            return await this.proximo.processar(contexto);
        }
        return contexto.resultado;
    }
}

/**
 * ELO 1: VALIDAÇÃO DOS CAMPOS DE ENTRADA (INPUT)
 * Verifica se o ID e a senha de 5 dígitos foram informados no formato correto.
 */
export class InputValidationHandler extends AccessHandler {
    async processar(contexto) {
        const { idInformado, senha } = contexto;

        // Valida se o ID está presente e se a senha contém exatamente 5 dígitos numéricos
        if (!idInformado || !/^\d{5}$/.test(senha)) {
            contexto.resultado = {
                code: 400,
                data: { status: 'erro', message: 'Informe um ID e uma senha numerica de 5 digitos.' }
            };
            return contexto.resultado; // Interrompe a corrente e retorna o erro 400
        }

        // Dados válidos: avança para o próximo elo da corrente
        return await super.processar(contexto);
    }
}

/**
 * ELO 2: CONSULTA DE EXISTÊNCIA DO USUÁRIO
 * Busca o usuário no banco de dados SQLite e valida se o cadastro existe.
 */
export class UserLookupHandler extends AccessHandler {
    async processar(contexto) {
        return new Promise((resolve) => {
            // Realiza a busca no SQLite utilizando o ID informado
            db.get(
                `SELECT id, nome, email, tipo, senha, ativo FROM pessoas WHERE id = ?`,
                [contexto.idInformado],
                async (err, pessoa) => {
                    // Trata possíveis erros de consulta no banco de dados
                    if (err) {
                        contexto.resultado = { code: 500, data: { error: err.message } };
                        return resolve(contexto.resultado);
                    }

                    // Se o usuário não for encontrado no banco de dados
                    if (!pessoa) {
                        // Registra a tentativa de acesso mal-sucedida na tabela de históricos (acessos)
                        db.run(
                            `INSERT INTO acessos (pessoa_id, id_informado, status) VALUES (NULL, ?, 'NAO_CADASTRADO')`,
                            [contexto.idInformado]
                        );

                        contexto.resultado = {
                            code: 404,
                            data: { status: 'nao_cadastrado', message: 'Usuario nao cadastrado.' }
                        };
                        return resolve(contexto.resultado); // Interrompe a corrente com erro 404
                    }

                    // Usuário encontrado: anexa os dados no contexto e passa para o próximo elo
                    contexto.pessoa = pessoa;
                    const res = await super.processar(contexto);
                    resolve(res);
                }
            );
        });
    }
}

/**
 * ELO 3: VALIDAÇÃO DE CREDENCIAIS E STATUS
 * Confere se a senha informada é idêntica à cadastrada e se a conta do usuário está ativa.
 */
export class CredentialsValidationHandler extends AccessHandler {
    async processar(contexto) {
        const { pessoa, idInformado, senha } = contexto;

        // Se a senha estiver errada OU a conta estiver inativa (ativo !== 1)
        if (pessoa.senha !== senha || pessoa.ativo !== 1) {
            // Registra o bloqueio de acesso na tabela de históricos
            db.run(
                `INSERT INTO acessos (pessoa_id, id_informado, status) VALUES (?, ?, 'NEGADO')`,
                [pessoa.id, idInformado]
            );

            contexto.resultado = {
                code: 401,
                data: { status: 'negado', message: 'Acesso negado.' }
            };
            return contexto.resultado; // Interrompe a corrente com erro 401 (Não Autorizado)
        }

        // Credenciais e status válidos: avança para o próximo elo
        return await super.processar(contexto);
    }
}

/**
 * ELO 4: LIBERAÇÃO DE ACESSO E CONCLUSÃO
 * Registra o acesso permitido no banco de dados e retorna os dados do usuário para o frontend.
 */
export class AccessGrantedHandler extends AccessHandler {
    async processar(contexto) {
        const { pessoa, idInformado } = contexto;

        // Registra a liberação da catraca no histórico de acessos
        db.run(
            `INSERT INTO acessos (pessoa_id, id_informado, status) VALUES (?, ?, 'LIBERADO')`,
            [pessoa.id, idInformado]
        );

        // Monta a resposta final de sucesso (HTTP 200) com as informações do usuário
        contexto.resultado = {
            code: 200,
            data: {
                status: 'liberado',
                message: 'Acesso liberado.',
                pessoa: {
                    id: pessoa.id,
                    nome: pessoa.nome,
                    email: pessoa.email,
                    tipo: pessoa.tipo
                }
            }
        };

        return contexto.resultado; // Finaliza o processamento da cadeia com sucesso
    }
}