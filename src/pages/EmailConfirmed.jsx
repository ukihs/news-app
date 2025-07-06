// pages/EmailConfirmed.jsx
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../utils/supabaseClient'

export default function EmailConfirmed() {
  const nav = useNavigate()

  useEffect(() => {
    
    supabase.auth
      .getSessionFromUrl({ storeSession: true })   
      .then(() => nav('/dashboard', { replace: true })) 
      .catch(() => nav('/login', { replace: true }))
  }, [])

  return (
    <div className="flex flex-col items-center mt-20">
      <h1 className="text-2xl font-bold">ยืนยันอีเมลสำเร็จ 🎉</h1>
      <p className="mt-2">กำลังพาไปหน้าแอป…</p>
    </div>
  )
}
