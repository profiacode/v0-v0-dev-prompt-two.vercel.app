import { createServerSupabaseClient, getClientSupabaseInstance } from "./supabase"

export type CaseStatus = "em_analise" | "aguardando_documento" | "em_andamento" | "finalizado"

export type Case = {
  id: string
  title: string
  description: string
  status: CaseStatus
  date: string
  client_id: string
  lawyer_id?: string
  type: string
  details?: string
  updates?: number
}

// Função para obter todos os casos de um cliente
export async function getClientCases(clientId: string) {
  const supabase = getClientSupabaseInstance()

  const { data, error } = await supabase
    .from("cases")
    .select(`
      *,
      lawyers:lawyer_id (name)
    `)
    .eq("client_id", clientId)
    .order("date", { ascending: false })

  if (error) throw error

  return data
}

// Função para obter um caso específico
export async function getCase(caseId: string) {
  const supabase = getClientSupabaseInstance()

  const { data, error } = await supabase
    .from("cases")
    .select(`
      *,
      lawyers:lawyer_id (name),
      clients:client_id (name, email)
    `)
    .eq("id", caseId)
    .single()

  if (error) throw error

  return data
}

// Função para criar um novo caso
export async function createCase(caseData: Omit<Case, "id">) {
  const supabase = getClientSupabaseInstance()

  const { data, error } = await supabase.from("cases").insert(caseData).select().single()

  if (error) throw error

  return data
}

// Função para atualizar um caso
export async function updateCase(caseId: string, caseData: Partial<Case>) {
  const supabase = getClientSupabaseInstance()

  const { data, error } = await supabase.from("cases").update(caseData).eq("id", caseId).select().single()

  if (error) throw error

  return data
}

// Função para obter todos os casos (para admin)
export async function getAllCases() {
  const supabase = createServerSupabaseClient()

  const { data, error } = await supabase
    .from("cases")
    .select(`
      *,
      lawyers:lawyer_id (name),
      clients:client_id (name, email)
    `)
    .order("date", { ascending: false })

  if (error) throw error

  return data
}
