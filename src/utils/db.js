import { MongoClient } from 'mongodb';

let cachedDb = null;

export async function connectToDb() {
  if (cachedDb) {
    return cachedDb;
  }

  try {
    // Debug das variáveis de ambiente usando import.meta.env
    console.log('Verificando variáveis de ambiente:');
    console.log('MONGODB_URI:', import.meta.env.MONGODB_URI ? 'Definida' : 'Não definida');
    console.log('MONGODB_DB:', import.meta.env.MONGODB_DB ? 'Definida' : 'Não definida');

    const uri = import.meta.env.MONGODB_URI;
    const dbName = import.meta.env.MONGODB_DB;

    if (!uri) {
      throw new Error('MONGODB_URI não está definida nas variáveis de ambiente');
    }

    console.log('Tentando conectar ao MongoDB...');
    const client = await MongoClient.connect(uri);
    console.log('Conexão com MongoDB estabelecida');
    
    const db = client.db(dbName);
    console.log('Banco de dados selecionado:', dbName);
    
    cachedDb = db;
    return db;
  } catch (error) {
    console.error('Erro detalhado ao conectar ao MongoDB:', error);
    throw new Error('Não foi possível conectar ao banco de dados: ' + error.message);
  }
}
