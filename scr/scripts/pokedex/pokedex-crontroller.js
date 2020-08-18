import { displayPokemon } from "./pokedex-view.js";
import { getPokemon, getPokemonProperty } from "./pokedex-service.js";

export function PokedexController() {
    setSearchEventListener(() => {
        let query = getQueryString().toLowerCase();
        getPokemon(query).then(displayPokemon);
    });
    getPokemon("charizard").then(displayPokemon);
}

function setSearchEventListener(eventFn) {
    $("#search").click(eventFn);
}

function getQueryString() {
    return $("#query").val();
}
