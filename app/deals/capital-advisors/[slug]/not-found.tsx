import Link from 'next/link'
import { CBREButton } from '../../../../src/components/cbre/CBREButton'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="max-w-2xl mx-auto text-center px-4">
        <h1 className="text-6xl font-financier text-cbre-green mb-6">
          Project Not Found
        </h1>
        <p className="text-xl text-gray-600 font-calibre mb-8 leading-relaxed">
          The Capital Advisors project you're looking for doesn't exist or may have been moved.
        </p>
        <div className="space-y-4">
          <div>
            <Link href="/deals">
              <CBREButton variant="primary" size="lg">
                View All Deals
              </CBREButton>
            </Link>
          </div>
          <div>
            <Link href="/deals?services=Capital%20Advisors">
              <CBREButton variant="outline" size="lg">
                View Capital Advisors Projects
              </CBREButton>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}