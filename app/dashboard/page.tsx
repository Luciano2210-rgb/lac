'use client'
import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

export default function Dashboard() {
  const [receber, setReceber] = useState(0)
  const [pagar, setPagar] = useState(0)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function carregar() {
      const { data: r } = await supabase.from('contas_receber').select('valor')
      const { data: p } = await supabase.from('contas_pagar').select('valor')

      const totalReceber = r?.reduce((acc, item) => acc + Number(item.valor), 0) || 0
      const totalPagar = p?.reduce((acc, item) => acc + Number(item.valor), 0) || 0

      setReceber(totalReceber)
      setPagar(totalPagar)
      setLoading(false)
    }
    carregar()
  }, [])

  const dados = [
    { nome: 'A Receber', valor: receber },
    { nome: 'A Pagar', valor: pagar },
    { nome: 'Saldo', valor: receber - pagar },
  ]

  if (loading) return <main style={{ padding: 40 }}>Carregando...</main>

  return (
    <main style={{ padding: 40, maxWidth: 700 }}>
      <h1 style={{ marginBottom: 8 }}>Dashboard Financeiro</h1>
      <a href="/lancamentos" style={{ color: '#2563eb', textDecoration: 'none', fontSize: 15 }}>+ Novo lancamento</a>

      <div style={{ display: 'flex', gap: 16, margin: '24px 0' }}>
        <div style={{ flex: 1, padding: 20, background: '#dcfce7', borderRadius: 8 }}>
          <p style={{ margin: 0, fontSize: 13, color: '#166534' }}>Total a Receber</p>
          <p style={{ margin: 0, fontSize: 28, fontWeight: 'bold', color: '#166534' }}>R$ {receber.toFixed(2)}</p>
        </div>
        <div style={{ flex: 1, padding: 20, background: '#fee2e2', borderRadius: 8 }}>
          <p style={{ margin: 0, fontSize: 13, color: '#991b1b' }}>Total a Pagar</p>
          <p style={{ margin: 0, fontSize: 28, fontWeight: 'bold', color: '#991b1b' }}>R$ {pagar.toFixed(2)}</p>
        </div>
        <div style={{ flex: 1, padding: 20, background: '#dbeafe', borderRadius: 8 }}>
          <p style={{ margin: 0, fontSize: 13, color: '#1e40af' }}>Saldo</p>
          <p style={{ margin: 0, fontSize: 28, fontWeight: 'bold', color: '#1e40af' }}>R$ {(receber - pagar).toFixed(2)}</p>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={dados}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="nome" />
          <YAxis />
          <Tooltip formatter={(v: number) => `R$ ${v.toFixed(2)}`} />
          <Legend />
          <Bar dataKey="valor" fill="#2563eb" name="Valor (R$)" />
        </BarChart>
      </ResponsiveContainer>

      <a href="/" style={{ display: 'block', marginTop: 24, color: '#6b7280', textDecoration: 'none' }}>Voltar</a>
    </main>
  )
}