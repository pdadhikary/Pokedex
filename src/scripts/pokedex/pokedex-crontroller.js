const $ = require("jquery");
const { displayAutoComplete, displayPokemon } = require("./pokedex-view.js");
const { getPokemon, getAllPokemonNames } = require("./pokedex-service.js");

function PokedexController() {
    // Event Handlers
    setSearchEventListener((e) => {
        e.preventDefault();
        let query = getQueryString().toLowerCase();
        getPokemon(query).then(displayPokemon);
    });
    setQueryEventListener((e) => {
        if (e.keyCode === 13) {
            e.preventDefault();
            $("#search").click();
        }
    });

    // init state
    getPokemon("charizard").then(displayPokemon);
    getAllPokemonNames().then(displayAutoComplete);
}

function setSearchEventListener(eventFn) {
    $("#search").click(eventFn);
}

function getQueryString() {
    return $("#query").val();
}

function setQueryEventListener(eventFn) {
    $("#query").keyup(eventFn);
}

module.exports = { PokedexController };
