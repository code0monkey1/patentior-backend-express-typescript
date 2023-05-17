import diagnosis from '../data/diagnosis';
import { Diagnosis } from "../types";

 const getAll = ():Diagnosis[]=>{
   
  return diagnosis;
  
};

export default {
  getAll
};