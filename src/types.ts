export type Patient = {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: Gender;
  occupation: string;
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

export type NonSensitivePatientData = Omit<Patient,'ssn'>;

export type NewPatientData = Omit<Patient,'id'>;