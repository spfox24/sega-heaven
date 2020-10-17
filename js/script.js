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

// PLAT DESCRIPTION El
const $modMas = $('#master-mod');
const $btnMas = $('.btn-mas');

const $modGen = $('#genesis-mod');
const $btnGen = $('.btn-gen');

const $modSat = $('#saturn-mod');
const $btnSat = $('.btn-sat');

const $modCD = $('#cd-mod');
const $btnCD = $('.btn-cd');

const $mod32 = $('#32-mod');
const $btn32 = $('.btn-32');

const $modDC = $('#dreamcast-mod');
const $btnDC = $('.btn-dc');


// Form El
const $form = $('form')
const $input = $('input[type="text"]');
// Year auto update
const yearEl = document.getElementById('year');

// Event Listeners
$form.on('submit', handleGetData);
$btnMas.on('click', showMaster);
$btnGen.on('click', showGenesis);
$btnSat.on('click', showSaturn);
$btnCD.on('click', showCD);
$btn32.on('click', show32);
$btnDC.on('click', showDC);


// Functions

init();
getYear();

function init() {
    getSysData();
};

function getSysData() {
    $.ajax(PLAT_URL)
    .then(function(data){
        
        systemData = data;

        render();

    }, function(error) {
        console.log('Error: ', error);
    });
}

function handleGetData(event) {
    event.preventDefault();

    userInput = $input.val();
    
    if(!userInput) return;

    $.ajax(GAME_URL + '?platforms=167,107,119,117,74,106&search=' + userInput)
    .then(function(data){

        gameData = data;

        $input.val('');
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

function showMaster(event) {
    event.preventDefault();
    $modMas.modal();
}

function showGenesis(event) {
    event.preventDefault();
    $modGen.modal();
}

function showSaturn(event) {
    event.preventDefault();
    $modSat.modal();
}

function showCD(event) {
    event.preventDefault();
    $modCD.modal();
}

function show32(event) {
    event.preventDefault();
    $mod32.modal();
}

function showDC(event) {
    event.preventDefault();
    $modDC.modal();
}



function getYear() {
    year = new Date().getFullYear();
    yearEl.innerText = year;
}