// after turning noImplicitAny to true ,you need to manually
// put types on  all relevant variable declarations

const isNumber =(value:unknown):value is number=>{
   return !isNaN(Number(value));
};
const multiplicator = (a:unknown, b:unknown, printText:string) :string=> {
     
    if(!a ||!b ||!isNumber(a) || !isNumber(b)) {
       throw new Error("The numbers are invalid");
     }

     return a*b + printText;
};
// will return NaN ( in case wrong type is input)

// multiplicator("Lonely", 4, 'Multiplied a string and 4, the result is:');


multiplicator(5,4,"The result of the multiplication is :");