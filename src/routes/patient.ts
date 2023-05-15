import express from 'express';
import patientService from '../services/patientService';
import { DiagnosisEntry, Patient } from '../types';
import toNewEntriesData, { toNewPatientData } from '../utils';

const router = express.Router();


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
     const newPatient:Patient = toNewPatientData(req.body);
     
     patientService.addPatient(newPatient);
 
     res.json(newPatient);
     
  }catch(err){
       let error="Error :";
      
       if( err instanceof Error )
            error+=err.message;
      
      res.send(error);
  }
    
});

router.post('/:id/entries', (req, res) =>{
   
  try{

     const entry:DiagnosisEntry  = toNewEntriesData(req.body);
     
     const savedEntry = patientService.addPatientDiagnosisEntry(req.params.id,entry);

     res.json(savedEntry);
     
    }catch(err){
     
      let error="Error :";
      
       if( err instanceof Error )
            error+=err.message;
      
      res.send(error);
   }
});

export default router;