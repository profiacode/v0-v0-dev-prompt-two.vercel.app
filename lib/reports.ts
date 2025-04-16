import { createServerSupabaseClient } from "./supabase"

// Função para obter estatísticas gerais
export async function getGeneralStats() {
  const supabase = createServerSupabaseClient()

  // Total de clientes
  const { count: clientCount, error: clientError } = await supabase
    .from("profiles")
    .select("*", { count: "exact", head: true })
    .eq("role", "client")

  if (clientError) throw clientError

  // Total de casos ativos
  const { count: activeCasesCount, error: casesError } = await supabase
    .from("cases")
    .select("*", { count: "exact", head: true })
    .neq("status", "finalizado")

  if (casesError) throw casesError

  // Casos finalizados este mês
  const startOfMonth = new Date()
  startOfMonth.setDate(1)
  startOfMonth.setHours(0, 0, 0, 0)

  const { count: finishedThisMonth, error: finishedError } = await supabase
    .from("cases")
    .select("*", { count: "exact", head: true })
    .eq("status", "finalizado")
    .gte("updated_at", startOfMonth.toISOString())

  if (finishedError) throw finishedError

  // Novos clientes este mês
  const { count: newClientsThisMonth, error: newClientsError } = await supabase
    .from("profiles")
    .select("*", { count: "exact", head: true })
    .eq("role", "client")
    .gte("created_at", startOfMonth.toISOString())

  if (newClientsError) throw newClientsError

  return {
    totalClients: clientCount,
    activeCases: activeCasesCount,
    finishedThisMonth: finishedThisMonth || 0,
    newClientsThisMonth: newClientsThisMonth || 0,
  }
}

// Função para obter dados para o gráfico de casos por status
export async function getCasesByStatusChart() {
  const supabase = createServerSupabaseClient()

  const { data, error } = await supabase.from("cases").select("status")

  if (error) throw error

  const statusCounts = {
    em_analise: 0,
    aguardando_documento: 0,
    em_andamento: 0,
    finalizado: 0,
  }

  data.forEach((item) => {
    if (statusCounts[item.status as keyof typeof statusCounts] !== undefined) {
      statusCounts[item.status as keyof typeof statusCounts]++
    }
  })

  return statusCounts
}

// Função para obter dados para o gráfico de novos casos por mês
export async function getNewCasesByMonthChart() {
  const supabase = createServerSupabaseClient()

  // Obter os últimos 6 meses
  const months = []
  const today = new Date()

  for (let i = 5; i >= 0; i--) {
    const month = new Date(today.getFullYear(), today.getMonth() - i, 1)
    months.push({
      month: month.toLocaleString("default", { month: "long" }),
      year: month.getFullYear(),
      startDate: new Date(month.getFullYear(), month.getMonth(), 1).toISOString(),
      endDate: new Date(month.getFullYear(), month.getMonth() + 1, 0).toISOString(),
    })
  }

  // Consultar casos para cada mês
  const result = []

  for (const monthData of months) {
    const { count, error } = await supabase
      .from("cases")
      .select("*", { count: "exact", head: true })
      .gte("created_at", monthData.startDate)
      .lte("created_at", monthData.endDate)

    if (error) throw error

    result.push({
      month: monthData.month,
      count: count || 0,
    })
  }

  return result
}
