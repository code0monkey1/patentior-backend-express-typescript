import patients from '../data/patients';
import { DiagnosisEntry, NonSensitivePatientData, Patient } from "../types";

const getAll=():Array<Patient> =>{
  
   return patients;
};

const getPatient=(id:string)=>{

  const patient:Patient|undefined =patients.find(p => p.id === id);
   
  return patient;
};

const getNonSensitivePatientData=():Array<NonSensitivePatientData> =>{
  
   const nonSensitivePatientData = patients.map(({id,name,dateOfBirth,gender,occupation}) => {
     
    return {
      id,name,dateOfBirth,gender,occupation
     };
  
   });

  return nonSensitivePatientData as Array<NonSensitivePatientData>;
};

const addPatientDiagnosisEntry=(id:string,entry:DiagnosisEntry):DiagnosisEntry[]=>{
   
   const patient = patients.find(p => p.id === id);

   if(!patient) {
     throw new Error(" Patient Not Found ");
   }

   patient.entries.push(entry);

   return patient.entries;
};

const addPatient=(newPatient:Patient):Patient => {

     // add patient to backend
     patients.push(newPatient);

     return newPatient;
};

export default {
  getAll,
  getPatient,
  getNonSensitivePatientData,
  addPatientDiagnosisEntry,
  addPatient
};