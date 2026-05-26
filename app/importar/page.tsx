'use client'
import { useState } from 'react'
import * as XLSX from 'xlsx'
import { supabase } from '../lib/supabase'

export default function Importar() {
  const [mensagem, setMensagem] = useState('')
  const [carregando, setCarregando] = useState(false)
  const [preview, setPreview] = useState<any[]>([])

  async function handleArquivo(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = async (evt) => {
      const data = evt.target?.result
      const workbook = XLSX.read(data, { type: 'binary' })
      const sheet = workbook.Sheets[workbook.SheetNames[0]]
      const rows: any[] = XLSX.utils.sheet_to_json(sheet)
      setPreview(rows.slice(0, 3))
    }
    reader.readAsBinaryString(file)
  }

  async function importar(tabela: string, e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    setCarregando(true)
    setMensagem('')

    const reader = new FileReader()
    reader.onload = async (evt) => {
      const data = evt.target?.result
      const workbook = XLSX.read(data, { type: 'binary' })
      const sheet = workbook.Sheets[workbook.SheetNames[0]]
      const rows: any[] = XLSX.utils.sheet_to_json(sheet)

      const { error } = await supabase.from(tabela).insert(rows)

      if (error) setMensagem('Erro: ' + error.message)
      else setMensagem(`${rows.length} registros importados com sucesso!`)
      setCarregando(false)
    }
    reader.readAsBinaryString(file)
  }

  return (
    <main style={{ padding: 40, maxWidth: 600 }}>
      <h1 style={{ marginBottom: 8 }}>Importar Planilha Excel</h1>
      <p style={{ color: '#6b7280', marginBottom: 32 }}>
        Importe seus dados direto do Excel para o banco de dados.
      </p>

      <div style={{ marginBottom: 32, padding: 24, border: '1px solid #e5e7eb', borderRadius: 8 }}>
        <h2 style={{ marginBottom: 8, fontSize: 18 }}>Contas a Receber</h2>
        <p style={{ color: '#6b7280', fontSize: 14, marginBottom: 12 }}>
          Colunas esperadas: cliente, valor, vencimento, status
        </p>
        <input
          type="file"
          accept=".xlsx,.xls"
          onChange={(e) => importar('contas_receber', e)}
          style={{ display: 'block', marginBottom: 8 }}
        />
      </div>

      <div style={{ marginBottom: 32, padding: 24, border: '1px solid #e5e7eb', borderRadius: 8 }}>
        <h2 style={{ marginBottom: 8, fontSize: 18 }}>Contas a Pagar</h2>
        <p style={{ color: '#6b7280', fontSize: 14, marginBottom: 12 }}>
          Colunas esperadas: cliente, valor, vencimento, status
        </p>
        <input
          type="file"
          accept=".xlsx,.xls"
          onChange={(e) => importar('contas_pagar', e)}
          style={{ display: 'block', marginBottom: 8 }}
        />
      </div>

      {carregando && <p style={{ color: '#2563eb' }}>Importando...</p>}
      {mensagem && (
        <p style={{ marginTop: 16, fontSize: 16, color: mensagem.includes('Erro') ? '#dc2626' : '#16a34a' }}>
          {mensagem}
        </p>
      )}

      <a href="/dashboard" style={{ display: 'block', marginTop: 24, color: '#6b7280', textDecoration: 'none' }}>
        Ver Dashboard
      </a>
      <a href="/" style={{ display: 'block', marginTop: 8, color: '#6b7280', textDecoration: 'none' }}>
        Voltar
      </a>
    </main>
  )
}