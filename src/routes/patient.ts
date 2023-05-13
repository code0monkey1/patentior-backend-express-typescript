import express from 'express';

const router = express.Router();

import patients from '../data/patients';
import patientService from '../services/patientService';
import { NewPatient, Patient } from '../types';
import { getUniqueId, toNewPatientData } from '../utils';


router.get("/",(_req,res)=>{
   
   res.json(patientService.getNonSensitivePatientData());    
} );

router.get("/:id",(req,res)=>{
    
   const patient:Patient|undefined = patientService.getPatient(req.params.id);
   
   if(!patient){
      res.status(404).json({error:`patient with id : ${req.params.id} not found`});
      return;
   }
   
   return res.json(patient);
 
});

router.post("/", (req,res)=>{
    
  try{
     const newPatient:NewPatient = toNewPatientData(req.body);

     // add patient to backend
     const patient :Patient ={...newPatient,id:getUniqueId()}; 
     
     patients.push(patient);
     
     //send created patient to frontend
     res.json(patient);
     
  }catch(err){
       let error="Error :";
      
       if( err instanceof Error )
            error+=err.message;
      
      res.send(error);
  }
    
});

router.post('/:id/entries', (req, res) =>{
   console.log("The id is",req.params.id);
   res.end();
});

export default router;