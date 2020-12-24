const $ = require("jquery");
const tph = require("jquery-typeahead");
const rgbaster = require("rgbaster");
const tinycolor = require("tinycolor2");

// Enables Autocomplete functionality
const displayAutoComplete = (data) => {
    $.typeahead({
        input: ".js-typeahead",
        order: "asc",
        hint: true,
        source: {
            data: data,
        },
        callback: {
            onInit: function (node) {
                console.log("Typeahead Initiated on", node, "with", data);
            },
        },
    });
};

/**
 * The main driver function in displaying the pokemon.
 * @param {*} pokemon aggregate information about the pokemon
 */
const displayPokemon = (pokemon) => {
    console.log(`Here is the pokemon: `, pokemon);
    $("#display-section").empty();
    displayPokemonImg(pokemon);
    displayPokemonName(pokemon);
    displayPokemonInfo(pokemon);
};

/**
 * Displays the avatar of the pokemon.
 * @param {*} sprite image of the pokemon
 */
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

/**
 * Displays the given info of the pokemon.
 *
 * @param {String} height height of the pokemon in feet and inches
 * @param {Number} height weight of the pokemon in pounds
 * @param {*} stats stats of the pokemon
 * @param {*} types type of the pokemon
 *
 */
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

/**
 * Analyzes the given image and sets the background to the
 * color most complementary to the pokemon.
 *
 * @param {*} img image of the pokemon.
 */
const changeBackgroundColor = (img) => {
    rgbaster(img, {
        scale: 0.5,
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

module.exports = { displayAutoComplete, displayPokemon };
