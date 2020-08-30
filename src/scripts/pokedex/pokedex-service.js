const url = "https://pokeapi.co/api/v2/pokemon";

const getPokemon = (pokemon) =>
    fetch(`${url}/${pokemon}`)
        .then((response) => response.json())
        .then((data) => {
            const types = [];
            data.types.forEach((typeEntry, i) =>
                types.push({ slot: i, name: capitalize(typeEntry.type.name) })
            );
            /*  Get Abilities
            const abilities = [];
            data.abilities.forEach((abilityEntry, i) =>
                abilities.push(
                    fetch(abilityEntry.ability.url)
                        .then((response) => response.json())
                        .then((abilityData) => ({
                            slot: i,
                            name: abilityData.name,
                            desc:
                                abilityData.flavor_text_entries[0].flavor_text,
                        }))
                )
            );
            */
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

const getPokemonProperty = (pokemon, prop) =>
    fetch(`${url}/${pokemon}`)
        .then((response) => response.json())
        .then((data) => data[prop]);

const deciToFtAndIn = (height) => {
    const ONE_FT_TO_DECI = 3.048;
    const ONE_FT_TO_IN = 12;
    let feet = height / ONE_FT_TO_DECI;
    let inch = (feet - Math.floor(feet)) * ONE_FT_TO_IN;
    return { feet: Math.floor(feet), inch: Math.floor(inch) };
};

const hectoTolbs = (weight) => {
    const ONE_LBS_TO_HECTO = 4.536;
    return (weight / ONE_LBS_TO_HECTO).toFixed(1);
};

const capitalize = (str) =>
    str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();

module.exports = { getPokemon, getPokemonProperty };
