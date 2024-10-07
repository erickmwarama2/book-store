var userName = 'Erick';
var age = 32;
var hasHobbies = true;

console.log(userName);

function summarizeUser(userName, userAge, userHasHobbies) {
    return 'Name is ' + userName + ', age is ' + userAge + '. Does user have hobbies ' + userHasHobbies;
}

const summarizeUser2 = (userName, userAge, userHasHobbies) => {
    return 'Name is ' + userName + ', age is ' + userAge + '. Does user have hobbies ' + userHasHobbies;
}

console.log(summarizeUser(userName, age, hasHobbies));

const person = {
    name: 'Erick',
    age: 32
}

console.log(person);