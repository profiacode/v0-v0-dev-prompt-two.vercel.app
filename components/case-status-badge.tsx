import { Badge } from "@/components/ui/badge"

interface CaseStatusBadgeProps {
  status: string
}

export function CaseStatusBadge({ status }: CaseStatusBadgeProps) {
  switch (status) {
    case "em_analise":
      return (
        <Badge variant="outline" className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100 border-yellow-200">
          Em análise
        </Badge>
      )
    case "aguardando_documento":
      return (
        <Badge variant="outline" className="bg-orange-100 text-orange-800 hover:bg-orange-100 border-orange-200">
          Aguardando documento
        </Badge>
      )
    case "em_andamento":
      return (
        <Badge variant="outline" className="bg-blue-100 text-blue-800 hover:bg-blue-100 border-blue-200">
          Em andamento
        </Badge>
      )
    case "finalizado":
      return (
        <Badge variant="outline" className="bg-green-100 text-green-800 hover:bg-green-100 border-green-200">
          Finalizado
        </Badge>
      )
    default:
      return <Badge variant="outline">{status}</Badge>
  }
}
