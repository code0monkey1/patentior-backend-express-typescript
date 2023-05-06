# patentior-backend-express-typescript
 Patentior ( medical records ) backend express typescript app
// Follow the same pattern as the Express Typescript Flight Diary Project


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