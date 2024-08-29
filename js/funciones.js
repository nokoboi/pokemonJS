const contenedor = document.getElementById('container');

var Pokemon = new Array("Bulbasaur", "Ivysaur", "Venusaur", "Charmander", "Charmeleon", "Charizard", "Squirtle", "Wartortle", "Blastoise", "Caterpie", "Metapod", "Butterfree", "Weedle", "Kakuna", "Beedrill", "Pidgey", "Pidgeotto", "Pidgeot", "Rattata", "Raticate", "Spearow", "Fearow", "Ekans", "Arbok", "Pikachu", "Raichu", "Sandshrew", "Sandslash", "Nidoran", "Nidorina", "Nidoqueen", "Nidoran", "Nidorino", "Nidoking", "Clefairy", "Clefable", "Vulpix", "Ninetales", "Jigglypuff", "Wigglytuff", "Zubat", "Golbat", "Oddish", "Gloom", "Vileplume", "Paras", "Parasect", "Venonat", "Venomoth", "Diglett", "Dugtrio", "Meowth", "Persian", "Psyduck", "Golduck", "Mankey", "Primeape", "Growlithe", "Arcanine", "Poliwag", "Poliwhirl", "Poliwrath", "Abra", "Kadabra", "Alakazam", "Machop", "Machoke", "Machamp", "Bellsprout", "Weepinbell", "Victreebel", "Tentacool", "Tentacruel", "Geodude", "Graveler", "Golem", "Ponyta", "Rapidash", "Slowpoke", "Slowbro", "Magnemite", "Magneton", "Farfetch'd", "Doduo", "Dodrio", "Seel", "Dewgong", "Grimer", "Muk", "Shellder", "Cloyster", "Gastly", "Haunter", "Gengar", "Onix", "Drowzee", "Hypno", "Krabby", "Kingler", "Voltorb", "Electrode", "Exeggcute", "Exeggutor", "Cubone", "Marowak", "Hitmonlee", "Hitmonchan", "Lickitung", "Koffing", "Weezing", "Rhyhorn", "Rhydon", "Chansey", "Tangela", "Kangaskhan", "Horsea", "Seadra", "Goldeen", "Seaking", "Staryu", "Starmie", "Mr. Mime", "Scyther", "Jynx", "Electabuzz", "Magmar", "Pinsir", "Tauros", "Magikarp", "Gyarados", "Lapras", "Ditto", "Eevee", "Vaporeon", "Jolteon", "Flareon", "Porygon", "Omanyte", "Omastar", "Kabuto", "Kabutops", "Aerodactyl", "Snorlax", "Articuno", "Zapdos", "Moltres", "Dratini", "Dragonair", "Dragonite", "Mewtwo", "Mew");

let pokAleatorio = Math.floor(Math.random() * Pokemon.length);
console.log(Pokemon[pokAleatorio])

const urlPokemon = `https://pokeapi.co/api/v2/pokemon/${Pokemon[pokAleatorio].toLowerCase()}`;

async function obtenerLanzamientos() {
    const resultado = await fetch(urlPokemon);
    const datos = await resultado.json();

    

    console.log(datos)
    
    mostrarDatos(datos)


    // fetch(urlLanzamientos)
    //     .then(resultado => {
    //         return resultado.json()
    //     })
    //     .then(datos => {
    //         console.log(datos)
    //         //mostrarDatos(datos);
    //     })
}

async function mostrarDatos(pokemon){
    const descripcion = await fetch(pokemon.species.url)
    const desc = await descripcion.json();

    console.log(desc.flavor_text_entries)

    contenedor.innerHTML = `
            <p>Nombre del Pokémon: ${Pokemon[pokAleatorio]}</p>
            <p>Imagen:</p>
            <img class="img" src='${pokemon.sprites.front_default}'/>
            <p>Descripción: ${desc.flavor_text_entries[42].flavor_text}
            <p>-------------</p>
        `
}



obtenerLanzamientos()