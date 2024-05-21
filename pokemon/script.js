const input = document.getElementById('search-input');
const searchBtn = document.getElementById('search-btn');
const imgHolder = document.getElementById('img-holder');
//const infoTable = document.getElementById('pokemon-info');
//The <td> elements where we will write the output
const typesBox = document.getElementById('types');
const outputBoxes = document.querySelectorAll('#pokemon-info td:last-child');

const pokemonDataURL = 'https://pokeapi-proxy.freecodecamp.rocks/api/pokemon';

//Also no injection, but its fine
function clear(){
    typesBox.innerHTML = '';
    imgHolder.innerHTML = '';
    outputBoxes.forEach((elem) => elem.innerText = '');
}

//If s is either a valid pokemon name or ID, returns the object associated
//With that pokemon. Else, return undefined.
function findPokemon(s, data){
    return data.results.find((entry) => {
        //console.log(s, entry.name);
        return s === entry.name || Number(s) === entry.id;
    });
    //console.log(res);
    //return res;
}

//Returns an array of the same length as our outputSlots that represents a
//1 to 1 maping of values to the output slots.
function getSlotValues(data){
    const slotsFirst = [
        data.name,
        data.id,
        data.weight,
        data.height,
    ];
    //Array of all the base stat values
    const slotsSecond = data.stats.map((s) => s.base_stat);

    return slotsFirst.concat(slotsSecond);
}

//Displays the data from the pok entry on the UI
//Data here is the object data for one pokemon
function displayData(data, imgHolder, outputSlots){
    //Display the image
    const html = `<img id="sprite" src="${data.sprites.front_default}" alt="${data.name}">`;
    imgHolder.innerHTML = html;
    
    //Getting lazy here (no injection param), but add elems to types
    data.types.forEach((t) => {
        typesBox.innerHTML += `<p>${t.type.name}</p>`
    });
    

    const slotValues = getSlotValues(data);
    let i = 0; //Sus but should work 
    outputSlots.forEach((elem) => {
        elem.innerText = slotValues[i]; 
        i += 1;
    });

}

/*Searches the pokemon database to see if user input s is in the
  parsed object data. If it is, we update hte pokemon-info table to show the 
  pokemon info, if not alert the user that the info was not found.
*/
function search(s, data, imgHolder, outputSlots){
    //Getting lazt bc no param, but this works for this small one
    
    clear();

    const pokEntry = findPokemon(s, data);
    if (pokEntry == undefined){
        alert('Pokémon not found');
        return;
    }
    //console.log('dub');
    const fetchPokEntry = async() => {
        const data = await fetch(pokEntry.url);
        const parsed = await data.json();
        displayData(parsed, imgHolder, outputSlots);
    };

    fetchPokEntry();
}

//NOTE - Not sure if this is the best way to do this bc we send a request
//Every time we press the button, ideally we fetch the list first n then do stuff
searchBtn.addEventListener('click', async () => {
    try{
        const data = await fetch(pokemonDataURL);
        const parsed = await data.json();
        search(input.value.toLowerCase(), parsed, imgHolder, outputBoxes);
    }
    catch(e){
        console.error(e);
    }
});