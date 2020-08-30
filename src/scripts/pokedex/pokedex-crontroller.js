const $ = require("jquery");
const { displayPokemon } = require("./pokedex-view.js");
const { getPokemon } = require("./pokedex-service.js");

function PokedexController() {
    setSearchEventListener(() => {
        let query = getQueryString().toLowerCase();
        getPokemon(query).then(displayPokemon);
    });
    setQueryEventListener((e) => {
        if (e.keyCode === 13) {
            e.preventDefault();
            $("#search").click();
        }
    });
    getPokemon("charizard").then(displayPokemon);
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
