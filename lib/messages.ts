import { getClientSupabaseInstance } from "./supabase"

export type Message = {
  id: string
  case_id: string
  sender_id: string
  content: string
  date: string
  is_read: boolean
}

// Função para obter mensagens de um caso
export async function getCaseMessages(caseId: string) {
  const supabase = getClientSupabaseInstance()

  const { data, error } = await supabase
    .from("messages")
    .select(`
      *,
      senders:sender_id (name, role)
    `)
    .eq("case_id", caseId)
    .order("date", { ascending: true })

  if (error) throw error

  return data
}

// Função para enviar uma mensagem
export async function sendMessage(messageData: Omit<Message, "id" | "date" | "is_read">) {
  const supabase = getClientSupabaseInstance()

  const { data, error } = await supabase
    .from("messages")
    .insert({
      ...messageData,
      date: new Date().toISOString(),
      is_read: false,
    })
    .select()
    .single()

  if (error) throw error

  return data
}

// Função para marcar mensagem como lida
export async function markMessageAsRead(messageId: string) {
  const supabase = getClientSupabaseInstance()

  const { data, error } = await supabase
    .from("messages")
    .update({ is_read: true })
    .eq("id", messageId)
    .select()
    .single()

  if (error) throw error

  return data
}

// Função para obter mensagens não lidas
export async function getUnreadMessages(userId: string) {
  const supabase = getClientSupabaseInstance()

  const { data, error } = await supabase
    .from("messages")
    .select(`
      *,
      cases:case_id (title),
      senders:sender_id (name, role)
    `)
    .eq("recipient_id", userId)
    .eq("is_read", false)
    .order("date", { ascending: false })

  if (error) throw error

  return data
}
