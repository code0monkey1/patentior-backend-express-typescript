import express from 'express';

const app = express();

app.use(express.json());

import diagnosis from './routes/diagnosis';

app.get("/ping", (_req, res)=>{
  res.send("pong");
});


// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
app.use('/api/diagnosis',diagnosis);


const PORT = process.env.PORT ||3002;

app.listen(PORT, ()=>{

    console.log(" Listening to port ",PORT);
});