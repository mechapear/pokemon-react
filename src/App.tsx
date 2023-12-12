import { FormEvent, useState } from 'react'
import Button from './modules/Button.tsx'
import { SearchIcon } from './modules/icons.tsx'

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
  stats: {
    base_stat: number
    stat: {
      name:
        | 'hp'
        | 'attack'
        | 'defense'
        | 'special-attack'
        | 'special-defense'
        | 'speed'
    }
  }[]
}

export default function App() {
  const [pokemon, setPokemon] = useState('')
  const [pokemonInfo, setPokemonInfo] = useState<PokemonInfo | undefined>(
    undefined,
  )
  const [isMoreDetails, setIsMoreDetails] = useState(false)

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
      <section className="my-10 flex min-h-screen flex-col items-center gap-3">
        <h1 className="my-2 text-center text-3xl font-bold text-blue-700">
          Find Your Pokémon
        </h1>
        <form
          onSubmit={handleSearchPokemon}
          className="relative flex min-w-[300px]"
        >
          <input
            type="text"
            placeholder="Write your Pokemon name..."
            className="w-full rounded-lg border border-gray-300 bg-gray-50 py-2.5 pe-14 pl-2.5 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-amber-400"
            value={pokemon}
            onChange={(event) => {
              setPokemon(event.target.value)
            }}
          />
          <button
            type="button"
            className="absolute end-0 top-0 rounded-r-lg border border-amber-400 bg-amber-400 p-2.5 text-blue-700 hover:bg-amber-800 hover:text-white focus:outline-none focus:ring-2 focus:ring-amber-300"
          >
            <SearchIcon />
          </button>
        </form>

        <div className="my-2">
          <Button onClick={handleRandomPokemon} label="Random Pokemon" />
        </div>
        {pokemonInfo ? (
          <>
            <section className="flex flex-col items-center gap-2 rounded-lg border-2 border-amber-400 p-8 shadow-md">
              <span>No.{addLeadingZero(pokemonInfo.id)}</span>
              <h2 className="text-2xl font-bold text-blue-700">
                {capitalizeFirstLetter(pokemonInfo.name)}
              </h2>
              <img
                className="h-60 w-60"
                src={
                  pokemonInfo.sprites?.other['official-artwork'].front_default
                }
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
            </section>
            <div className="my-2">
              <Button
                onClick={() => setIsMoreDetails((prevOption) => !prevOption)}
                label={isMoreDetails ? 'Hide Details' : 'Show Details'}
              />
            </div>
          </>
        ) : null}
        {isMoreDetails ? (
          <section className="flex flex-col items-center gap-2 rounded-lg border-2 border-amber-400 p-8 shadow-md">
            <div className="relative overflow-x-auto rounded-lg shadow-md">
              <table className="w-full text-left text-sm text-white">
                <tbody>
                  <tr className="border-b border-blue-300 bg-blue-500">
                    <th
                      scope="col"
                      className="bg-blue-700 px-7 py-2 text-xs uppercase text-white"
                    >
                      {pokemonInfo?.stats[0].stat.name}
                    </th>
                    <td className="px-7 py-2">
                      {pokemonInfo?.stats[0].base_stat}
                    </td>
                  </tr>
                  <tr className="border-b border-blue-300 bg-blue-500">
                    <th
                      scope="col"
                      className="bg-blue-700 px-7 py-2 text-xs uppercase text-white"
                    >
                      {pokemonInfo?.stats[1].stat.name}
                    </th>
                    <td className="px-7 py-2">
                      {pokemonInfo?.stats[1].base_stat}
                    </td>
                  </tr>
                  <tr className="border-b border-blue-300 bg-blue-500">
                    <th
                      scope="col"
                      className="bg-blue-700 px-7 py-2 text-xs uppercase text-white"
                    >
                      {pokemonInfo?.stats[2].stat.name}
                    </th>
                    <td className="px-7 py-2">
                      {pokemonInfo?.stats[2].base_stat}
                    </td>
                  </tr>
                  <tr className="border-b border-blue-300 bg-blue-500">
                    <th
                      scope="col"
                      className="bg-blue-700 px-7 py-2 text-xs uppercase text-white"
                    >
                      {pokemonInfo?.stats[3].stat.name}
                    </th>
                    <td className="px-7 py-2">
                      {pokemonInfo?.stats[3].base_stat}
                    </td>
                  </tr>
                  <tr className="border-b border-blue-300 bg-blue-500">
                    <th
                      scope="col"
                      className="bg-blue-700 px-7 py-2 text-xs uppercase text-white"
                    >
                      {pokemonInfo?.stats[4].stat.name}
                    </th>
                    <td className="px-7 py-2">
                      {pokemonInfo?.stats[4].base_stat}
                    </td>
                  </tr>
                  <tr className="bg-blue-500">
                    <th
                      scope="col"
                      className="bg-blue-700 px-7 py-2 text-xs uppercase text-white"
                    >
                      {pokemonInfo?.stats[5].stat.name}
                    </th>
                    <td className="px-7 py-2">
                      {pokemonInfo?.stats[5].base_stat}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>
        ) : null}
      </section>
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
