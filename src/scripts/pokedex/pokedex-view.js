const $ = require("jquery");
const rgbaster = require("rgbaster");
const tinycolor = require("tinycolor2");

const displayPokemon = (pokemon) => {
    console.log(`Here is the pokemon: `, pokemon);
    $("#display-section").empty();
    displayPokemonImg(pokemon);
    displayPokemonName(pokemon);
    displayPokemonInfo(pokemon);
};

const displayPokemonImg = ({ sprite }) => {
    const elem = $('<img id="poke-img">').attr("src", sprite.portait);
    const front = $('<img id="front">').attr("src", sprite.front);
    const back = $('<img id="back">').attr("src", sprite.back);
    $("#display-section").append(elem, front, back);
    changeBackgroundColor(sprite.portait);
};

const displayPokemonName = ({ name }) => {
    const elem = $('<div id="poke-name"></div>').append(name.toUpperCase());
    $("#display-section").append(elem);
};

const displayPokemonInfo = ({ height, weight, stats, types }) => {
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
    $("#display-section").append(attrElem, statElem);
};

const changeBackgroundColor = (img) => {
    rgbaster(img, {
        ignore: ["rgb(255,255,255)", "rgb(0,0,0)"],
    }).then((colorArr) => {
        let bgColor = tinycolor(colorArr[0].color);
        let triad = bgColor.tetrad().map((color) => color.toHexString());
        let textColor = tinycolor.mostReadable(bgColor.toHexString(), triad, {
            includeFallbackColors: true,
        });
        $("#display-section")
            .css("background-color", bgColor.toHexString())
            .css("color", textColor.toHexString());
    });
};

module.exports = { displayPokemon };
