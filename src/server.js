import express from 'express';
import cors from 'cors';
import path from 'path';
import dotenv from 'dotenv';
import { router } from './routes.js';
import { fileURLToPath } from 'url';
import { dirname } from 'path';


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express()

app.use((cors()))
app.use(express.json())

app.use('/public', express.static(path.join(__dirname, 'public')));


app.use(router)

app.listen(3333, () => console.log("Conectado com sucesso"))