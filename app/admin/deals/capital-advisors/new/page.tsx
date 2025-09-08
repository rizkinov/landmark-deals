import { AdminGuard } from '../../../../../src/components/admin/AdminGuard'
import { CapitalAdvisorsForm } from '../../../../../src/components/admin/CapitalAdvisorsForm'

export default function NewCapitalAdvisorsProjectPage() {
  return (
    <AdminGuard>
      <CapitalAdvisorsForm />
    </AdminGuard>
  )
}