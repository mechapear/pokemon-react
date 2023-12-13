import { PokemonInfo } from '../App.tsx'

type StatsCardProps = {
  pokemonInfo: PokemonInfo
}

export default function StatsCard({ pokemonInfo }: StatsCardProps) {
  const tableRow = pokemonInfo.stats.map((_stat, index) => (
    <tr className="border-b border-blue-300 bg-blue-500">
      <th className="bg-blue-700 px-6 py-2 text-xs uppercase text-white">
        {pokemonInfo.stats[index].stat.name}
      </th>
      <td className="px-6 py-2">{pokemonInfo.stats[index].base_stat}</td>
    </tr>
  ))

  return (
    <section className="flex w-[308px] flex-col items-center gap-2 rounded-lg border-2 border-amber-400 p-8 shadow-md">
      <div className="relative overflow-x-auto rounded-lg shadow-md">
        <table className="w-full text-left text-sm text-white">
          <tbody>{tableRow}</tbody>
        </table>
      </div>
    </section>
  )
}
