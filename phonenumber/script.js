//Clears the innerHTML of the output div
function clear(output){
    output.innerHTML = '';
}

//REQ: s is not the empty string and numPatterns > 0
//Returns true / false if s is a valid US phone number according to the rules
function isValidNumber(s, patternsLeft = 5){
    /*
    In order, matches strings of the following form:
    1. 1 555-555-5555 OR 555-555-5555
    2. 1 (555) 555-5555
    3. 1(555)555-5555 OR (555)555-5555
    4. 1 555 555 5555
    5. 5555555555
    */
    const regexps = [
        /^(1 )?\d{3}-\d{3}-\d{4}$/,
        /^(1 )?\(\d{3}\) \d{3}-\d{4}$/,
        /^(1)?\(\d{3}\)\d{3}-\d{4}$/,
        /^1 \d{3} \d{3} \d{4}$/,
        /^\d{10}$/
    ];

    if (patternsLeft === 0) {
        return false;
    }
    const pat = regexps[patternsLeft - 1];
    return pat.test(s) || isValidNumber(s, patternsLeft - 1);
    
}

//s : string and output is something that can have HTML children (likea div)
function submit(s, output){
    //If the input is empty, alert the user
    if (s.length == 0) {
        alert('Please provide a phone number');
        return;
    }

    const p = document.createElement('p');
    if (isValidNumber(s)) {
        p.textContent = `Valid US number: ${s}`;
    }
    else{
        p.textContent = `Invalid US number: ${s}`;
    }
    output.appendChild(p);
    
}

const input = document.getElementById('user-input');
const checkBtn = document.getElementById('check-btn');
const clearBtn = document.getElementById('clear-btn');
const output = document.getElementById('results-div');

checkBtn.addEventListener('click', () => submit(input.value, output));
clearBtn.addEventListener('click', () => clear(output));
