import { notFound } from 'next/navigation'
import { supabase } from '../../../../../../src/lib/supabase'
import { AdminGuard } from '../../../../../../src/components/admin/AdminGuard'
import { CapitalAdvisorsForm } from '../../../../../../src/components/admin/CapitalAdvisorsForm'
import { Deal } from '../../../../../../src/lib/types'

interface PageProps {
  params: {
    id: string
  }
}

async function getCapitalAdvisorsProject(id: string): Promise<Deal | null> {
  const { data: deal, error } = await supabase
    .from('deals')
    .select('*')
    .eq('id', id)
    .eq('services', 'Capital Advisors')
    .single()

  if (error || !deal) {
    return null
  }

  return deal
}

export default async function EditCapitalAdvisorsProjectPage({ params }: PageProps) {
  const resolvedParams = await params
  const deal = await getCapitalAdvisorsProject(resolvedParams.id)

  if (!deal) {
    notFound()
  }

  return (
    <AdminGuard>
      <CapitalAdvisorsForm deal={deal} isEditing={true} />
    </AdminGuard>
  )
}