'use client'
import { useState } from 'react'
import { supabase } from './lib/supabase'

export default function Home() {
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [mensagem, setMensagem] = useState('')
  const [logado, setLogado] = useState(false)

  async function entrar() {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password: senha,
    })
    if (error) setMensagem('❌ ' + error.message)
    else setLogado(true)
  }

  async function cadastrar() {
    const { error } = await supabase.auth.signUp({
      email,
      password: senha,
    })
    if (error) setMensagem('❌ ' + error.message)
    else setMensagem('✅ Verifique seu email para confirmar o cadastro!')
  }

  if (logado) return (
    <main style={{ padding: 40, fontSize: 24 }}>
      ✅ Bem-vindo! Você está logado.
    </main>
  )

  return (
    <main style={{ padding: 40, maxWidth: 400 }}>
      <h1 style={{ marginBottom: 24 }}>Financial LAC</h1>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        style={{ display: 'block', width: '100%', padding: 10, marginBottom: 12, fontSize: 16 }}
      />
      <input
        type="password"
        placeholder="Senha"
        value={senha}
        onChange={e => setSenha(e.target.value)}
        style={{ display: 'block', width: '100%', padding: 10, marginBottom: 12, fontSize: 16 }}
      />
      <button
        onClick={entrar}
        style={{ width: '100%', padding: 12, background: '#16a34a', color: 'white', fontSize: 16, border: 'none', borderRadius: 6, marginBottom: 8, cursor: 'pointer' }}
      >
        Entrar
      </button>
      <button
        onClick={cadastrar}
        style={{ width: '100%', padding: 12, background: '#2563eb', color: 'white', fontSize: 16, border: 'none', borderRadius: 6, cursor: 'pointer' }}
      >
        Criar conta
      </button>
      {mensagem && <p style={{ marginTop: 16 }}>{mensagem}</p>}
    </main>
  )
}