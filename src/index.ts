
import express from 'express';
const app = express();

import cors from 'cors';

// eslint-disable-next-line @typescript-eslint/no-unsafe-call
app.use(cors());

app.use(express.json());

import diagnosis from './routes/diagnosis';
import patient from './routes/patient';

app.get("/ping", (_req, res)=>{
  res.send("pong");
});


app.use('/api/diagnosis',diagnosis);

app.use('/api/patients',patient);

const PORT = process.env.PORT ||3001;

app.listen(PORT, ()=>{

    console.log(" Listening to port ",PORT);
});