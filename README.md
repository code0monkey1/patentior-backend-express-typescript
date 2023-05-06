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
        entries: []
      };

    };

```