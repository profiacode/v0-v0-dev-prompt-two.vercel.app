"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DashboardShell } from "@/components/dashboard-shell"
import { CaseStatusBadge } from "@/components/case-status-badge"
import { SearchIcon, ClockIcon, FileTextIcon } from "lucide-react"

// Dados de exemplo para demonstração
const mockCases = [
  {
    id: "1",
    title: "Revisão de Contrato de Aluguel",
    description: "Análise e revisão de contrato de locação residencial",
    status: "em_analise",
    date: "2023-04-10T10:30:00",
    updates: 2,
    type: "Consultoria",
    lawyer: "Dr. Carlos Mendes",
  },
  {
    id: "2",
    title: "Processo Trabalhista",
    description: "Ação de reclamação trabalhista contra ex-empregador",
    status: "aguardando_documento",
    date: "2023-03-25T14:15:00",
    updates: 5,
    type: "Contencioso",
    lawyer: "Dra. Fernanda Lima",
  },
  {
    id: "3",
    title: "Defesa em Processo de Cobrança",
    description: "Contestação de cobrança indevida de serviço não contratado",
    status: "em_andamento",
    date: "2023-04-05T09:00:00",
    updates: 3,
    type: "Contencioso",
    lawyer: "Dr. Carlos Mendes",
  },
  {
    id: "4",
    title: "Consultoria Tributária",
    description: "Análise de tributação para abertura de empresa",
    status: "finalizado",
    date: "2023-02-15T16:45:00",
    updates: 4,
    type: "Consultoria",
    lawyer: "Dra. Fernanda Lima",
  },
  {
    id: "5",
    title: "Ação de Despejo",
    description: "Processo de despejo por falta de pagamento",
    status: "em_andamento",
    date: "2023-03-18T11:20:00",
    updates: 2,
    type: "Contencioso",
    lawyer: "Dr. Carlos Mendes",
  },
  {
    id: "6",
    title: "Análise de Contrato Empresarial",
    description: "Revisão de contrato de prestação de serviços",
    status: "aguardando_documento",
    date: "2023-04-02T09:45:00",
    updates: 1,
    type: "Consultoria",
    lawyer: "Dra. Fernanda Lima",
  },
]

export default function CasesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [typeFilter, setTypeFilter] = useState("all")

  // Filtrar casos com base nos filtros selecionados
  const filteredCases = mockCases
    .filter((caseItem) => statusFilter === "all" || caseItem.status === statusFilter)
    .filter((caseItem) => typeFilter === "all" || caseItem.type === typeFilter)
    .filter(
      (caseItem) =>
        searchTerm === "" ||
        caseItem.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        caseItem.description.toLowerCase().includes(searchTerm.toLowerCase()),
    )

  return (
    <DashboardShell>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Meus Casos</h1>
          <p className="text-muted-foreground">Acompanhe o andamento de todos os seus casos jurídicos</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-2">
          <div className="relative">
            <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Buscar caso..."
              className="pl-8 w-full sm:w-[200px]"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos os status</SelectItem>
              <SelectItem value="em_analise">Em análise</SelectItem>
              <SelectItem value="aguardando_documento">Aguardando documento</SelectItem>
              <SelectItem value="em_andamento">Em andamento</SelectItem>
              <SelectItem value="finalizado">Finalizado</SelectItem>
            </SelectContent>
          </Select>
          <Select value={typeFilter} onValueChange={setTypeFilter}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Tipo" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos os tipos</SelectItem>
              <SelectItem value="Consultoria">Consultoria</SelectItem>
              <SelectItem value="Contencioso">Contencioso</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Tabs defaultValue="all" className="mt-6">
        <TabsList className="mb-4">
          <TabsTrigger value="all">Todos</TabsTrigger>
          <TabsTrigger value="active">Em andamento</TabsTrigger>
          <TabsTrigger value="finished">Finalizados</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          {filteredCases.length === 0 ? (
            <div className="text-center py-12">
              <FileTextIcon className="mx-auto h-12 w-12 text-muted-foreground/50" />
              <h3 className="mt-4 text-lg font-semibold">Nenhum caso encontrado</h3>
              <p className="text-muted-foreground">Não encontramos casos que correspondam aos filtros selecionados.</p>
            </div>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {filteredCases.map((caseItem) => (
                <Card key={caseItem.id}>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-lg">{caseItem.title}</CardTitle>
                      <CaseStatusBadge status={caseItem.status} />
                    </div>
                    <CardDescription>{caseItem.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div className="flex items-center text-muted-foreground">
                        <ClockIcon className="mr-1 h-4 w-4" />
                        {new Date(caseItem.date).toLocaleDateString("pt-BR")}
                      </div>
                      <div className="text-muted-foreground text-right">{caseItem.type}</div>
                      <div className="text-muted-foreground col-span-2">Advogado: {caseItem.lawyer}</div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <div className="text-sm text-muted-foreground">{caseItem.updates} atualizações</div>
                    <Button variant="outline" size="sm" asChild>
                      <Link href={`/dashboard/cases/${caseItem.id}`}>Ver detalhes</Link>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="active" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredCases
              .filter((caseItem) => caseItem.status !== "finalizado")
              .map((caseItem) => (
                <Card key={caseItem.id}>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-lg">{caseItem.title}</CardTitle>
                      <CaseStatusBadge status={caseItem.status} />
                    </div>
                    <CardDescription>{caseItem.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div className="flex items-center text-muted-foreground">
                        <ClockIcon className="mr-1 h-4 w-4" />
                        {new Date(caseItem.date).toLocaleDateString("pt-BR")}
                      </div>
                      <div className="text-muted-foreground text-right">{caseItem.type}</div>
                      <div className="text-muted-foreground col-span-2">Advogado: {caseItem.lawyer}</div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <div className="text-sm text-muted-foreground">{caseItem.updates} atualizações</div>
                    <Button variant="outline" size="sm" asChild>
                      <Link href={`/dashboard/cases/${caseItem.id}`}>Ver detalhes</Link>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
          </div>
        </TabsContent>

        <TabsContent value="finished" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredCases
              .filter((caseItem) => caseItem.status === "finalizado")
              .map((caseItem) => (
                <Card key={caseItem.id}>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-lg">{caseItem.title}</CardTitle>
                      <CaseStatusBadge status={caseItem.status} />
                    </div>
                    <CardDescription>{caseItem.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div className="flex items-center text-muted-foreground">
                        <ClockIcon className="mr-1 h-4 w-4" />
                        {new Date(caseItem.date).toLocaleDateString("pt-BR")}
                      </div>
                      <div className="text-muted-foreground text-right">{caseItem.type}</div>
                      <div className="text-muted-foreground col-span-2">Advogado: {caseItem.lawyer}</div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <div className="text-sm text-muted-foreground">{caseItem.updates} atualizações</div>
                    <Button variant="outline" size="sm" asChild>
                      <Link href={`/dashboard/cases/${caseItem.id}`}>Ver detalhes</Link>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
          </div>
        </TabsContent>
      </Tabs>
    </DashboardShell>
  )
}
