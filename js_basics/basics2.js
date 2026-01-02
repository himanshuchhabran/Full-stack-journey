//Functions

function function_name(){
    //Statements
}
//To call -> 
function_name()


//if(!username) is same as 
if(username === undefined)

//If we don't know how much parameters will come

function sum(...num1){
return num1;
}

console.log(sum(200,400,600,800)) // prints an array -> [200,400,600,800]


//Hoisting works in function but not in variable means if I declare any variable at bottom I can't it at top.

//this keyword doesn't work in function but it's work in object


//Array function me agar curly bracket use kar rahe h to return keyword likhna Zaruri h agar () ye bracket use kar rahe to bina return keyword ke kam kardega

//IIFE (Immediately invoked function expression) global scope ke pollution se bachne ke liye and immediate execute karwane ke liye

//Ex - 
(function chai(){
   console.log("db connected");
})()


// Javascript Execution context 

//Sabse pehle global execution context banta h -> this 

//Function execution context h

//Eval Execution context 

//Ex->

let val1 = 10
let val2= 5

function addSum(num1,num2){
  let total = num1+ num2
 return total
}

let result1 = addSum(val1,val2)

let result2 = addSum(10,2)

//Sabse pehle global execution phase  banega 
//Uske baad
//1. Memory creation phase -> saare variables ko eksath rakha jata h 

val1 // undefined 
val2 // undefined

addSum // definition

result1 // undefined 
result2 // undefined

//2. Execution phase

val1 = 10
val2 = 5
addSum // new variable environment+ execution thread
//New sandbox bangaya h to memory phase or execution phase dubara honge

//Memory phase
val1 // undefined 
val2 // undefined
total // undefined

//Execution phase
num1 = 10
num2 = 5
total = 15 // return to global execution context 

//Ab ye delete ho jayega or vapis pehle vale execution phase me aa jayega 

result1 = 15
 
addSum // new variable environment+ execution thread
//New sandbox bangaya h to memory phase or execution phase dubara honge

//Memory phase
val1 // undefined 
val2 // undefined
total // undefined

//Execution phase
num1 = 10
num2 = 5
total = 15 // return to global execution

//Ab ye delete ho jayega or vapis pehle vale execution phase me aa jayega 


//Truthy values
//All other values like "0","false"," ",[],{},function(){}

//Falsy values
//false,0,-0,BigInt 0n,"",null,Nan ,undefined


// Nullish Coalescing operator (??) : null undefined 
 
// Ex 
// let val1;
// val1 = 5 ?? 10
// Val1 me 5 jayegi 

// val2 = null?? 10
// val2 me 10 jayegi

// val3 = undefined ?? 15 
// val3 me 15 aa jayegi