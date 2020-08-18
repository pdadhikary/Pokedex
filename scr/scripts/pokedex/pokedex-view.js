// import {} from "./pokedex-crontroller.js";
const display = $("#display-section");

export const displayPokemon = (pokemon) => {
    console.log(pokemon);
    display.empty();
    displayPokemonImg(pokemon);
    displayPokemonName(pokemon);
    displayPokemonStats(pokemon);
};

export const displayPokemonImg = ({ sprite }) => {
    const elem = $('<img id="poke-img" class="front">')
        .attr("src", sprite.front)
        .click((e) => {
            e.preventDefault();
            if ($("#poke-img").hasClass("front")) {
                $("#poke-img").attr("class", "back").attr("src", sprite.back);
            } else {
                $("#poke-img").attr("class", "front").attr("src", sprite.front);
            }
        });
    display.append(elem);
};

export const displayPokemonName = ({ name }) => {
    const elem = $('<div id="poke-name"></div>').append(name.toUpperCase());
    display.append(elem);
};

export const displayPokemonStats = ({ height, weight, abilities, types }) => {
    const typesElem = $('<div id="poke-types"></div>');
    types.forEach((type) =>
        typesElem.append(
            $(
                `<span id="type-${type.slot}" class="poke-type type-${type.name}">${type.name}</span>`
            )
        )
    );

    const abilitiesElem = $('<div id="poke-abilities"></div>');
    abilities.forEach((promise) => {
        promise.then((ability) => {
            abilitiesElem.append(
                `<div id="ability-${ability.slot}" class="poke-ability">
                ${ability.name}
                <span class="ability-desc">${ability.desc}</span>
                </div>`
            );
        });
    });

    const elem = $('<div id="poke-stats"></div>').append(
        $(`<span id="poke-height">${height.feet}' ${height.inch}"</span>`),
        $(`<span id="poke-weight">${weight}</span>`),
        typesElem,
        abilitiesElem
    );
    display.append(elem);
};
