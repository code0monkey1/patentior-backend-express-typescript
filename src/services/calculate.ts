import express from 'express';

const route = express.Router();


 route.post('/', (req, res) => {

      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment 
      const { value1, value2, op } = req.body; // this will error if the eslint-disable comment is not mentioned right above it .
 
      console.log(value1, value2, op);

      res.send(req.body);
 });

 export default route;