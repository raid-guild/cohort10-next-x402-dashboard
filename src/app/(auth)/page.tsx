import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import LoginPage from '@/components/auth/LoginPage'

export default async function Home() {
    const cookieStore = await cookies()
    const authToken = cookieStore.get('auth_token')

    if (authToken?.value) {
        redirect('/dashboard')
    }

    return <LoginPage />
}
