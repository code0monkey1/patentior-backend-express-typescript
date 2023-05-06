import patients from '../data/patients';
import { NonSensitivePatientData, Patient } from "../types";

const getAll=():Array<Patient> =>{
  
   return patients as Patient[];

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
  getNonSensitivePatientData
};