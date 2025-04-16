import { getClientSupabaseInstance } from "./supabase"

export type UserData = {
  id: string
  email: string
  name: string
  cpf?: string
  phone?: string
  role?: "client" | "admin" | "lawyer"
}

// Função para registrar um novo usuário
export async function registerUser(email: string, password: string, userData: Omit<UserData, "id">) {
  const supabase = getClientSupabaseInstance()

  // Registrar o usuário com Supabase Auth
  const { data: authData, error: authError } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        name: userData.name,
        role: userData.role || "client",
      },
    },
  })

  if (authError) throw authError

  // Se o registro for bem-sucedido, adicionar dados adicionais à tabela de perfis
  if (authData.user) {
    const { error: profileError } = await supabase.from("profiles").insert({
      id: authData.user.id,
      email,
      name: userData.name,
      cpf: userData.cpf,
      phone: userData.phone,
      role: userData.role || "client",
    })

    if (profileError) throw profileError
  }

  return authData
}

// Função para fazer login
export async function loginUser(email: string, password: string) {
  const supabase = getClientSupabaseInstance()

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) throw error

  return data
}

// Função para fazer logout
export async function logoutUser() {
  const supabase = getClientSupabaseInstance()
  const { error } = await supabase.auth.signOut()

  if (error) throw error

  return true
}

// Função para obter o usuário atual
export async function getCurrentUser(): Promise<UserData | null> {
  const supabase = getClientSupabaseInstance()

  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (!session?.user) return null

  const { data, error } = await supabase.from("profiles").select("*").eq("id", session.user.id).single()

  if (error || !data) return null

  return data as UserData
}

// Função para verificar se o usuário é admin
export async function isAdmin() {
  const user = await getCurrentUser()
  return user?.role === "admin"
}
