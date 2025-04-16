"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DashboardShell } from "@/components/dashboard-shell"
import { PlusIcon, ClockIcon, CheckCircleIcon, AlertCircleIcon } from "lucide-react"
import { CaseStatusBadge } from "@/components/case-status-badge"
import { NewCaseDialog } from "@/components/new-case-dialog"

// Dados de exemplo para demonstração
const mockCases = [
  {
    id: "1",
    title: "Revisão de Contrato de Aluguel",
    description: "Análise e revisão de contrato de locação residencial",
    status: "em_analise",
    date: "2023-04-10T10:30:00",
    updates: 2,
  },
  {
    id: "2",
    title: "Processo Trabalhista",
    description: "Ação de reclamação trabalhista contra ex-empregador",
    status: "aguardando_documento",
    date: "2023-03-25T14:15:00",
    updates: 5,
  },
  {
    id: "3",
    title: "Defesa em Processo de Cobrança",
    description: "Contestação de cobrança indevida de serviço não contratado",
    status: "em_andamento",
    date: "2023-04-05T09:00:00",
    updates: 3,
  },
  {
    id: "4",
    title: "Consultoria Tributária",
    description: "Análise de tributação para abertura de empresa",
    status: "finalizado",
    date: "2023-02-15T16:45:00",
    updates: 4,
  },
]

const notifications = [
  {
    id: "1",
    message: "Seu advogado respondeu ao caso 'Revisão de Contrato de Aluguel'",
    date: "2023-04-12T11:30:00",
    read: false,
  },
  {
    id: "2",
    message: "Novo documento adicionado ao caso 'Processo Trabalhista'",
    date: "2023-04-11T09:15:00",
    read: false,
  },
  {
    id: "3",
    message: "Seu caso 'Consultoria Tributária' foi finalizado",
    date: "2023-04-10T14:45:00",
    read: true,
  },
]

export default function DashboardPage() {
  const [isNewCaseOpen, setIsNewCaseOpen] = useState(false)

  return (
    <DashboardShell>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">Gerencie seus casos e solicitações jurídicas</p>
        </div>
        <Button onClick={() => setIsNewCaseOpen(true)}>
          <PlusIcon className="mr-2 h-4 w-4" />
          Nova Solicitação
        </Button>
      </div>

      <Tabs defaultValue="cases" className="mt-6">
        <TabsList>
          <TabsTrigger value="cases">Meus Casos</TabsTrigger>
          <TabsTrigger value="notifications">
            Notificações
            <Badge variant="secondary" className="ml-2">
              {notifications.filter((n) => !n.read).length}
            </Badge>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="cases" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {mockCases.map((caseItem) => (
              <Card key={caseItem.id}>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-lg">{caseItem.title}</CardTitle>
                    <CaseStatusBadge status={caseItem.status} />
                  </div>
                  <CardDescription>{caseItem.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-sm text-muted-foreground flex items-center">
                    <ClockIcon className="mr-1 h-4 w-4" />
                    {new Date(caseItem.date).toLocaleDateString("pt-BR", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                    })}
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

        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Notificações recentes</CardTitle>
              <CardDescription>Atualizações sobre seus casos e solicitações</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`flex items-start gap-4 rounded-lg border p-4 ${notification.read ? "bg-background" : "bg-muted"}`}
                  >
                    <div className={`mt-0.5 ${notification.read ? "text-muted-foreground" : "text-primary"}`}>
                      {notification.read ? (
                        <CheckCircleIcon className="h-5 w-5" />
                      ) : (
                        <AlertCircleIcon className="h-5 w-5" />
                      )}
                    </div>
                    <div className="flex-1 space-y-1">
                      <p
                        className={`text-sm font-medium leading-none ${notification.read ? "text-muted-foreground" : ""}`}
                      >
                        {notification.message}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {new Date(notification.date).toLocaleDateString("pt-BR", {
                          day: "2-digit",
                          month: "2-digit",
                          year: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                    </div>
                    {!notification.read && (
                      <Button variant="ghost" size="sm">
                        Marcar como lida
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <NewCaseDialog open={isNewCaseOpen} onOpenChange={setIsNewCaseOpen} />
    </DashboardShell>
  )
}
