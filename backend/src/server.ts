import express, { response } from 'express';
import cors from 'cors';

import * as db from './db.js';


const app=express();

app.use(cors());

app.use(express.json());

app.get('/', async (request, response)=>{
   const cars=await db.selectCars();
   return response.status(200).json(cars);
})

app.listen(3333);