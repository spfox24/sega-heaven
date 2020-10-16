// Constants

const PLAT_URL = 'https://api.rawg.io/api/platforms'
const GAME_URL = 'https://api.rawg.io/api/games'


// Variables
let gameData, systemData, userInput, year;



// Cached Element References

// GAME_URL El
const $gameEl = $('#gameList');


// PLAT_URL El
const $master = $('#master');
const $genesis = $('#genesis');
const $thirtytwo = $('#thirtytwo');
const $cd = $('#cd');
const $saturn = $('#saturn');
const $dream = $('#dreamcast');

// Form El
const $form = $('form')
const $input = $('input[type="text"]');

const yearEl = document.getElementById('year');

// Event Listeners
$form.on('submit', handleGetData);

// Functions

init();
getYear();

function init() {
    getSysData();
};

function handleGetData(event) {
    event.preventDefault();

    userInput = $input.val();
    
    if(!userInput) return;

    $.ajax(GAME_URL + '?platforms=167,107,119,117,74,106&search=' + userInput)
    .then(function(data){

        gameData = data;
        // console.log(gameData);

        $input.val('');
        render();

    }, function(error) {
        console.log('Error: ', error);
    });
}

function getSysData() {
    $.ajax(PLAT_URL)
    .then(function(data){
        
        systemData = data;

        render();

    }, function(error) {
        console.log('Error: ', error);
    });
}

function generateUI() {
    return gameData.results.map(function(game) {
        return `
        <article id="games" class="flex-ctr">
            <ul>
               <li>${game.name}</li>
            </ul>
        </article>`;
    });
}

function render() {

    
// Render System Name to Main
    $master.text(systemData.results[44].name);
    $genesis.text(systemData.results[40].name);
    $thirtytwo.text(systemData.results[43].name);
    $cd.text(systemData.results[42].name);
    $saturn.text(systemData.results[41].name); 
    $dream.text(systemData.results[45].name); 
    
// Render Games to Main
    $gameEl.html(generateUI());

};

function getYear() {
    year = new Date().getFullYear();
    yearEl.innerText = year;
}