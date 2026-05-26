import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Financial LAC',
  description: 'Sistema financeiro',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body style={{ margin: 0, fontFamily: 'Arial, sans-serif' }}>
        <nav style={{
          background: '#1e3a5f',
          padding: '0 32px',
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          height: 56
        }}>
          <a href="/" style={{ color: 'white', textDecoration: 'none', fontWeight: 'bold', fontSize: 18, marginRight: 24 }}>
            Financial LAC
          </a>
          <a href="/dashboard" style={{ color: '#cbd5e1', textDecoration: 'none', padding: '8px 16px', borderRadius: 6, fontSize: 14 }}>
            Dashboard
          </a>
          <a href="/lancamentos" style={{ color: '#cbd5e1', textDecoration: 'none', padding: '8px 16px', borderRadius: 6, fontSize: 14 }}>
            Lancamentos
          </a>
          <a href="/lista" style={{ color: '#cbd5e1', textDecoration: 'none', padding: '8px 16px', borderRadius: 6, fontSize: 14 }}>
            Lista
          </a>
          <a href="/importar" style={{ color: '#cbd5e1', textDecoration: 'none', padding: '8px 16px', borderRadius: 6, fontSize: 14 }}>
            Importar
          </a>
        </nav>
        {children}
      </body>
    </html>
  )
}