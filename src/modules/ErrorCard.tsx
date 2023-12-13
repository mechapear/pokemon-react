import { ComponentProps } from 'react'
import Button from './Button.tsx'
import { ErrorIcon } from './icons.tsx'

type ErrorCardProps = {
  // NonNullable<> = null and undefined
  // will be removed from the type
  onClick: NonNullable<ComponentProps<'button'>['onClick']>
}
export default function ErrorCard({ onClick }: ErrorCardProps) {
  return (
    <div className="m-6 grid w-[250px] place-items-center gap-3 rounded-lg border p-6 text-center text-red-500 shadow-sm">
      <ErrorIcon />
      <p className="text-sm text-blue-700">
        Oops! Pokemon not found. Please try again
      </p>
      <div className="mt-2">
        <Button onClick={onClick} label={'Try again'} />
      </div>
    </div>
  )
}
