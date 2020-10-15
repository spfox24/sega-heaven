// Constants

const PLAT_URL = 'https://api.rawg.io/api/platforms'
const GAME_URL = 'https://api.rawg.io/api/games?platforms=167,107,119,117,74,106&search='


// Variables
let gameData;



// Cached Element References




// Event Listeners



// Functions

init();

function init() {
    getPlatData();
}

function getData() {
    $.ajax(GAME_URL + userInput)
    .then(function(data){
        console.log('Game Data: ', data);
    }, function(error) {
        console.log('Error: ', error);
    });
}

function getPlatData() {
    $.ajax(PLAT_URL)
    .then(function(data){
        console.log('Platform Data: ', data);
    }, function(error) {
        console.log('Error: ', error);
    });
}



/*
function generateUI() {
    return systemData.results.map(function(system){
        return `<article data-url="${system.url}" class="system flex-ctr">
                    <h3>${system.name}</h3>
                </article>`;
    });
}
*/












/*
init();

function init() {
    getData();
}

function getData() {

    const url = BASE_URL

    $.ajax(url)
    .then(function(data) {
        
        artistData = data;
    console.log(data);
    });
}
*/
