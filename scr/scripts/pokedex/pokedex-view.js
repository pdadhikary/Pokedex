const display = $("#display-section");

export const displayPokemon = (pokemon) => {
    console.log(pokemon);
    display.empty();
    displayPokemonImg(pokemon);
    displayPokemonName(pokemon);
    displayPokemonAttr(pokemon);
};

export const displayPokemonImg = ({ sprite }) => {
    const elem = $('<img id="poke-img">').attr("src", sprite.portait);
    const front = $('<img id="front">').attr("src", sprite.front);
    const back = $('<img id="back">').attr("src", sprite.back);
    display.append(elem, front, back);
};

export const displayPokemonName = ({ name }) => {
    const elem = $('<div id="poke-name"></div>').append(name.toUpperCase());
    display.append(elem);
};

export const displayPokemonAttr = ({ height, weight, stats, types }) => {
    const typesElem = $('<div id="poke-types"></div>');
    types.forEach((type) =>
        typesElem.append(
            $(
                `<span id="type-${
                    type.slot
                }" class="poke-type type-${type.name.toLowerCase()}">${
                    type.name
                }</span>`
            )
        )
    );

    /*      Display Abilities
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
    */

    let str = "fdfd";

    const attrElem = $('<div id="poke-attr"></div>').append(
        $(
            `<span id="poke-height">${height.feet}' ${String(
                height.inch
            ).padStart(2, 0)}"</span>`
        ),
        $(`<span id="poke-weight">${weight}</span>`),
        typesElem
    );

    const statElem = $('<div id="poke-stats"></div>');
    Object.keys(stats).forEach((name) => {
        statElem.append(
            $(`<div id=${name} class="poke-stat">${stats[name]}</div>`)
        );
    });
    display.append(attrElem, statElem);
};
