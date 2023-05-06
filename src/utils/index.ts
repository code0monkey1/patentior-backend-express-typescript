// after turning noImplicitAny to true ,you need to manually
// put types on  all relevant variable declarations

import { Gender, NewPatientData } from "../types";



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

export const toNewPatientData =(object:unknown):NewPatientData=>{
   
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
      ssn:parseString(object.ssn,"ssn")
   };

};