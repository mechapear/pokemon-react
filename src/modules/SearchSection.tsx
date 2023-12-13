import { ComponentProps } from 'react'
import { SearchIcon } from './icons.tsx'

export type SearchSectionProps = {
  // ComponentProps<'form'>['onSubmit'] can be undefined
  // so using NonNullable to remove undefined from the type
  onFormSubmit: NonNullable<ComponentProps<'form'>['onSubmit']>
  onInputChange: NonNullable<ComponentProps<'input'>['onChange']>
  value: string
}

export default function SearchSection({
  onFormSubmit,
  onInputChange,
  value,
}: SearchSectionProps) {
  return (
    <form onSubmit={onFormSubmit} className="relative flex min-w-[300px]">
      <input
        type="text"
        placeholder="Write your Pokemon name..."
        className="w-full rounded-lg border border-gray-300 bg-gray-50 py-2.5 pe-14 pl-2.5 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-amber-400"
        value={value}
        onChange={onInputChange}
      />
      <button
        type="button"
        className="absolute end-0 top-0 rounded-r-lg border border-amber-400 bg-amber-400 p-2.5 text-blue-700 hover:bg-amber-800 hover:text-white focus:outline-none focus:ring-2 focus:ring-amber-300"
      >
        <SearchIcon />
      </button>
    </form>
  )
}
