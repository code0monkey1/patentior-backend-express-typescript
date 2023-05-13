export type Entry={
 id:string;
 description: string;
 date:string;
 type:string;
 specialist:string;
 diagnosisCodes:string[];
};

export type Patient = {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: Gender;
  occupation: string;
  entries:DiagnosisEntry[];
};

export type Diagnosis = {
  code: string;
  name: string;
  latin?: string;
};

export enum Gender{
  Female="female",
  Male="male",
  Other="other"
}

interface BaseDiagnosisEntry {
  id: string;
  description: string;
  date: string;
  specialist: string;
  diagnosisCodes?: Array<Diagnosis['code']>; 
  // the diagnosis code is based on the `code` attribute
  // from the Diagnosis type
}
interface Hospital extends BaseDiagnosisEntry {
  type: 'Hospital';
  specialist: string;
  diagnosisCodes: string[];
  description: string;
  discharge: {
    date: string;
    criteria: string;
  };
}

interface OccupationalHealthcare extends BaseDiagnosisEntry {
  type: 'OccupationalHealthcare';
  specialist: string;
  employerName: string;
  diagnosisCodes?: string[];
  description: string;
  sickLeave?: {
    startDate: string;
    endDate: string;
  };
}

interface HealthCheck extends BaseDiagnosisEntry {
  type: 'HealthCheck';
  specialist: string;
  description: string;
  healthCheckRating: 0 | 1 | 2 | 3;
}

export type DiagnosisEntry = Hospital | OccupationalHealthcare| HealthCheck;

export type NonSensitivePatientData = Omit<Patient,'ssn'|'entries'>;

export type NewPatient = Omit<Patient,'id'>;