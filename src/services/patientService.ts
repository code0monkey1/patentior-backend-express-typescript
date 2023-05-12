import patients from '../data/patients';
import { NonSensitivePatientData, Patient } from "../types";

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


export default {
  getAll,
  getPatient,
  getNonSensitivePatientData
};