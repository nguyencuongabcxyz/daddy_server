import express from 'express';
import { DbConnector } from './dbConnector';
import cors from 'cors';

const app = express();
app.use(cors());
const port = 8000;

const DB_URL = process.env.DB_URL;
const DB_NAME = process.env.DB_NAME;


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