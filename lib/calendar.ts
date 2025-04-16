import { getClientSupabaseInstance } from "./supabase"

export type Event = {
  id: string
  title: string
  description?: string
  date: string
  time: string
  type: "reuniao" | "audiencia" | "prazo" | "outro"
  client_id?: string
  lawyer_id: string
}

// Função para obter eventos de um advogado
export async function getLawyerEvents(lawyerId: string) {
  const supabase = getClientSupabaseInstance()

  const { data, error } = await supabase
    .from("events")
    .select(`
      *,
      clients:client_id (name)
    `)
    .eq("lawyer_id", lawyerId)
    .order("date", { ascending: true })

  if (error) throw error

  return data
}

// Função para criar um novo evento
export async function createEvent(eventData: Omit<Event, "id">) {
  const supabase = getClientSupabaseInstance()

  const { data, error } = await supabase.from("events").insert(eventData).select().single()

  if (error) throw error

  return data
}

// Função para atualizar um evento
export async function updateEvent(eventId: string, eventData: Partial<Event>) {
  const supabase = getClientSupabaseInstance()

  const { data, error } = await supabase.from("events").update(eventData).eq("id", eventId).select().single()

  if (error) throw error

  return data
}

// Função para excluir um evento
export async function deleteEvent(eventId: string) {
  const supabase = getClientSupabaseInstance()

  const { error } = await supabase.from("events").delete().eq("id", eventId)

  if (error) throw error

  return true
}
