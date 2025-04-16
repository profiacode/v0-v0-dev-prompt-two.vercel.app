"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { AdminShell } from "@/components/admin-shell"
import { DataTable } from "@/components/data-table"
import { BarChart, LineChart } from "@/components/charts"
import { SearchIcon, UserPlusIcon, UsersIcon, FileTextIcon, ClockIcon } from "lucide-react"

// Dados de exemplo para demonstração
const mockClients = [
  {
    id: "1",
    name: "João Silva",
    email: "joao.silva@exemplo.com",
    cpf: "123.456.789-00",
    phone: "(11) 98765-4321",
    cases: 3,
    lastActivity: "2023-04-10T10:30:00",
  },
  {
    id: "2",
    name: "Maria Oliveira",
    email: "maria.oliveira@exemplo.com",
    cpf: "987.654.321-00",
    phone: "(11) 91234-5678",
    cases: 1,
    lastActivity: "2023-04-08T14:15:00",
  },
  {
    id: "3",
    name: "Pedro Santos",
    email: "pedro.santos@exemplo.com",
    cpf: "456.789.123-00",
    phone: "(11) 99876-5432",
    cases: 2,
    lastActivity: "2023-04-12T09:00:00",
  },
  {
    id: "4",
    name: "Ana Costa",
    email: "ana.costa@exemplo.com",
    cpf: "789.123.456-00",
    phone: "(11) 95678-1234",
    cases: 4,
    lastActivity: "2023-04-11T16:45:00",
  },
]

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
]

// Colunas para a tabela de clientes
const clientColumns = [
  {
    accessorKey: "name",
    header: "Nome",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "cpf",
    header: "CPF",
  },
  {
    accessorKey: "phone",
    header: "Telefone",
  },
  {
    accessorKey: "cases",
    header: "Casos",
  },
  {
    accessorKey: "lastActivity",
    header: "Última Atividade",
    cell: ({ row }) => {
      return new Date(row.getValue("lastActivity")).toLocaleDateString("pt-BR")
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const client = row.original
      return (
        <Button variant="ghost" size="sm" asChild>
          <Link href={`/admin/clients/${client.id}`}>Ver detalhes</Link>
        </Button>
      )
    },
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
          <Link href={`/admin/cases/${caseItem.id}`}>Ver detalhes</Link>
        </Button>
      )
    },
  },
]

export default function AdminDashboardPage() {
  const [searchTerm, setSearchTerm] = useState("")

  // Estatísticas para o dashboard
  const stats = [
    {
      title: "Total de Clientes",
      value: "124",
      icon: UsersIcon,
      description: "+12% em relação ao mês anterior",
    },
    {
      title: "Casos Ativos",
      value: "87",
      icon: FileTextIcon,
      description: "23 casos finalizados este mês",
    },
    {
      title: "Tempo Médio de Resposta",
      value: "1.2 dias",
      icon: ClockIcon,
      description: "-0.3 dias em relação ao mês anterior",
    },
    {
      title: "Novos Clientes",
      value: "18",
      icon: UserPlusIcon,
      description: "Este mês",
    },
  ]

  return (
    <AdminShell>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Painel Administrativo</h1>
          <p className="text-muted-foreground">Gerencie clientes, casos e acompanhe métricas</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative">
            <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Buscar..."
              className="w-[200px] pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Select defaultValue="all">
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
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mt-6">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">{stat.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2 mt-6">
        <Card>
          <CardHeader>
            <CardTitle>Casos por Status</CardTitle>
            <CardDescription>Distribuição dos casos por status atual</CardDescription>
          </CardHeader>
          <CardContent>
            <BarChart />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Novos Casos</CardTitle>
            <CardDescription>Número de novos casos nos últimos 6 meses</CardDescription>
          </CardHeader>
          <CardContent>
            <LineChart />
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="cases" className="mt-6">
        <TabsList>
          <TabsTrigger value="cases">Casos</TabsTrigger>
          <TabsTrigger value="clients">Clientes</TabsTrigger>
        </TabsList>

        <TabsContent value="cases" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Casos Recentes</CardTitle>
              <CardDescription>Lista de todos os casos jurídicos em andamento</CardDescription>
            </CardHeader>
            <CardContent>
              <DataTable columns={caseColumns} data={mockCases} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="clients" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Clientes</CardTitle>
              <CardDescription>Lista de todos os clientes cadastrados</CardDescription>
            </CardHeader>
            <CardContent>
              <DataTable columns={clientColumns} data={mockClients} />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </AdminShell>
  )
}
