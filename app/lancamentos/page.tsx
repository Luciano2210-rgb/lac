'use client'
import { useState } from 'react'
import { supabase } from '../lib/supabase'

export default function Lancamentos() {
  const [tipo, setTipo] = useState('receber')
  const [descricao, setDescricao] = useState('')
  const [valor, setValor] = useState('')
  const [data, setData] = useState('')
  const [mensagem, setMensagem] = useState('')

  async function salvar() {
    const tabela = tipo === 'receber' ? 'contas_receber' : 'contas_pagar'
    const { error } = await supabase.from(tabela).insert({
      cliente: descricao,
      valor: parseFloat(valor),
      vencimento: data,
      status: 'pendente'

    })
    if (error) setMensagem('Erro: ' + error.message)
    else {
      setMensagem('Lancamento salvo com sucesso!')
      setDescricao('')
      setValor('')
      setData('')
    }
  }

  const cor = tipo === 'receber' ? '#16a34a' : '#dc2626'

  return (
    <main style={{ padding: 40, maxWidth: 500 }}>
      <h1 style={{ marginBottom: 24 }}>Novo Lancamento</h1>
      <div style={{ display: 'flex', gap: 8, marginBottom: 20 }}>
        <button onClick={() => setTipo('receber')} style={{ flex: 1, padding: 12, background: tipo === 'receber' ? '#16a34a' : '#e5e7eb', color: tipo === 'receber' ? 'white' : 'black', border: 'none', borderRadius: 6, fontSize: 15, cursor: 'pointer' }}>
          A Receber
        </button>
        <button onClick={() => setTipo('pagar')} style={{ flex: 1, padding: 12, background: tipo === 'pagar' ? '#dc2626' : '#e5e7eb', color: tipo === 'pagar' ? 'white' : 'black', border: 'none', borderRadius: 6, fontSize: 15, cursor: 'pointer' }}>
          A Pagar
        </button>
      </div>
      <input placeholder="Descricao" value={descricao} onChange={e => setDescricao(e.target.value)} style={{ display: 'block', width: '100%', padding: 10, marginBottom: 12, fontSize: 16, borderRadius: 6, border: '1px solid #ccc' }} />
      <input type="number" placeholder="Valor" value={valor} onChange={e => setValor(e.target.value)} style={{ display: 'block', width: '100%', padding: 10, marginBottom: 12, fontSize: 16, borderRadius: 6, border: '1px solid #ccc' }} />
      <input type="date" value={data} onChange={e => setData(e.target.value)} style={{ display: 'block', width: '100%', padding: 10, marginBottom: 20, fontSize: 16, borderRadius: 6, border: '1px solid #ccc' }} />
      <button onClick={salvar} style={{ width: '100%', padding: 14, background: cor, color: 'white', fontSize: 16, border: 'none', borderRadius: 6, cursor: 'pointer' }}>
        Salvar
      </button>
      {mensagem && <p style={{ marginTop: 16 }}>{mensagem}</p>}
      <a href="/" style={{ display: 'block', marginTop: 20, color: '#6b7280', textDecoration: 'none' }}>Voltar</a>
    </main>
  )
}