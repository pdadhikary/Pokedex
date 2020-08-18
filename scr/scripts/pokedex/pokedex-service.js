const url = "https://pokeapi.co/api/v2/pokemon";

export const getPokemon = (pokemon) =>
    fetch(`${url}/${pokemon}`)
        .then((response) => response.json())
        .then((data) => {
            const types = [];
            data.types.forEach((typeEntry, i) =>
                types.push({ slot: i, name: typeEntry.type.name })
            );
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
            return {
                name: data.name,
                height: deciToFtAndIn(data.height),
                weight: hectoTolbs(data.weight),
                sprite: {
                    front: data.sprites.front_default,
                    back: data.sprites.back_default,
                },
                types,
                abilities,
            };
        });

export const getPokemonProperty = (pokemon, prop) =>
    fetch(`${url}/${pokemon}`)
        .then((response) => response.json())
        .then((data) => data[prop]);

const deciToFtAndIn = (height) => {
    const ONE_FT_TO_DECI = 3.048;
    const ONE_FT_TO_IN = 12;
    let feet = height / ONE_FT_TO_DECI;
    let inch = (feet - Math.floor(feet)) * ONE_FT_TO_IN;
    return { feet: Math.floor(feet), inch: Math.round(inch) };
};

const hectoTolbs = (weight) => {
    const ONE_LBS_TO_HECTO = 4.536;
    return (weight / ONE_LBS_TO_HECTO).toFixed(1);
};

// TODO: Create this model:
/*
    {
        name: "Charzard",
        height: 5' 07", // API returns height in decimeter, coversion/formatting needed
        weight: 199.5 // API returns weight in hectograms, coversion needed to lbs
        abilitties: [<Promise>{ability:"blaze", desc: "..."}, <Promise>{ability: "solar-power", desc:"..."}],
        types: ["fire", "flying"]
        sprite: {front:"...", back:"..."}
    }
*/
