import { useState } from 'react'
import Button from './modules/Button.tsx'
import InfoCard from './modules/InfoCard.tsx'
import SearchSection, { SearchSectionProps } from './modules/SearchSection.tsx'
import StatsCard from './modules/StatsCard.tsx'

export type PokemonInfo = {
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

async function fetchPokemon(endpoint: string) {
  try {
    const data = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${endpoint.toLowerCase()}/`,
    ).then((response) => response.json() as Promise<PokemonInfo>)
    return data
  } catch (error) {
    console.log(`Pokemon not found: `, error)
  }
}

export default function App() {
  const [pokemon, setPokemon] = useState('')
  const [pokemonInfo, setPokemonInfo] = useState<PokemonInfo | undefined>(
    undefined,
  )
  const [isMoreDetails, setIsMoreDetails] = useState(false)

  const handleSearchPokemon: SearchSectionProps['onFormSubmit'] = async (
    event,
  ) => {
    // prevent page refreshing
    event.preventDefault()

    const pokemonInfo = await fetchPokemon(pokemon)
    setPokemonInfo(pokemonInfo)

    // reset search input
    setPokemon('')
  }

  async function handleRandomPokemon() {
    // Pokemon ID range: 1 - 1017
    const randomPokemonId = getRandomInt(1, 1017).toString()

    const pokemonInfo = await fetchPokemon(randomPokemonId)
    setPokemonInfo(pokemonInfo)
  }

  return (
    <>
      <section className="my-10 flex min-h-screen flex-col items-center gap-3">
        <h1 className="my-2 text-center text-3xl font-bold text-blue-700">
          Find Your Pokémon
        </h1>
        <SearchSection
          onFormSubmit={handleSearchPokemon}
          onInputChange={(event) => {
            setPokemon(event.target.value)
          }}
          value={pokemon}
        />
        <div className="my-2">
          <Button onClick={handleRandomPokemon} label="Random Pokemon" />
        </div>
        {pokemonInfo ? (
          <>
            <InfoCard pokemonInfo={pokemonInfo} />
            <div className="my-2">
              <Button
                onClick={() => setIsMoreDetails((prevOption) => !prevOption)}
                label={isMoreDetails ? 'Hide Details' : 'Show Details'}
              />
            </div>
          </>
        ) : null}
        {pokemonInfo && isMoreDetails ? (
          <StatsCard pokemonInfo={pokemonInfo} />
        ) : null}
      </section>
    </>
  )
}

function getRandomInt(min: number, max: number): number {
  // use Math.max() if random number is less then 'min', we return 'min'
  return Math.max(Math.floor(Math.random() * max), min)
}
