import Link from 'next/link'

export default function AuthLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <main className="min-h-screen relative">
            <header className="fixed top-0 left-0 p-8 z-10">
                <Link href="/">
                    <span className="type-display-md text-4xl text-moloch-800">x402RG</span>
                </Link>
            </header>
            {children}
        </main>
    );
}
