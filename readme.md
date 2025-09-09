### 1) What is the difference between var, let, and const?
Ans: var let ও const দিয়ে variable declare করা হয়। তবে এদের মধ্যে পার্থক্য হলো scope, hoisting, redeclare and reassign এর মধ্যে।

var:
1. এটি হল global scope / function scope  
2. এটি redeclare, reassign করা যায়
3. এটি hoisting হয়

let:  
1. let হল block scope 
2. let redeclare করা যায় না।
3. let reassign করা যায়। 

const: 
1. const হল block scope
2. redeclare করা যায় না।
3. reassign করা যায় না।


### 2) What is the difference between map(), forEach(), and filter()?
Ans: map, forEach ও filter হল array এর method.

map:প্রতিটি উপাদানের ওপর কাজ করে, কিন্তু কিছু return করে না।

forEach: প্রতিটি উপাদান পরিবর্তন করে নতুন অ্যারে return করে।

filter: শর্ত অনুযায়ী উপাদান বেছে নিয়ে নতুন অ্যারে return করে।


### 3) What are arrow functions in ES6?
Ans: arrow functions হল es6 এর নতুন feature এটি দিয়ে খুব সহজ syntax ও short code use করে functions বানানো যায়। 

`const greeting = () => console.log("Welcome")`;



### 4) How does destructuring assignment work in ES6?
Ans: 
এটি একটি ES6 ফিচার, যার মাধ্যমে সহজে কোনো অ্যারে বা অবজেক্টের মান ভেঙে আলাদা ভ্যারিয়েবলে নেওয়া যায়।
`const {name, age} = {name: "John", age: 25};`


### 5) Explain template literals in ES6. How are they different from string concatenation?
Ans: 
এটি হলো ES6-এর একটি feature, যা দিয়ে স্ট্রিং-এর মধ্যে ভেরিয়েবল বা এক্সপ্রেশন সহজে বসানো যায় ${} সাইন দিয়ে, এবং এটি ব্যাকটিক ( ` ` ) চিহ্ন দিয়ে লেখা হয়।

`const user = "John";`

``const greeting = `Welcome, ${user}`; ``;