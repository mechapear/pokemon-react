import { PokemonInfo } from '../App.tsx'

type InfoCardProps = {
  pokemonInfo: PokemonInfo
}

export default function InfoCard({ pokemonInfo }: InfoCardProps) {
  return (
    <section className="flex flex-col items-center gap-2 rounded-lg border-2 border-amber-400 p-8 shadow-md">
      <span>No.{addLeadingZero(pokemonInfo.id)}</span>
      <h2 className="text-2xl font-bold text-blue-700">
        {capitalize(pokemonInfo.name)}
      </h2>
      <img
        className="h-60 w-60"
        src={pokemonInfo.sprites?.other['official-artwork'].front_default}
        alt={pokemonInfo.name}
      />
      <p>Weight: {pokemonInfo.weight} kg</p>
      <p>Height: {convertToMeters(pokemonInfo.height)} m</p>
      <p>
        Types:{' '}
        {pokemonInfo.types ? capitalize(pokemonInfo.types[0].type.name) : ''}
      </p>
      <p>Abilities: {capitalize(pokemonInfo.abilities[0].ability.name)}</p>
    </section>
  )
}

function addLeadingZero(num: number): string {
  return num.toString().padStart(4, '0')
}

function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

function convertToMeters(height: number) {
  return height / 100
}
