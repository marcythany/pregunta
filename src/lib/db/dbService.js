import { MongoClient } from 'mongodb';

class DbService {
  static instance = null;
  
  static async getInstance() {
    if (this.instance) {
      return this.instance;
    }

    const uri = import.meta.env.MONGODB_URI;
    const dbName = import.meta.env.MONGODB_DB;

    if (!uri) {
      throw new Error('MONGODB_URI não está definida nas variáveis de ambiente');
    }

    try {
      const client = await MongoClient.connect(uri);
      this.instance = client.db(dbName);
      return this.instance;
    } catch (error) {
      throw new Error('Erro ao conectar ao banco de dados: ' + error.message);
    }
  }

  static async getCollection(collectionName) {
    const db = await this.getInstance();
    return db.collection(collectionName);
  }
}

export default DbService;
