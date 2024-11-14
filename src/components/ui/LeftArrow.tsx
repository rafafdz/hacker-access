import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export default function Component({
  href = '/members/search',
  ariaLabel = 'Go back',
}: {
  href?: string
  ariaLabel?: string
}) {
  return (
    <div className="inline-flex items-center">
      <Link
        href={href}
        className="rounded-full p-2 transition-colors duration-200 hover:bg-gray-200 dark:hover:bg-gray-800"
        aria-label={ariaLabel}
      >
        <ArrowLeft className="mr-2 h-6 w-6" />{' '}
        {/* Add margin-right to space out the arrow from text */}
        <span className="sr-only">Back</span>
      </Link>
    </div>
  )
}
