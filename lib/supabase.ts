import { createClient } from "@supabase/supabase-js"

// Criando o cliente Supabase para uso no lado do servidor
export const createServerSupabaseClient = () => {
  const supabaseUrl = process.env.SUPABASE_URL!
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!
  return createClient(supabaseUrl, supabaseKey)
}

// Criando o cliente Supabase para uso no lado do cliente
// Usando padrão singleton para evitar múltiplas instâncias
let clientSupabaseInstance: ReturnType<typeof createClientSupabaseClient> | null = null

function createClientSupabaseClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  return createClient(supabaseUrl, supabaseAnonKey)
}

export function getClientSupabaseInstance() {
  if (!clientSupabaseInstance) {
    clientSupabaseInstance = createClientSupabaseClient()
  }
  return clientSupabaseInstance
}
