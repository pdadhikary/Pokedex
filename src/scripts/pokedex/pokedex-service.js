const url = "https://pokeapi.co/api/v2/pokemon";

/**
 * Returns the information of the queried pokemon. Promise Based.
 * @param {String} pokemon name of the pokemon
 * @returns a promise object holding the retieved data
 */
const getPokemon = (pokemon) =>
    fetch(`${url}/${pokemon}`)
        .then((response) => response.json())
        .then((data) => {
            const types = [];
            data.types.forEach((typeEntry, i) =>
                types.push({ slot: i, name: capitalize(typeEntry.type.name) })
            );
            const stats = {};
            data.stats.forEach((statItem) => {
                stats[`${statItem.stat.name}`] = statItem.base_stat;
            });
            return {
                id: data.id,
                name: capitalize(data.name),
                height: deciToFtAndIn(data.height),
                weight: hectoTolbs(data.weight),
                sprite: {
                    portait: `https://pokeres.bastionbot.org/images/pokemon/${data.id}.png`,
                    front: data["sprites"]["front_default"],
                    back: data["sprites"]["back_default"],
                },
                types,
                stats,
            };
        });

/**
 * Returns a specific property from a queried pokemon. Promise Based.
 * @param {String} pokemon name of the pokemon
 * @param {String} prop name of the property
 */
const getPokemonProperty = (pokemon, prop) =>
    fetch(`${url}/${pokemon}`)
        .then((response) => response.json())
        .then((data) => data[prop]);

/**
 * Returns the names of all the pokemon in database.
 */
const getAllPokemonNames = () =>
    fetch("https://pokeapi.co/api/v2/pokemon/?limit=649&offset=0")
        .then((response) => response.json())
        .then((data) => data.results.map((entry) => entry.name));

/**
 * Converts height from decimeter to Feet and Inches. Returns an object with
 * properties of 'feet' and 'inches'. Values are rounded to the nearest whole number.
 *
 * Example: deciToFtAndIn(18) will return {'feet': 5, 'inch': 11}
 *
 * @param {Number} height height in decimeter
 */
const deciToFtAndIn = (height) => {
    const ONE_FT_TO_DECI = 3.048;
    const ONE_FT_TO_IN = 12;
    let feet = height / ONE_FT_TO_DECI;
    let inch = (feet - Math.floor(feet)) * ONE_FT_TO_IN;
    return { feet: Math.floor(feet), inch: Math.floor(inch) };
};

/**
 * Converts weight from hectograms to pounds and returns
 * the weight rounded to 1 decimal.
 * @param {Number} weight weight in hectograms.
 */
const hectoTolbs = (weight) => {
    const ONE_LBS_TO_HECTO = 4.536;
    return (weight / ONE_LBS_TO_HECTO).toFixed(1);
};

/**
 * Converts the input string to Capitalize the first letter.
 * @param {String} str input string
 */
const capitalize = (str) =>
    str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();

module.exports = { getPokemon, getPokemonProperty, getAllPokemonNames };
