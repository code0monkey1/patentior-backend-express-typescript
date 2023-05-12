import express from 'express';

const router = express.Router();

import patients from '../data/patients';
import patientService from '../services/patientService';
import { NewPatient } from '../types';
import { getUniqueId, toNewPatientData } from '../utils';

router.get("/",(_req,res)=>{
   
   res.json(patientService.getNonSensitivePatientData());
      
} );

router.post("/", (req,res)=>{
    
  try{
     const patient:NewPatient = toNewPatientData(req.body);
    
     // add patient to backend
     const patientWithId :Patient ={...patient,id:getUniqueId()}; 
     patients.push(patientWithId);

    res.json(patient);
  }catch(err){
       let error="Error :";
      
       if( err instanceof Error )
            error+=err.message;
      
      res.send(error);
  }
    
});

export default router;