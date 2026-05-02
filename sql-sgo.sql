-- =========================
-- TABELA PESSOA
-- =========================
CREATE TABLE pessoa (
    "idPessoa" BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    nome VARCHAR(60) NOT NULL,
    email VARCHAR(60) NOT NULL,
    nivel NUMERIC NOT NULL
);

-- =========================
-- TABELA LOGIN
-- =========================
CREATE TABLE login (
    "idPessoa" BIGINT PRIMARY KEY,
    usuario VARCHAR NOT NULL,
    senha VARCHAR NOT NULL,
    CONSTRAINT "Pes_Log" FOREIGN KEY ("idPessoa") REFERENCES pessoa("idPessoa")
);

-- =========================
-- TABELA PESSOA FISICA
-- =========================
CREATE TABLE "pessoaFisica" (
    "idPessoa" BIGINT PRIMARY KEY,
    cpf VARCHAR(15) NOT NULL UNIQUE,
    CONSTRAINT "Pes_Fis" FOREIGN KEY ("idPessoa") REFERENCES pessoa("idPessoa")
);

-- =========================
-- TABELA PESSOA JURIDICA
-- =========================
CREATE TABLE "pessoaJuridica" (
    "idPessoa" BIGINT PRIMARY KEY,
    cnpj VARCHAR(20) NOT NULL UNIQUE,
    CONSTRAINT "Pes_Jud" FOREIGN KEY ("idPessoa") REFERENCES pessoa("idPessoa")
);

-- =========================
-- TABELA OBRA
-- =========================
CREATE TABLE obra (
    "idObra" BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    descricao VARCHAR(60) NOT NULL,
    endereco VARCHAR(90) NOT NULL,
    status NUMERIC,
    "idCli" BIGINT NOT NULL,
    "idRes" BIGINT NOT NULL,
    CONSTRAINT "Pessoa_Cliente" FOREIGN KEY ("idCli") REFERENCES pessoa("idPessoa"),
    CONSTRAINT "Pessoa_Responsavel" FOREIGN KEY ("idRes") REFERENCES pessoa("idPessoa")
);

-- =========================
-- TABELA RECURSOS
-- =========================
CREATE TABLE recursos (
    "idRecurso" BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    descricao VARCHAR(60) NOT NULL,
    tipo VARCHAR(20) NOT NULL
);

-- =========================
-- INSERTS (POPULAÇÃO)
-- =========================

INSERT INTO pessoa (nome, email, nivel) VALUES
('Larissa Oliveira', 'larissa@email.com', 1),
('Janine de Oliveira', 'janine@empresa.com', 3),
('Denise Machado', 'denise@engenharia.com', 2);

INSERT INTO "pessoaFisica" ("idPessoa", cpf) VALUES
(1, '978.709.910-23'), 
(3, '229.769.580-25'); 

INSERT INTO "pessoaJuridica" ("idPessoa", cnpj) VALUES
(2, '41.978.052/0001-14'); 

INSERT INTO login ("idPessoa", usuario, senha) VALUES
(1, 'larissa@email.com', '978.709.910-23'),
(2, 'janine@empresa.com', '41.978.052/0001-14'),
(3, 'denise@engenharia.com', '229.769.580-25');

INSERT INTO obra (descricao, endereco, status, "idCli", "idRes") VALUES
('Construção de residência', 'Rua das Flores, N 123, Residencial Modelo', 0, 2, 3);

INSERT INTO recursos (descricao, tipo) VALUES
('Pedreiro', 'MÃO DE OBRA'),
('Cimento', 'MATERIAL'),
('Ajudante', 'MÃO DE OBRA');