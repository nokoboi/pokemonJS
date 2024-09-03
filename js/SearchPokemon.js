const urlPokemon = `https://pokeapi.co/api/v2/pokemon?limit=20&offset=0`; // Modifica aquí el límite y el desplazamiento

async function obtenerPokemon(limit = 20, offset = 0) {
    const url = `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`;
    const resultado = await fetch(url);
    const datos = await resultado.json();
    return datos.results; // Retorna solo los resultados (nombre y URL)
}

async function obtenerDetallePokemon(url) {
    const resultado = await fetch(url);
    return await resultado.json(); // Retorna los detalles del Pokémon
}

let currentOffset = 0;
const limit = 20;

async function displayPokemon() {
    
    const pokeCargados = await obtenerPokemon(limit, currentOffset);
    let contenedor = '';

    if (pokeCargados) {
        for (const pok of pokeCargados) {
            const detallePokemon = await obtenerDetallePokemon(pok.url);
            contenedor += `
                <div class="pokemon-card">
                    <h3>${capitalizeFirstLetter(detallePokemon.name)}</h3>
                    <img class="sprite" src="${detallePokemon.sprites.front_default}" alt="${detallePokemon.name}">
                    <a href="#">Ver más...</a>
                </div>
            `;
        }
    } else {
        contenedor = `<p>No hay pokemons</p>`;
    }

    document.getElementById('principal').innerHTML = contenedor;
    updatePaginationButtons();
}

// Para buscar pokemon por tiempo real necesitamos obtener todos los pokemon ya que la API
// por como funciona no deja hacer esto de manera simple.
let todosPokemons = [];

async function obtenerTodosLosPokemons() {
    const url = 'https://pokeapi.co/api/v2/pokemon?limit=1000'; // Obtener un número suficiente de Pokémon
    try {
        const resultado = await fetch(url);
        const datos = await resultado.json();
        todosPokemons = datos.results; // Guardar la lista de Pokémon
    } catch (error) {
        console.error('Error al obtener la lista de Pokémon:', error);
    }
}

obtenerTodosLosPokemons(); // Llamar a esta función cuando la página se carga

/* Obtenemos los detalles de todos los pokémon para luego llamarlo en mostrarPokemonsFiltrados()
* @param la url que necesitamos
*/
async function obtenerDetallesPokemon(url) {
    try {
        const resultado = await fetch(url);
        const datos = await resultado.json();
        return datos; // Retorna los detalles del Pokémon
    } catch (error) {
        console.error('Error al obtener los detalles del Pokémon:', error);
        return null;
    }
}

// Esta funcion filtra el pokemon si el nombre incluye algo relacionado
function filtrarPokemonsPorNombre(nombre) {
    const nombreLower = nombre.toLowerCase();
    return todosPokemons.filter(pokemon => pokemon.name.includes(nombreLower));
}

// Obtenemos los detalles que queramos mostrar de los pokemon filtrados, mostrándolos en el contenedor.
async function mostrarPokemonsFiltrados(nombre) {
    const pokemonsFiltrados = filtrarPokemonsPorNombre(nombre);
    let contenedor = '';

    // Obtener detalles de cada Pokémon filtrado
    const detallesPokemons = await Promise.all(
        pokemonsFiltrados.map(pokemon => obtenerDetallesPokemon(pokemon.url))
    );

    if (detallesPokemons.length > 0) {
        contenedor = detallesPokemons.map(pokemon => `
            <div class="pokemon-card">
                <h3>${capitalizeFirstLetter(pokemon.name)}</h3>
                <img class="sprite" src="${pokemon.sprites.front_default}" alt="${pokemon.name}">
                <a href="#">Ver más...</a>
            </div>
        `).join('');
    } else {
        contenedor = `<p>No se encontró ningún Pokémon</p>`;
    }

    document.getElementById('principal').innerHTML = contenedor;
}

// Input que se encarga de gestionar lo que escribe el usuario, llama a la funcion "mostrarpokemonfiltrados"
// y si no encuentra nada entonces limpia el contenedor y vuelve a mostrar los pokemon como si no hubiera hecho búsqueda.
document.getElementById('pokemon-search').addEventListener('input', async () => {
    const nombrePokemon = document.getElementById('pokemon-search').value.trim();
    if (nombrePokemon) {
        await mostrarPokemonsFiltrados(nombrePokemon); // Muestra los Pokémon filtrados
    } else {
        document.getElementById('principal').innerHTML = ''; // Limpia el contenedor si el campo está vacío
        displayPokemon()
    }
});
// fin busqueda pokemon

// Botones de paginacion
function updatePaginationButtons() {
    document.getElementById('prevButton').style.display = currentOffset > 0 ? 'inline' : 'none';
    document.getElementById('nextButton').style.display = true; // Asumimos que hay más pokemon
}

document.getElementById('prevButton').addEventListener('click', () => {
    if (currentOffset > 0) {
        currentOffset -= limit;
        displayPokemon();
    }
});

document.getElementById('nextButton').addEventListener('click', () => {
    currentOffset += limit;
    displayPokemon();
});

// fin de botones de paginacion

// Llama a displayPokemon para cargar los primeros 20 Pokémon
displayPokemon();

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

// document.addEventListener('DOMContentLoaded', function(){
//     fetch('header.html')
//         .then(response => responese.text())
//         .then(data => {
//             document.getElementsByName('sidebar').innerHTML = data
//         })
// })