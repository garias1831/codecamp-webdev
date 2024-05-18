//REQUIRES output is something we can write to and s : string
function validInput(s, output){
    //I.e empty string OR non-whole input
    if (s.length === 0 || Number(s) !== Math.trunc(Number(s))) {
        output.innerText = 'Please enter a valid number';
        output.classList.add('invalid');
        return false;
    }
    if (Number(s) < 1) {
        output.innerText = 'Please enter a number greater than or equal to 1';
        output.classList.add('invalid');
        return false;
    }
    if (Number(s) > 3999){
        output.innerText = 'Please enter a number less than or equal to 3999';
        output.classList.add('invalid');
        return false;
    }

    output.classList.remove('invalid');
    return true;
}

//Helper for the getRoman function
//lo, mid, hi represent the low numeral (like 'I'), middle ('V'), and hi ('X') for a place
function romanLookup(d, lo, mid, hi){
    let res = '';
    //Check if we fit into one of the preset cases
    switch(Number(d)){
        case 0:
            res += ''
            break;
        case 4:
            res += `${lo}${mid}`;
            break;
        case 5:
            res += mid;
            break;
        case 9: 
            res += `${lo}${hi}`;
            break;
    }

    //If not, we might have some extra parts to attach:
    const numD = Number(d);
    if (1 <= numD && numD <= 3) {
        res += lo.repeat(d);
    } 
    else if (6 <= numD && numD <= 8){
        res += (mid + lo.repeat(d - 5));
    }

    return res;
}

/*Returns a string representing the roman numeral conversion of s*/
//REQUIRES s must be a whole positive number in range [1, 4000)
function getRoman(s){
    let res = '';
    //Want to index backwards to mimic ones, tens, etc place
    const sArr = s.split('').reverse(); 
    for(let i = 0; i < s.length; i++){
        //Set the values based on the power
        const d = sArr[i];
        switch (i) {
            case 0:
                res = romanLookup(d, 'I', 'V', 'X') + res;
                break;
            case 1: //Tens place
                res = romanLookup(d, 'X', 'L', 'C') + res;
                break
            case 2: //Hundreds
                res = romanLookup(d, 'C', 'D', 'M') + res;
                break;
            case 3: //Thousands
                res = 'M'.repeat(d) + res;
        }
    }
    return res;
}

//REQUIRES output is something we can write to and s : string
function convert(s, output){
    if (!validInput(s, output)) {
        return;
    }

    output.innerText = getRoman(s);
}

/*Init events and handlers*/
const input = document.getElementById('number');
const btn = document.getElementById('convert-btn');
const output = document.getElementById('output');

btn.addEventListener('click', () => {convert(input.value, output)});
