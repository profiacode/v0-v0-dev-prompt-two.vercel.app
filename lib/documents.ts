import { getClientSupabaseInstance } from "./supabase"

export type Document = {
  id: string
  case_id: string
  name: string
  file_path: string
  uploaded_by: string
  date: string
}

// Função para obter documentos de um caso
export async function getCaseDocuments(caseId: string) {
  const supabase = getClientSupabaseInstance()

  const { data, error } = await supabase
    .from("documents")
    .select(`
      *,
      uploaders:uploaded_by (name)
    `)
    .eq("case_id", caseId)
    .order("date", { ascending: false })

  if (error) throw error

  return data
}

// Função para fazer upload de um documento
export async function uploadDocument(file: File, caseId: string, userId: string) {
  const supabase = getClientSupabaseInstance()

  // Upload do arquivo para o storage
  const fileName = `${caseId}/${Date.now()}_${file.name}`
  const { data: fileData, error: fileError } = await supabase.storage.from("documents").upload(fileName, file)

  if (fileError) throw fileError

  // Criar registro na tabela de documentos
  const { data: docData, error: docError } = await supabase
    .from("documents")
    .insert({
      case_id: caseId,
      name: file.name,
      file_path: fileData.path,
      uploaded_by: userId,
      date: new Date().toISOString(),
    })
    .select()
    .single()

  if (docError) throw docError

  return docData
}

// Função para obter URL de download de um documento
export async function getDocumentUrl(filePath: string) {
  const supabase = getClientSupabaseInstance()

  const { data, error } = await supabase.storage.from("documents").getPublicUrl(filePath)

  if (error) throw error

  return data.publicUrl
}
