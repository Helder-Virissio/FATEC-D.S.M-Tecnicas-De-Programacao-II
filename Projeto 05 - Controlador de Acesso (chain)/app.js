// Importação de módulos nativos do Node.js para servidor HTTP, manipulação de caminhos e sistema de arquivos
import http from 'http';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

// Importação da conexão com o banco de dados SQLite
import db from './database.js';

// Importação dos manipuladores (handlers) do padrão de projeto Chain of Responsibility
import {
    InputValidationHandler,
    UserLookupHandler,
    CredentialsValidationHandler,
    AccessGrantedHandler
} from './chain.js';

// Configuração dos caminhos do sistema para suporte a ES Modules (__dirname)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Definição do diretório de arquivos estáticos (HTML, CSS, JS)
const publicDir = path.join(__dirname, 'public');

// Mapeamento dos tipos de conteúdo (MIME Types) para as respostas HTTP
const contentTypes = {
    '.html': 'text/html; charset=utf-8',
    '.css': 'text/css; charset=utf-8',
    '.js': 'text/javascript; charset=utf-8',
    '.json': 'application/json; charset=utf-8'
};

/**
 * Função utilitária para extrair e converter o corpo (body) da requisição em objeto JSON
 */
function getRequestBody(request) {
    return new Promise((resolve, reject) => {
        let body = '';

        // Concatena os fragmentos de dados recebidos
        request.on('data', chunk => body += chunk.toString());

        // Processa o corpo completo ao finalizar a recepção dos dados
        request.on('end', () => {
            try {
                resolve(body ? JSON.parse(body) : {});
            } catch (error) {
                reject(error);
            }
        });

        request.on('error', reject);
    });
}

/**
 * Função utilitária para enviar respostas em formato JSON com o status HTTP correspondente
 */
function sendJson(response, statusCode, data) {
    response.writeHead(statusCode, {
        'Content-Type': 'application/json; charset=utf-8'
    });
    response.end(JSON.stringify(data));
}

/**
 * Função para servir arquivos estáticos (HTML, CSS, JavaScript no navegador)
 */
function serveStaticFile(response, file) {
    fs.readFile(file, (err, data) => {
        // Retorna erro 404 caso o arquivo não seja encontrado no servidor
        if (err) {
            response.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
            return response.end('404 - Página não encontrada');
        }

        // Identifica a extensão do arquivo e responde com o Content-Type correto
        const ext = path.extname(file).toLowerCase();
        response.writeHead(200, {
            'Content-Type': contentTypes[ext] || 'application/octet-stream'
        });
        response.end(data);
    });
}

/**
 * Função de validação de dados cadastrais de uma pessoa para o CRUD
 */
function validarPessoa(data) {
    // Verifica se os campos obrigatórios estão preenchidos
    if (!data.nome || !data.email || !data.data_nascimento || !data.tipo || !data.senha) {
        return 'Preencha todos os campos obrigatórios.';
    }

    // Valida se o tipo de usuário informado pertence às opções permitidas
    if (!['ALUNO', 'PROFESSOR', 'FUNCIONARIO'].includes(data.tipo)) {
        return 'Tipo de pessoa inválido.';
    }

    // Valida se a senha possui exatamente 5 dígitos numéricos
    if (!/^\d{5}$/.test(String(data.senha))) {
        return 'A senha deve possuir exatamente 5 dígitos numéricos.';
    }

    return null;
}

/**
 * Callback principal do servidor HTTP para tratamento das requisições
 */
