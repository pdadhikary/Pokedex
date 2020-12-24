const $ = require("jquery");
const { displayAutoComplete, displayPokemon } = require("./pokedex-view.js");
const { getPokemon, getAllPokemonNames } = require("./pokedex-service.js");

function PokedexController() {
    setSearchEventListener((e) => {
        e.preventDefault();
        let query = getQueryString().toLowerCase();
        getPokemon(query).then(displayPokemon);
    });

    setQueryEventListener((e) => {
        if (e.keyCode === 13) {
            e.preventDefault();
            $("#search").trigger("click");
        }
    });

    // init state
    getPokemon("charizard").then(displayPokemon);
    getAllPokemonNames().then(displayAutoComplete);
    console.log("Hello!");
}

function setSearchEventListener(eventFn) {
    $("#search").on("click", eventFn);
}

function getQueryString() {
    return $("#query").val();
}

function setQueryEventListener(eventFn) {
    $("#query").on("keydown", eventFn);
}

module.exports = { PokedexController };
