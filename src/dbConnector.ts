import { Db, MongoClient } from 'mongodb';

export class DbConnector {

  public static async connect(dbUrl: string, dbName: string): Promise<Db> {
    const client = new MongoClient(dbUrl);
    await client.connect();
    const db = client.db(dbName);
    return db;
  }
}