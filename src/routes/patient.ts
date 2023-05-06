import express from 'express';

const router = express.Router();

import patientService from '../services/patientService';

router.get("/",(_req,res)=>{
   
   res.json(patientService.getNonSensitivePatientData());
      
} );

router.post("/", (req,res)=>{
    
  try{
     console.log(req.body);
    
    res.send({

    });
  }catch(err){
       let error="Error :";
      
       if( err instanceof Error )
            error+=err.message;
      
      res.send(error);
  }
    
});

export default router;