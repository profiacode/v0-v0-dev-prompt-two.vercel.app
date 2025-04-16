"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { AdminShell } from "@/components/admin-shell"
import { DataTable } from "@/components/data-table"
import { SearchIcon, PlusIcon } from "lucide-react"

// Dados de exemplo para demonstração
const mockCases = [
  {
    id: "1",
    client: "João Silva",
    title: "Revisão de Contrato de Aluguel",
    type: "Consultoria",
    status: "em_analise",
    date: "2023-04-10T10:30:00",
    assignedTo: "Dr. Carlos Mendes",
  },
  {
    id: "2",
    client: "Maria Oliveira",
    title: "Processo Trabalhista",
    type: "Contencioso",
    status: "aguardando_documento",
    date: "2023-03-25T14:15:00",
    assignedTo: "Dra. Fernanda Lima",
  },
  {
    id: "3",
    client: "Pedro Santos",
    title: "Defesa em Processo de Cobrança",
    type: "Contencioso",
    status: "em_andamento",
    date: "2023-04-05T09:00:00",
    assignedTo: "Dr. Carlos Mendes",
  },
  {
    id: "4",
    client: "Ana Costa",
    title: "Consultoria Tributária",
    type: "Consultoria",
    status: "finalizado",
    date: "2023-02-15T16:45:00",
    assignedTo: "Dra. Fernanda Lima",
  },
  {
    id: "5",
    client: "Roberto Almeida",
    title: "Ação de Despejo",
    type: "Contencioso",
    status: "em_andamento",
    date: "2023-03-18T11:20:00",
    assignedTo: "Dr. Carlos Mendes",
  },
  {
    id: "6",
    client: "Fernanda Lima",
    title: "Análise de Contrato Empresarial",
    type: "Consultoria",
    status: "aguardando_documento",
    date: "2023-04-02T09:45:00",
    assignedTo: "Dra. Fernanda Lima",
  },
  {
    id: "7",
    client: "Marcelo Santos",
    title: "Ação de Indenização",
    type: "Contencioso",
    status: "em_analise",
    date: "2023-04-08T14:30:00",
    assignedTo: "Dr. Carlos Mendes",
  },
]

// Colunas para a tabela de casos
const caseColumns = [
  {
    accessorKey: "client",
    header: "Cliente",
  },
  {
    accessorKey: "title",
    header: "Título",
  },
  {
    accessorKey: "type",
    header: "Tipo",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status")
      return (
        <div className="flex items-center">
          <span
            className={`h-2 w-2 rounded-full mr-2 ${
              status === "em_analise"
                ? "bg-yellow-500"
                : status === "aguardando_documento"
                  ? "bg-orange-500"
                  : status === "em_andamento"
                    ? "bg-blue-500"
                    : status === "finalizado"
                      ? "bg-green-500"
                      : "bg-gray-500"
            }`}
          />
          {status === "em_analise"
            ? "Em análise"
            : status === "aguardando_documento"
              ? "Aguardando documento"
              : status === "em_andamento"
                ? "Em andamento"
                : status === "finalizado"
                  ? "Finalizado"
                  : status}
        </div>
      )
    },
  },
  {
    accessorKey: "date",
    header: "Data",
    cell: ({ row }) => {
      return new Date(row.getValue("date")).toLocaleDateString("pt-BR")
    },
  },
  {
    accessorKey: "assignedTo",
    header: "Responsável",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const caseItem = row.original
      return (
        <Button variant="ghost" size="sm" asChild>
          <a href={`/admin/cases/${caseItem.id}`}>Ver detalhes</a>
        </Button>
      )
    },
  },
]

export default function CasesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  // Filtrar casos com base no status selecionado
  const filteredCases =
    statusFilter === "all" ? mockCases : mockCases.filter((caseItem) => caseItem.status === statusFilter)

  return (
    <AdminShell>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Casos</h1>
          <p className="text-muted-foreground">Gerencie todos os casos jurídicos da plataforma</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative">
            <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Buscar caso..."
              className="w-[250px] pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filtrar por status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos os status</SelectItem>
              <SelectItem value="em_analise">Em análise</SelectItem>
              <SelectItem value="aguardando_documento">Aguardando documento</SelectItem>
              <SelectItem value="em_andamento">Em andamento</SelectItem>
              <SelectItem value="finalizado">Finalizado</SelectItem>
            </SelectContent>
          </Select>
          <Button asChild>
            <a href="/admin/cases/new">
              <PlusIcon className="mr-2 h-4 w-4" />
              Novo Caso
            </a>
          </Button>
        </div>
      </div>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Lista de Casos</CardTitle>
          <CardDescription>Visualize e gerencie todos os casos jurídicos em andamento</CardDescription>
        </CardHeader>
        <CardContent>
          <DataTable columns={caseColumns} data={filteredCases} searchColumn="title" />
        </CardContent>
      </Card>
    </AdminShell>
  )
}
