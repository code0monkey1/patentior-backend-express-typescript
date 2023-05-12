export type Entry={
 description: string;
 dateOfCreation:string;
 specialist:string;
 diagnosisCode:string;
};

export type Patient = {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: Gender;
  occupation: string;
  entries:Entry[];
};

export type Diagnosis = {
  code: string;
  name: string;
  latin?: string;
};

export enum Gender{
  FEMALE="female",
  MALE="male",
  OTHER="other"
}

export type NonSensitivePatientData = Omit<Patient,'ssn'|'entries'>;

export type NewPatient = Omit<Patient,'id'>;