import Header from '@/components/Header'
import { APP_ROUTES } from '@/constants'
import RootLayout from '../layout'

export default function DirectoryPage() {
  return (
    <RootLayout>
      <Header pages={APP_ROUTES} />
      <div>
        <h1>Directory Page</h1>
      </div>
    </RootLayout>
  )
}
