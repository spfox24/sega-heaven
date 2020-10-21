// Constants

const PLAT_URL = 'https://api.rawg.io/api/platforms'
const GAME_URL = 'https://api.rawg.io/api/games'



// Variables
let gameData, systemData, userInput, year;



// Cached Element References

// GAME_URL El
const $gameEl = $('#gameList');
const $listEl = $('#background');


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


$gameEl.on('click', 'li', handleGetInfo);


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

//  SYSTEM CARD DATA
function getSysData() {
    $.ajax(PLAT_URL)
        .then(function (data) {

            systemData = data;

            render();

        }, function (error) {
            console.log('Error: ', error);
        });
}
// GAME SEARCH DATA
function handleGetData(event) {
    event.preventDefault();

    userInput = $input.val();

    if (!userInput) return;

    $.ajax(GAME_URL + '?platforms=167,107,119,117,74,106&search=' + userInput)
        .then(function (data) {

            gameData = data;

            $input.val('');
            render(true);

        }, function (error) {
            console.log('Error: ', error);
        });
}


function generateUI() {
    return gameData.results.map(function(game, index) {
        return `
        <article id="games" class="flex-ctr">
            <ul>
               <li data-index="${index}" id="title">${game.name}</li>
            </ul>
        </article>`;
    });
}

function render(gameData) {

    // Render System Name to Main
    $master.text(systemData.results[44].name);
    $genesis.text(systemData.results[40].name);
    $thirtytwo.text(systemData.results[43].name);
    $cd.text(systemData.results[42].name);
    $saturn.text(systemData.results[41].name);
    $dream.text(systemData.results[45].name);

    // Render Games to Main
    if (gameData) {
        $gameEl.html(generateUI());
    }
}

function handleGetInfo() {
   const url = gameData.results[this.dataset.index].background_image;

    if(url) {
        $('#background').attr('src', url);
        $listEl.modal();
    }
}

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