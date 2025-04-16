import { createServerSupabaseClient } from "./supabase"
import type { UserData } from "./auth"

// Função para obter todos os clientes (para admin)
export async function getAllClients() {
  const supabase = createServerSupabaseClient()

  const { data, error } = await supabase.from("profiles").select("*").eq("role", "client").order("name")

  if (error) throw error

  return data as UserData[]
}

// Função para obter um cliente específico
export async function getClient(clientId: string) {
  const supabase = createServerSupabaseClient()

  const { data, error } = await supabase.from("profiles").select("*").eq("id", clientId).single()

  if (error) throw error

  return data as UserData
}

// Função para criar um novo cliente (para admin)
export async function createClient(clientData: Omit<UserData, "id">, password: string) {
  const supabase = createServerSupabaseClient()

  // Criar usuário no Auth
  const { data: authData, error: authError } = await supabase.auth.admin.createUser({
    email: clientData.email,
    password,
    email_confirm: true,
    user_metadata: {
      name: clientData.name,
      role: "client",
    },
  })

  if (authError) throw authError

  if (!authData.user) throw new Error("Falha ao criar usuário")

  // Criar perfil
  const { data: profileData, error: profileError } = await supabase
    .from("profiles")
    .insert({
      id: authData.user.id,
      ...clientData,
      role: "client",
    })
    .select()
    .single()

  if (profileError) throw profileError

  return profileData
}
