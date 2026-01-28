//Implement map() using loop

function mapUsingLoop(arr, callback) {
  const result = [];
  for (let i = 0; i < arr.length; i++) {
    result.push(callback(arr[i], i, arr));
  }
  return result;
}


const numbers = [1, 2, 3, 4];
const doubled = mapUsingLoop(numbers, function(num) {
  return num * 2;
}); 
console.log(doubled); 