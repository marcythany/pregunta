import { MongoClient } from 'mongodb';

let cachedDb = null;

export async function connectToDb() {
  if (cachedDb) {
    return cachedDb;
  }

  try {
    const client = await MongoClient.connect(process.env.MONGODB_URI);
    const db = client.db(process.env.MONGODB_DB);
    
    cachedDb = db;
    return db;
  } catch (error) {
    console.error('Erro ao conectar ao MongoDB:', error);
    throw new Error('Não foi possível conectar ao banco de dados');
  }
}
