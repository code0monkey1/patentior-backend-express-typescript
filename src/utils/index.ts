// after turning noImplicitAny to true ,you need to manually
// put types on  all relevant variable declarations

import { v4 as uuidv4 } from 'uuid';

import { Diagnosis, DiagnosisEntry, Gender, NewPatient } from "../types";

const isString = (value: unknown): value is string =>{

     return value instanceof String || typeof value ==='string';

};

const isDate = (value: string): boolean =>{

     return Boolean(Date.parse(value));
};

const parseDate=(value:unknown,what:string): string =>{

   if(!value || !isString(value) || !isDate(value))
          throw new Error(`Value of ${what} incorrect: ${value}`);
   
   return value;
};


const isGender=(value:string):value is Gender=>{

  return Object.values(Gender).map( v=> v.toString()).includes(value);

};


const parseGender=(value:unknown):Gender=>{

   if(!value || !isString(value) ||!isGender(value))
       throw new Error("The value for gender is invalid "+value);
   

   return value;
   
};

const parseString = (value: unknown,what: string):string=>{

   if( !isString(value))
       throw new Error(`Value of ${what} incorrect: ${value}`);
   

   return value;
};

export const toNewPatientData =(object:unknown):NewPatient=>{
   
   if(!object ||typeof object !== "object") {
      throw new Error("Faulty Data Received: "+JSON.stringify(object,null,2));
   }
   
   if(!('name' in object)) throw new Error("`name` missing in request"+JSON.stringify(object));
   if(!('dateOfBirth' in object)) throw new Error("`dateOfBirth` missing in request"+JSON.stringify(object));
   if( !('ssn' in object))throw new Error("`ssn` missing in request"+JSON.stringify(object));
   if( !('gender' in object))throw new Error("`gender` missing in request"+JSON.stringify(object));
   if(!('occupation' in object)) throw new Error("`occupation` missing in request"+JSON.stringify(object));

   return { 
      gender:parseGender(object.gender),
      dateOfBirth:parseDate(object.dateOfBirth,'dateOfBirth'),
      name:parseString(object.name,"name"),
      occupation:parseString(object.occupation,"occupation"),
      ssn:parseString(object.ssn,"ssn"),
      entries:[] as DiagnosisEntry[]
   };

};

const parseDiagnosisCodes = (object: unknown): Array<Diagnosis['code']> =>  {
  if (!object || typeof object !== 'object' || !('diagnosisCodes' in object)) {
    // we will just trust the data to be in correct form
    return [] as Array<Diagnosis['code']>;
  }

  return object.diagnosisCodes as Array<Diagnosis['code']>;
};

const toNewEntriesData = (data: unknown): DiagnosisEntry => {
  
   if (!data || typeof data !== "object") {
      throw new Error("Not of entry type"+JSON.stringify(data,null,2));
   }

   if(!('description' in data))throw new Error("description not found in data"+JSON.stringify(data,null,2));
   if(!('date' in data))throw new Error("description not found in data"+JSON.stringify(data,null,2));
   if(!('specialist' in data))throw new Error("description not found in data"+JSON.stringify(data,null,2));
   if(!('type' in data))throw new Error("type not found in data")+JSON.stringify(data,null,2);

  const baseData= {
    ...data,
    id:getUniqueId(),
    description: parseString(data.description,'description'),
    date: parseString(data.date,'date'),
    specialist: parseString(data.specialist,'specialist'),
    diagnosisCodes: parseDiagnosisCodes(data),
  };

  return baseData as DiagnosisEntry;

//   if(!('type' in data)) throw new Error('type attribute not present');

//   switch (data.type) {
//     case 'Hospital':

//       return {
//         ...baseData,
//         type: 'Hospital',
//         discharge: {
//           date: data.discharge.date!! as string,
//           criteria: parseString(data.discharge.criteria),

//         },
//       };
//     case 'OccupationalHealthcare':
//       return {
//         ...baseData,
//         type: 'OccupationalHealthcare',
//         employerName: parseString(data.employerName),
//         sickLeave: data.sickLeave
//           ? {
//               startDate: parseDate(data.sickLeave.startDate),
//               endDate: parseDate(data.sickLeave.endDate),
//             }
//           : undefined,
//       };
//     case 'HealthCheck':
//       return {
//         ...baseData,
//         type: 'HealthCheck',
//         healthCheckRating: parseHealthCheckRating(data.healthCheckRating),
//       };
//     default:
//       throw new Error('Incorrect or missing entry type');
//   }
};

export default toNewEntriesData;

export const getUniqueId=():string =>{

   return uuidv4();
};