async function callback(request, response) {
    const url = new URL(request.url, `http://${request.headers.host}`);
    const pathname = decodeURIComponent(url.pathname);
    const method = request.method;

    try {
        // ============================================================
        // SISTEMA DE ACESSO - UTILIZANDO CHAIN OF RESPONSIBILITY
        // ============================================================
        if (pathname === '/api/acesso' && method === 'POST') {
            const data = await getRequestBody(request);
            const idInformado = String(data.id || '').trim();
            const senha = String(data.senha || '').trim();

            // Montagem da Corrente de Responsabilidade (Chain)
            const chainAcesso = new InputValidationHandler();
            chainAcesso
                .setProximo(new UserLookupHandler())
                .setProximo(new CredentialsValidationHandler())
                .setProximo(new AccessGrantedHandler());

            // Contexto com as informações fornecidas na requisição
            const contexto = { idInformado, senha };

            // Execução sequencial da cadeia de validação
            const resultado = await chainAcesso.processar(contexto);

            return sendJson(response, resultado.code, resultado.data);
        }

        // ============================================================
        // ESTATÍSTICAS PARA A PÁGINA INICIAL
        // ============================================================
        if (pathname === '/api/estatisticas' && method === 'GET') {
            const sql = `
                SELECT
                    COUNT(*) AS total,
                    SUM(CASE WHEN tipo = 'ALUNO' THEN 1 ELSE 0 END) AS alunos,
                    SUM(CASE WHEN tipo = 'PROFESSOR' THEN 1 ELSE 0 END) AS professores,
                    SUM(CASE WHEN tipo = 'FUNCIONARIO' THEN 1 ELSE 0 END) AS funcionarios,
                    SUM(CASE WHEN ativo = 1 THEN 1 ELSE 0 END) AS ativos
                FROM pessoas
            `;

            db.get(sql, [], (err, row) => {
                if (err) return sendJson(response, 500, { error: err.message });
                sendJson(response, 200, row);
            });
            return;
        }

        // ============================================================
        // CRUD DE PESSOAS (/api/pessoas)
        // ============================================================
        if (pathname.startsWith('/api/pessoas')) {
            const id = url.searchParams.get('id');
            const q = url.searchParams.get('q');
            const tipo = url.searchParams.get('tipo');

            // C - Criar (Cadastrar nova pessoa)
            if (method === 'POST') {
                const data = await getRequestBody(request);
                const erroValidacao = validarPessoa(data);

                if (erroValidacao) {
                    return sendJson(response, 400, { error: erroValidacao });
                }

                const ativo = data.ativo === false || data.ativo === 0 || data.ativo === '0' ? 0 : 1;

                const sql = `
                    INSERT INTO pessoas (nome, email, data_nascimento, tipo, senha, ativo)
                    VALUES (?, ?, ?, ?, ?, ?)
                `;

                db.run(
                    sql,
                    [
                        data.nome.trim(),
                        data.email.trim().toLowerCase(),
                        data.data_nascimento,
                        data.tipo,
                        String(data.senha),
                        ativo
                    ],
                    function (err) {
                        if (err) {
                            if (err.message.includes('UNIQUE')) {
                                return sendJson(response, 409, { error: 'Este e-mail já está cadastrado.' });
                            }
                            return sendJson(response, 500, { error: err.message });
                        }

                        sendJson(response, 201, {
                            id: this.lastID,
                            message: 'Pessoa cadastrada com sucesso!'
                        });
                    }
                );
                return;
            }

            // R - Read (Consultar registros)
            if (method === 'GET') {
                // Consulta individual por ID
                if (id) {
                    db.get(
                        `SELECT id, nome, email, data_nascimento, tipo, senha, ativo FROM pessoas WHERE id = ?`,
                        [id],
                        (err, row) => {
                            if (err) return sendJson(response, 500, { error: err.message });
                            if (!row) return sendJson(response, 404, { error: 'Usuário não encontrado.' });
                            sendJson(response, 200, row);
                        }
                    );
                    return;
                }

                // Consulta geral com filtros por busca textual (q) ou tipo
                let sql = `SELECT id, nome, email, data_nascimento, tipo, ativo FROM pessoas WHERE 1 = 1`;
                const params = [];

                if (q) {
                    sql += ` AND (CAST(id AS TEXT) LIKE ? OR nome LIKE ? OR email LIKE ?)`;
                    const termo = `%${q}%`;
                    params.push(termo, termo, termo);
                }

                if (tipo && ['ALUNO', 'PROFESSOR', 'FUNCIONARIO'].includes(tipo)) {
                    sql += ` AND tipo = ?`;
                    params.push(tipo);
                }

                sql += ` ORDER BY id`;

                db.all(sql, params, (err, rows) => {
                    if (err) return sendJson(response, 500, { error: err.message });
                    sendJson(response, 200, rows);
                });
                return;
            }

            // U - Update (Atualizar dados cadastrais)
            if (method === 'PUT' && id) {
                const data = await getRequestBody(request);
                const erroValidacao = validarPessoa(data);

                if (erroValidacao) {
                    return sendJson(response, 400, { error: erroValidacao });
                }

                const ativo = data.ativo === false || data.ativo === 0 || data.ativo === '0' ? 0 : 1;

                const sql = `
                    UPDATE pessoas
                    SET nome = ?,
                        email = ?,
                        data_nascimento = ?,
                        tipo = ?,
                        senha = ?,
                        ativo = ?
                    WHERE id = ?
                `;

                db.run(
                    sql,
                    [
                        data.nome.trim(),
                        data.email.trim().toLowerCase(),
                        data.data_nascimento,
                        data.tipo,
                        String(data.senha),
                        ativo,
                        id
                    ],
                    function (err) {
                        if (err) {
                            if (err.message.includes('UNIQUE')) {
                                return sendJson(response, 409, { error: 'Este e-mail já está cadastrado.' });
                            }
                            return sendJson(response, 500, { error: err.message });
                        }

                        if (this.changes === 0) {
                            return sendJson(response, 404, { error: 'Usuário não encontrado.' });
                        }

                        sendJson(response, 200, { message: 'Cadastro atualizado com sucesso!' });
                    }
                );
                return;
            }

            // D - Delete (Excluir pessoa do banco de dados)
            if (method === 'DELETE' && id) {
                db.run(`DELETE FROM pessoas WHERE id = ?`, [id], function (err) {
                    if (err) return sendJson(response, 500, { error: err.message });

                    if (this.changes === 0) {
                        return sendJson(response, 404, { error: 'Usuário não encontrado.' });
                    }

                    sendJson(response, 200, { message: 'Cadastro excluído com sucesso!' });
                });
                return;
            }

            return sendJson(response, 405, { error: 'Método não permitido.' });
        }

        // ============================================================
        // SERVIDOR DE ARQUIVOS ESTÁTICOS (FRONTEND HTML/CSS)
        // ============================================================
        const relativePath = pathname === '/' ? 'index.html' : pathname.replace(/^\/+/, '');
        const file = path.resolve(publicDir, relativePath);

        // Prevenção de segurança contra Directory Traversal
        if (!file.startsWith(path.resolve(publicDir))) {
            response.writeHead(403, { 'Content-Type': 'text/plain; charset=utf-8' });
            return response.end('Proibido');
        }

        serveStaticFile(response, file);
    } catch (error) {
        sendJson(response, 500, { error: 'Erro interno do servidor.', details: error.message });
    }
}

// Inicialização do servidor HTTP escutando na porta 5000
const server = http.createServer(callback);
const PORT = 5000;

server.listen(PORT, () => {
    console.log(`Servidor iniciado em http://localhost:${PORT}/`);
});