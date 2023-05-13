# patentior-backend-express-typescript
 Patentior ( medical records ) backend express typescript app   controller

_Follow the same pattern as the Express Typescript Flight Diary Project_ : https://github.com/code0monkey1/flight-entries-express-typescript


## Parsing post request :

  ```javascript

         const parseDate=(value:unknown,what:string): string =>{
    
            // the  `what` is used to  inform what is missing
    
           if(!value || !isString(value) || !isDate(value))
                  throw new Error(`Value of ${what} incorrect: ${value}`);
           
        
           return value;
        };
    
        ----
    
        
        const parseString = (value: unknown,what: string):string=>{
       
         // parse string is used to parse any string and use `what` to specify the value ,if it is invalid 
    
           if( !isString(value))
               throw new Error(`Value of ${what} incorrect: ${value}`);
           
        
           return value;
        };

  ```

### While parsing , It's best to send an individual error for any field that was not present in the post request

```javascript
    export const parsePatient = (object: unknown): NewPatient=> {
      if (!object || typeof object !== 'object') {
        throw new Error('Data missing or in wrong format');
      }
    
      if ( !('name' in object)) throw new Error('name missing');
      if ( !('occupation' in object)) throw new Error('occupation missing');
      if ( !('ssn' in object)) throw new Error('ssn missing');
      if ( !('gender' in object)) throw new Error('gender missing');
      if ( !('dateOfBirth' in object)) throw new Error('dateOfBirth missing');
    
      return {
        name: parseString(object.name, 'name'),
        dateOfBirth: parseDate(object.dateOfBirth, 'dateOfBirth'),
        gender: parseGender(object.gender),
        occupation: parseString(object.occupation, 'occupation'),
        ssn: parseString(object.ssn, 'occupation'),
      };

    };

```
---

## Creating a discriminated union for `entries` type in Patient 


Let's try to extrapolate the discriminated union from the following patient data listing with entries array :

[Patients List](https://github.com/fullstack-hy2020/misc/blob/master/patients-full.ts "patient entries" )


We observe that the following attributes can be extracted to the base entry case : 

 ```javascript

   interface BaseDiagnosisEntry {
      id: string;
      description: string;
      date: string;
      specialist: string;
      diagnosisCodes?: Array<Diagnosis['code']>; 
      // the diagnosis code is based on the `code` attribute
      // from the Diagnosis type , so it's basically a string
    }

  //Diagnosis Type Reference :
      
    export type Diagnosis = {
      code: string;
      name: string;
      latin?: string;
    }

 ```

---


### Using Omit with Unions :

> An important point concerning unions is that, when you use them with Omit to exclude a property, it works in a possibly unexpected way. Suppose we want to remove the id from each Entry. We could think of using
> 
> ```javascript
>       Omit<Entry, 'id'>
>    ```
> but it wouldn't work as we might expect. In fact, **the resulting type would only contain the common properties, but not the ones they don't share**. A possible workaround is to define a special Omit-like function to deal with such situations:
> ```javascript
    // Define special omit for unions
    type UnionOmit<T, K extends string | number | symbol> = T extends unknown ? Omit<T, K> : never;
    // Define Entry without the 'id' property
    type EntryWithoutId = UnionOmit<Entry, 'id'>;
  ```
