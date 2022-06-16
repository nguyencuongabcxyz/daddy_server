import express from 'express';
import { DbConnector } from './dbConnector';
const app = express();
const port = 8080;

const DB_URL = process.env.DB_URL;
const DB_NAME = process.env.DB_NAME;
//const DB_URL = "mongodb://localhost:27017";
//const DB_NAME = "daddy";


app.get('/', async (req, res) => {
  const db = await DbConnector.connect(DB_URL!, DB_NAME!);
  const ordersCollection = db.collection('orders');
  await ordersCollection.insertOne({name: 'Order1', quantity: 1});
  const order = await ordersCollection.find({}).toArray();
  res.send(order);
});

app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});