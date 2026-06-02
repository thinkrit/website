import { HomePage } from './_pages/HomePage'

export const dynamic = 'force-dynamic'

export default async function Page() {
  return <HomePage locale="en" />
}
