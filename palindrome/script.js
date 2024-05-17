//Check whether or not s is empty
function inputEmpty(s){
    return s.length === 0;
}

//Removes all non-alphanumeric chars from the userinput
function cleanInput(s){
    return s.replace(/[^0-9a-z]/gi, '').toLowerCase();
}



//Checks whether a given string is a palindrome
function isPalindrome(s){
    const rev = s.split('').reverse().join('');;
    return rev === s;
}

//Simulate the process of submitting the form
//REQUIRES: output is an element we can write to
function submit(s, output){
    if (inputEmpty(s)){
        alert('Please input a value');
        return;
    }

    if (isPalindrome(cleanInput(s))) {
        output.innerText = `${s} is a palindrome`;
    }
    else{
        output.innerText = `${s} is not a palindrome`;
        console.log(cleanInput(s));
    }
}

//Initializing elems
const form = document.getElementById('form');
const textInput = document.getElementById('text-input');
const output = document.getElementById('result');

form.addEventListener('submit', (e) => {
    e.preventDefault(); //prevent the page from refreshing on submit
    submit(textInput.value, output);
});


