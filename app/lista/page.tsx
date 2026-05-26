'use client'
import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'

export default function Lista() {
  const [receber, setReceber] = useState<any[]>([])
  const [pagar, setPagar] = useState<any[]>([])
  const [aba, setAba] = useState('receber')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function carregar() {
      const { data: r } = await supabase
        .from('contas_receber')
        .select('*')
        .order('vencimento', { ascending: true })

      const { data: p } = await supabase
        .from('contas_pagar')
        .select('*')
        .order('vencimento', { ascending: true })

      setReceber(r || [])
      setPagar(p || [])
      setLoading(false)
    }
    carregar()
  }, [])

  const dados = aba === 'receber' ? receber : pagar
  const cor = aba === 'receber' ? '#16a34a' : '#dc2626'

  if (loading) return <main style={{ padding: 40 }}>Carregando...</main>

  return (
    <main style={{ padding: 40, maxWidth: 800 }}>
      <h1 style={{ marginBottom: 24 }}>Lancamentos</h1>

      <div style={{ display: 'flex', gap: 8, marginBottom: 24 }}>
        <button
          onClick={() => setAba('receber')}
          style={{ padding: '10px 24px', background: aba === 'receber' ? '#16a34a' : '#e5e7eb', color: aba === 'receber' ? 'white' : 'black', border: 'none', borderRadius: 6, cursor: 'pointer', fontWeight: 'bold' }}
        >
          A Receber ({receber.length})
        </button>
        <button
          onClick={() => setAba('pagar')}
          style={{ padding: '10px 24px', background: aba === 'pagar' ? '#dc2626' : '#e5e7eb', color: aba === 'pagar' ? 'white' : 'black', border: 'none', borderRadius: 6, cursor: 'pointer', fontWeight: 'bold' }}
        >
          A Pagar ({pagar.length})
        </button>
      </div>

      {dados.length === 0 ? (
        <p style={{ color: '#6b7280' }}>Nenhum lancamento encontrado.</p>
      ) : (
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: '#f3f4f6' }}>
              <th style={{ padding: '12px 16px', textAlign: 'left', borderBottom: '1px solid #e5e7eb' }}>Cliente</th>
              <th style={{ padding: '12px 16px', textAlign: 'right', borderBottom: '1px solid #e5e7eb' }}>Valor</th>
              <th style={{ padding: '12px 16px', textAlign: 'center', borderBottom: '1px solid #e5e7eb' }}>Vencimento</th>
              <th style={{ padding: '12px 16px', textAlign: 'center', borderBottom: '1px solid #e5e7eb' }}>Status</th>
            </tr>
          </thead>
          <tbody>
            {dados.map((item, i) => (
              <tr key={i} style={{ borderBottom: '1px solid #f3f4f6' }}>
                <td style={{ padding: '12px 16px' }}>{item.cliente || item.descricao || '-'}</td>
                <td style={{ padding: '12px 16px', textAlign: 'right', fontWeight: 'bold', color: cor }}>
                  R$ {Number(item.valor).toFixed(2)}
                </td>
                <td style={{ padding: '12px 16px', textAlign: 'center', color: '#6b7280' }}>
                  {item.vencimento || item.data_vencimento || '-'}
                </td>
                <td style={{ padding: '12px 16px', textAlign: 'center' }}>
                  <span style={{
                    padding: '4px 12px',
                    borderRadius: 20,
                    fontSize: 13,
                    background: item.status === 'pago' ? '#dcfce7' : '#fef9c3',
                    color: item.status === 'pago' ? '#16a34a' : '#854d0e'
                  }}>
                    {item.status || 'pendente'}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <div style={{ marginTop: 24, display: 'flex', gap: 16 }}>
        <a href="/lancamentos" style={{ color: '#2563eb', textDecoration: 'none' }}>+ Novo lancamento</a>
        <a href="/dashboard" style={{ color: '#6b7280', textDecoration: 'none' }}>Ver Dashboard</a>
        <a href="/" style={{ color: '#6b7280', textDecoration: 'none' }}>Voltar</a>
      </div>
    </main>
  )
}