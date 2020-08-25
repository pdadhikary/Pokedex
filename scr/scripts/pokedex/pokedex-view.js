const display = $("#display-section");

export const displayPokemon = (pokemon) => {
    console.log(pokemon);
    display.empty();
    displayPokemonImg(pokemon);
    displayPokemonName(pokemon);
    displayPokemonInfo(pokemon);
    $("#query").autocomplete();
};

export const displayPokemonImg = ({ sprite }) => {
    const elem = $('<img id="poke-img">').attr("src", sprite.portait);
    const front = $('<img id="front">').attr("src", sprite.front);
    const back = $('<img id="back">').attr("src", sprite.back);
    display.append(elem, front, back);
    changeBackgroundColor(sprite.portait);
};

export const displayPokemonName = ({ name }) => {
    const elem = $('<div id="poke-name"></div>').append(name.toUpperCase());
    display.append(elem);
};

export const displayPokemonInfo = ({ height, weight, stats, types }) => {
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

export const changeBackgroundColor = (img) => {
    rgbaster(img, {
        ignore: ["rgb(255,255,255)", "rgb(0,0,0)"],
    }).then((colorArr) => {
        let bgColor = tinycolor(colorArr[0].color);
        let triad = bgColor.tetrad().map((color) => color.toHexString());
        let textColor = tinycolor.mostReadable(bgColor.toHexString(), triad, {
            includeFallbackColors: true,
        });
        display
            .css("background-color", bgColor.toHexString())
            .css("color", textColor.toHexString());
    });
};
