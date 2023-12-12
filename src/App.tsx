import { FormEvent, useState } from 'react'

type PokemonInfo = {
  id: number
  name: string
  sprites?: {
    other: {
      'official-artwork': {
        front_default: string
      }
    }
  }
  weight: number
  height: number
  types?: {
    type: {
      name: string
    }
  }[]
  abilities: {
    ability: {
      name: string
    }
  }[]
}

export default function App() {
  const [pokemon, setPokemon] = useState('')
  const [pokemonInfo, setPokemonInfo] = useState<PokemonInfo | undefined>(
    undefined,
  )

  async function fetchPokemon(endpoint: string) {
    try {
      const data = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${endpoint.toLowerCase()}/`,
      ).then((response) => response.json())
      return data
    } catch (error) {
      console.log(`Pokemon not found: `, error)
    }
  }

  async function handleSearchPokemon(event: FormEvent<HTMLFormElement>) {
    // prevent page refreshing
    event.preventDefault()

    const pokemonInfo = await fetchPokemon(pokemon)
    setPokemonInfo(pokemonInfo)

    // reset search input
    setPokemon('')
  }

  async function handleRandomPokemon() {
    // Pokemon ID range: 1 - 1017
    // use Math.max() if random number is less then 1, we'll display 1.
    const randomPokemonId = Math.max(
      Math.floor(Math.random() * 1017),
      1,
    ).toString()

    const pokemonInfo = await fetchPokemon(randomPokemonId)
    setPokemonInfo(pokemonInfo)
  }

  return (
    <>
      <h1 className="text-bold text-center text-xl">Find your Pokemon</h1>
      <form onSubmit={handleSearchPokemon}>
        <input
          type="text"
          placeholder="Write your Pokemon name..."
          className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
          value={pokemon}
          onChange={(event) => {
            setPokemon(event.target.value)
          }}
        />
        <button
          type="button"
          className="rounded-lg border border-blue-700 bg-blue-700 p-2.5 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Search
        </button>
      </form>

      <div>
        <button
          className="rounded-lg border border-blue-700 bg-blue-700 p-2.5 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          onClick={handleRandomPokemon}
        >
          Random New Pokemon
        </button>
      </div>

      {pokemonInfo ? (
        <div>
          <span>No.{addLeadingZero(pokemonInfo.id)}</span>
          <span>{capitalizeFirstLetter(pokemonInfo.name)}</span>
          <img
            src={pokemonInfo.sprites?.other['official-artwork'].front_default}
            alt={pokemonInfo.name}
          />
          <p>Weight: {pokemonInfo.weight} kg</p>
          <p>Height: {convertToMeters(pokemonInfo.height)} m</p>
          <p>
            Types:{' '}
            {pokemonInfo.types
              ? capitalizeFirstLetter(pokemonInfo.types[0].type.name)
              : ''}
          </p>
          <p>
            Abilities:{' '}
            {capitalizeFirstLetter(pokemonInfo.abilities[0].ability.name)}
          </p>
        </div>
      ) : null}
    </>
  )
}

function convertToMeters(height: number) {
  return height / 100
}

function capitalizeFirstLetter(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

function addLeadingZero(num: number): string {
  return num.toString().padStart(4, '0')
}
