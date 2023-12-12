type ButtonProps = {
  onClick: () => void
  label: string
}

export default function Button({ onClick, label }: ButtonProps) {
  return (
    <>
      <button
        className="rounded-lg border border-amber-400 bg-amber-400 p-2.5 text-sm font-medium text-blue-700 hover:bg-amber-800 hover:text-white focus:outline-none focus:ring-2 focus:ring-amber-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        onClick={onClick}
      >
        {label}
      </button>
    </>
  )
}
