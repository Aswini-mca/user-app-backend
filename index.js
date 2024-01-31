import express from 'express';
import { MongoClient } from "mongodb";
import cors from "cors";
import { usersRouter } from './routes/user.js';
import 'dotenv/config';

const app = express();
const PORT = 9000;

//Inbuilt middleware
app.use(express.json());
app.use(cors());

const MONGO_URL = process.env.MONGO_URL
 
async function createConnection() {
    const client = new MongoClient(MONGO_URL)
    await client.connect()
    console.log("Mongodb is connected")
    return client;
}

export const client = await createConnection();

app.get('/', (req, res) => {
    res.send('User App')
});
app.use('/users',usersRouter)

app.listen(PORT, () => console.log("The server started on the port", PORT))