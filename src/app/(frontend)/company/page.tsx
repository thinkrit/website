import { CompanyPage } from '../_pages/CompanyPage'

export const dynamic = 'force-dynamic'

export default async function Page() {
  return <CompanyPage locale="en" />
}
