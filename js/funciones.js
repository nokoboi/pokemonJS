const contenedor = document.getElementById('container');
const btnAleatorio = document.getElementById('btnAleatorio');
const inputPokemon = document.getElementById('inputPokemon');
const pPuntuacion = document.getElementById('punt')
let pokemonAleatorio = '';
let puntuacion = 0;

const urlPokemon = `https://pokeapi.co/api/v2/pokemon?limit=1007`;

async function obtenerLanzamientos() {
    const resultado = await fetch(urlPokemon);
    const datos = await resultado.json();    

    const pokAleatorio = datos.results[Math.floor(Math.random()*datos.results.length)]
    // console.log('Pokémon aleatorio seleccionado:', pokAleatorio);

    const pokemonData = await fetch(pokAleatorio.url);
    const pokemonInfo = await pokemonData.json();

    pokemonAleatorio = pokemonInfo.name;

    // console.log(datos)
    
    mostrarDatos(pokemonInfo)


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

    // Busca la primera entrada en español
    const flavorTextEntry = desc.flavor_text_entries.find(entry => entry.language.name === 'es');

    // Si se encuentra una entrada en español, se usa esa, de lo contrario se da un mensaje por defecto
    const flavorText = flavorTextEntry ? flavorTextEntry.flavor_text : 'Descripción no disponible en español.';

    contenedor.innerHTML = `
        <img class="img" src='${pokemon.sprites.front_default}'/>
        <p class="desc">Descripción: ${flavorText}</p>
    `;
}

obtenerLanzamientos()

function comparar(){
    const pokemonBuscado = inputPokemon.value.toLowerCase().trim();

    // Muestra el valor en la consola o úsalo para buscar un Pokémon
    console.log('Valor ingresado:', pokemonBuscado);
    if(pokemonBuscado===pokemonAleatorio){
        puntuacion++;
        pPuntuacion.textContent = puntuacion
        inputPokemon.value = '';
        console.log(puntuacion)
    }else{
        inputPokemon.value = '';
    }

    obtenerLanzamientos()
}

btnAleatorio.addEventListener('click', comparar);
inputPokemon.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        comparar();
    }
});

// Efectos
function crearEstrella(x, y, tamaño) {
    const estrella = document.createElement('div');
    estrella.classList.add('estrella');
    estrella.style.left = x + 'px';
    estrella.style.top = y + 'px';
    estrella.style.transform = `scale(${tamaño})`;
    document.body.appendChild(estrella);
    return estrella;
}

function brillarEstrella(estrella) {
    const escalaActual = parseFloat(estrella.style.transform.match(/scale\((.*?)\)/)[1]);
    estrella.style.transform = `scale(${escalaActual * 1.2})`;
    estrella.style.opacity = '1';
    setTimeout(() => {
        estrella.style.transform = `scale(${escalaActual})`;
        estrella.style.opacity = '0.9';
    }, 300);
}

function crearEstrellas() {
    const estrellas = [];
    const numEstrellas = 100;
    const ancho = window.innerWidth;
    const alto = window.innerHeight;

    for (let i = 0; i < numEstrellas; i++) {
        const x = Math.random() * ancho;
        const y = Math.random() * alto;
        const tamaño = Math.random() * 0.5 + 0.5; // Tamaño entre 0.5 y 1
        estrellas.push(crearEstrella(x, y, tamaño));
    }

    return estrellas;
}

const estrellas = crearEstrellas();

// Hacer que las estrellas brillen aleatoriamente
setInterval(() => {
    const indice = Math.floor(Math.random() * estrellas.length);
    brillarEstrella(estrellas[indice]);
}, 100);

// Ajustar las estrellas cuando se cambia el tamaño de la ventana
window.addEventListener('resize', () => {
    estrellas.forEach(estrella => estrella.remove());
    estrellas.length = 0;
    estrellas.push(...crearEstrellas());
});