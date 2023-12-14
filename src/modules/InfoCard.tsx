import { PokemonInfo } from '../App.tsx'

type InfoCardProps = {
  pokemonInfo: PokemonInfo
}

export default function InfoCard({ pokemonInfo }: InfoCardProps) {
  const typeItem = pokemonInfo.types.map((type, index) => {
    const name = capitalize(type.type.name)
    return <span>{index > 0 ? `, ${name}` : name}</span>
  })

  const abilityItem = pokemonInfo.abilities.map((ability, index) => {
    const name = capitalize(ability.ability.name)
    return <span>{index > 0 ? `, ${name}` : name}</span>
  })

  return (
    <section className="flex max-w-[308px] flex-col items-center gap-2 rounded-lg border-2 border-amber-400 p-8 shadow-md">
      <span>No.{addLeadingZero(pokemonInfo.id)}</span>
      <h2 className="text-2xl font-bold text-blue-700">
        {capitalize(pokemonInfo.name)}
      </h2>
      <img
        // prevent seeing the previous image until the next one loads
        // add key to the <img>
        // When that key changes, React will re-create the <img> DOM
        key={pokemonInfo.id}
        className="h-60 w-60"
        src={pokemonInfo.sprites?.other['official-artwork'].front_default}
        alt={pokemonInfo.name}
      />
      <p>Weight: {convertToKilogram(pokemonInfo.weight)} kg</p>
      <p>Height: {convertToMeters(pokemonInfo.height)} m</p>
      <p>Types: {typeItem}</p>
      <p className="text-center">Abilities: {abilityItem}</p>
    </section>
  )
}

function addLeadingZero(num: number): string {
  return num.toString().padStart(4, '0')
}

function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

function convertToKilogram(weight: number) {
  return weight / 10
}

function convertToMeters(height: number) {
  return height / 10
}
