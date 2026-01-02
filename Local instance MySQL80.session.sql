USE mydb;

-- 🛑 1. Desativa a segurança para permitir a limpeza
SET FOREIGN_KEY_CHECKS = 0;

-- 🧹 2. Limpa TUDO (Pagamentos e Transações para evitar conflitos)
TRUNCATE TABLE metodos_pagamento; 
TRUNCATE TABLE transacoes;

-- ✅ 3. Reativa a segurança
SET FOREIGN_KEY_CHECKS = 1;

-- 🏗️ 4. Insere APENAS os 4 oficiais
INSERT INTO metodos_pagamento (nome) VALUES 
('Dinheiro'),
('Pix'),
('Cartão de Débito'),
('Cartão de Crédito');

-- 🕵️‍♂️ 5. Mostra a verdade
SELECT * FROM metodos_pagamento;