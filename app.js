import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

// Configuração para __dirname em ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// 1. Estrutura Inicial: Pasta 'dados'
const dataDir = path.join(__dirname, 'dados');
const filePath = path.join(dataDir, 'produtos.json');

if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir);
    console.log('Pasta "dados" criada.');
}

// 2. Cadastro Inicial de Produtos
const initProducts = () => {
    const defaultProducts = [
        { id: 1, produto: 'Notebook', preco: 3500.00 },
        { id: 2, produto: 'Mouse', preco: 50.00 }
    ];
    if (!fs.existsSync(filePath)) {
        fs.writeFileSync(filePath, JSON.stringify(defaultProducts, null, 2));
        console.log('Arquivo produtos.json criado com dados iniciais.');
    }
};

// 3. Leitura de Dados (Síncrona)
const listarProdutos = () => {
    try {
        const data = fs.readFileSync(filePath, 'utf-8');
        const produtos = JSON.parse(data);
        console.log('\n--- Catálogo de Produtos ---');
        console.table(produtos); // Exibição amigável
        return produtos;
    } catch (error) {
        console.error('Erro ao ler arquivo:', error.message);
        return [];
    }
};

// 4. Atualização do Catálogo (Adicionar Produto)
const adicionarProduto = (novoProduto) => {
    try {
        const data = fs.readFileSync(filePath, 'utf-8');
        const produtos = JSON.parse(data);
        
        produtos.push(novoProduto);
        
        fs.writeFileSync(filePath, JSON.stringify(produtos, null, 2));
        console.log(`\nProduto "${novoProduto.produto}" adicionado com sucesso!`);
    } catch (error) {
        console.error('Erro ao atualizar arquivo:', error.message);
    }
};

// 5. Operações Assíncronas (Leitura Assíncrona)
import { readFile } from 'fs/promises';

const listarProdutosAsync = async () => {
    console.log('\n--- Iniciando leitura assíncrona ---');
    try {
        const data = await readFile(filePath, 'utf-8');
        const produtos = JSON.parse(data);
        console.log('Dados lidos de forma assíncrona.');
        console.table(produtos);
    } catch (error) {
        console.error('Erro assíncrono:', error.message);
    }
    console.log('--- Fim da leitura assíncrona ---');
};

// 6. Funcionalidade de Busca
const buscarProdutoPorId = (id) => {
    try {
        const data = fs.readFileSync(filePath, 'utf-8');
        const produtos = JSON.parse(data);
        const produto = produtos.find(p => p.id === id);
        return produto || null;
    } catch (error) {
        console.error('Erro ao buscar produto:', error.message);
        return null;
    }
};

// --- Execução do Sistema ---
initProducts();
listarProdutos();

// Adicionando um novo produto
adicionarProduto({ id: 3, produto: 'Teclado', preco: 150.00 });

// Demonstração de Assincronismo
console.log('\n[!] Esta mensagem aparece ANTES da leitura assíncrona terminar.');
listarProdutosAsync();
console.log('[!] Esta mensagem aparece logo após chamar a função assíncrona.');

// Demonstração de Busca
console.log('\n--- Resultado da Busca ID 2 ---');
console.log(buscarProdutoPorId(2));
console.log('\n--- Resultado da Busca ID 99 (Inexistente) ---');
console.log(buscarProdutoPorId(99));
