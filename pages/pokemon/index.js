function changePageTitle(title) {
  document.title = title
}

function generateInfoSection(src, pokemonName) {
  const h2 = document.createElement('h2')
  h2.id = "info-pokemon-label"
  h2.textContent = `Informações sobre ${pokemonName}`

  const img = document.querySelector('img')
  img.src = src
  img.alt = `Imagem do pokemon ${pokemonName}`

  const section = document.querySelector('#info-pokemon')

  section.appendChild(h2)
  section.appendChild(img)
}

async function getPokemonData(name) {
  // fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
  //   .then((fetchData) => {
  //     return fetchData.json()
  //   })
  //   .then((jsonData) => generateInfoSection(jsonData.sprites.front_default, name))
  //   .catch((error) => console.error(error))

  try {
    const data = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)

    const jsonData = await data.json()

    generateInfoSection(jsonData.sprites.front_default, name)

    var spritesArray = Object.values(sprites);

    spritesArray = spritesArray.filter(item => typeof item === 'string');

    var currentIndex = 0;

    exibirProximaImagem();

  } catch (error) {
    console.error(error)
  }
}

function getSearchParams() {
  if (!location.search) {
    return
  }

  const urlSearchParams = new URLSearchParams(location.search)

  const pokemonName = urlSearchParams.get('name')

  changePageTitle(`Pagina do ${pokemonName}`)
  getPokemonData(pokemonName)
}

document.addEventListener('DOMContentLoaded', function () {
  getSearchParams()
})

function exibirProximaImagem() {
  currentIndex++;

  if (currentIndex >= spritesArray.length) {
      currentIndex = 0;
  }
  
  imagem.src = spritesArray[currentIndex];
}

imagem.addEventListener('click', exibirProximaImagem);