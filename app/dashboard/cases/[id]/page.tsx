"use client"

import { useState } from "react"
import { useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"
import { DashboardShell } from "@/components/dashboard-shell"
import { CaseStatusBadge } from "@/components/case-status-badge"
import { toast } from "@/components/ui/use-toast"
import { ArrowLeftIcon, FileTextIcon, PaperclipIcon, SendIcon, UploadIcon } from "lucide-react"
import Link from "next/link"

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
    details:
      "Contrato de locação residencial com cláusulas abusivas. Cliente solicita revisão completa e orientação sobre como proceder com o locador.",
    documents: [
      { id: "1", name: "Contrato de Locação.pdf", date: "2023-04-10T10:30:00" },
      { id: "2", name: "Comprovante de Pagamento.pdf", date: "2023-04-10T10:35:00" },
    ],
    messages: [
      {
        id: "1",
        sender: "Dr. Carlos Mendes",
        content:
          "Olá João, recebi seu caso e já iniciei a análise do contrato. Identifiquei algumas cláusulas que podem ser consideradas abusivas. Vou preparar um parecer detalhado.",
        date: "2023-04-11T14:30:00",
        isLawyer: true,
      },
      {
        id: "2",
        sender: "João Silva",
        content: "Obrigado, doutor. Aguardo o parecer para entender melhor a situação.",
        date: "2023-04-11T15:45:00",
        isLawyer: false,
      },
      {
        id: "3",
        sender: "Dr. Carlos Mendes",
        content:
          "João, preciso de mais informações sobre os pagamentos já realizados. Você poderia enviar os comprovantes dos últimos 3 meses?",
        date: "2023-04-12T09:15:00",
        isLawyer: true,
      },
    ],
    timeline: [
      {
        id: "1",
        title: "Caso aberto",
        description: "Solicitação de revisão de contrato recebida",
        date: "2023-04-10T10:30:00",
      },
      {
        id: "2",
        title: "Advogado designado",
        description: "Dr. Carlos Mendes foi designado para o caso",
        date: "2023-04-10T14:45:00",
      },
      {
        id: "3",
        title: "Análise iniciada",
        description: "Início da análise do contrato de locação",
        date: "2023-04-11T09:00:00",
      },
      {
        id: "4",
        title: "Documentos solicitados",
        description: "Solicitação de documentos adicionais",
        date: "2023-04-12T09:15:00",
      },
    ],
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
    details:
      "Cliente alega que trabalhou por 2 anos sem registro em carteira e com horas extras não pagas. Busca indenização e reconhecimento do vínculo empregatício.",
    documents: [
      { id: "1", name: "Carteira de Trabalho.pdf", date: "2023-03-25T14:15:00" },
      { id: "2", name: "Comprovantes de Pagamento.pdf", date: "2023-03-25T14:20:00" },
      { id: "3", name: "Mensagens com Supervisor.pdf", date: "2023-03-26T10:30:00" },
    ],
    messages: [
      {
        id: "1",
        sender: "Dra. Fernanda Lima",
        content:
          "Olá Maria, analisei sua documentação e temos um caso forte. Vamos precisar de testemunhas que possam confirmar seu horário de trabalho.",
        date: "2023-03-26T11:30:00",
        isLawyer: true,
      },
      {
        id: "2",
        sender: "Maria Oliveira",
        content: "Tenho dois colegas que podem testemunhar. Devo pedir que eles entrem em contato com você?",
        date: "2023-03-26T13:45:00",
        isLawyer: false,
      },
      {
        id: "3",
        sender: "Dra. Fernanda Lima",
        content:
          "Por favor, envie os contatos deles. Também precisamos dos contracheques ou qualquer comprovante de pagamento que você tenha guardado.",
        date: "2023-03-27T09:15:00",
        isLawyer: true,
      },
    ],
    timeline: [
      {
        id: "1",
        title: "Caso aberto",
        description: "Solicitação de ação trabalhista recebida",
        date: "2023-03-25T14:15:00",
      },
      {
        id: "2",
        title: "Advogada designada",
        description: "Dra. Fernanda Lima foi designada para o caso",
        date: "2023-03-25T16:30:00",
      },
      {
        id: "3",
        title: "Análise iniciada",
        description: "Início da análise da documentação trabalhista",
        date: "2023-03-26T09:00:00",
      },
      {
        id: "4",
        title: "Documentos solicitados",
        description: "Solicitação de comprovantes adicionais e contatos de testemunhas",
        date: "2023-03-27T09:15:00",
      },
      {
        id: "5",
        title: "Aguardando documentação",
        description: "Aguardando envio de documentos solicitados",
        date: "2023-03-27T09:20:00",
      },
    ],
  },
]

export default function CaseDetailPage() {
  const params = useParams()
  const caseId = params.id as string
  const [newMessage, setNewMessage] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  // Encontrar o caso pelo ID
  const caseItem = mockCases.find((c) => c.id === caseId)

  if (!caseItem) {
    return (
      <DashboardShell>
        <div className="flex flex-col items-center justify-center py-12">
          <FileTextIcon className="h-12 w-12 text-muted-foreground/50" />
          <h2 className="mt-4 text-lg font-semibold">Caso não encontrado</h2>
          <p className="text-muted-foreground">O caso que você está procurando não existe ou foi removido.</p>
          <Button variant="outline" className="mt-4" asChild>
            <Link href="/dashboard/cases">Voltar para Meus Casos</Link>
          </Button>
        </div>
      </DashboardShell>
    )
  }

  const handleSendMessage = async () => {
    if (!newMessage.trim()) return

    setIsLoading(true)

    try {
      // Simulação de envio - aqui você conectaria com sua API
      console.log({ caseId, message: newMessage })

      // Simular um atraso de rede
      await new Promise((resolve) => setTimeout(resolve, 1000))

      toast({
        title: "Mensagem enviada",
        description: "Sua mensagem foi enviada com sucesso.",
      })

      // Limpar o campo de mensagem
      setNewMessage("")
    } catch (error) {
      toast({
        title: "Erro ao enviar mensagem",
        description: "Ocorreu um erro ao enviar sua mensagem. Tente novamente.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <DashboardShell>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" asChild>
            <Link href="/dashboard/cases">
              <ArrowLeftIcon className="h-4 w-4" />
            </Link>
          </Button>
          <div>
            <h1 className="text-2xl font-bold tracking-tight">{caseItem.title}</h1>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span>Processo #{caseItem.id}</span>
              <span>•</span>
              <span>{caseItem.type}</span>
              <span>•</span>
              <span>{caseItem.lawyer}</span>
            </div>
          </div>
        </div>
        <CaseStatusBadge status={caseItem.status} />
      </div>

      <Tabs defaultValue="overview" className="mt-6">
        <TabsList className="mb-4">
          <TabsTrigger value="overview">Visão Geral</TabsTrigger>
          <TabsTrigger value="messages">Mensagens</TabsTrigger>
          <TabsTrigger value="documents">Documentos</TabsTrigger>
          <TabsTrigger value="timeline">Linha do Tempo</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Detalhes do Caso</CardTitle>
                <CardDescription>Informações detalhadas sobre o caso</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-medium">Descrição</h3>
                  <p className="text-sm text-muted-foreground">{caseItem.description}</p>
                </div>
                <Separator />
                <div>
                  <h3 className="font-medium">Detalhes</h3>
                  <p className="text-sm text-muted-foreground">{caseItem.details}</p>
                </div>
                <Separator />
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h3 className="font-medium">Data de Abertura</h3>
                    <p className="text-sm text-muted-foreground">
                      {new Date(caseItem.date).toLocaleDateString("pt-BR")}
                    </p>
                  </div>
                  <div>
                    <h3 className="font-medium">Tipo</h3>
                    <p className="text-sm text-muted-foreground">{caseItem.type}</p>
                  </div>
                  <div>
                    <h3 className="font-medium">Advogado Responsável</h3>
                    <p className="text-sm text-muted-foreground">{caseItem.lawyer}</p>
                  </div>
                  <div>
                    <h3 className="font-medium">Status</h3>
                    <div className="mt-1">
                      <CaseStatusBadge status={caseItem.status} />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Últimas Atualizações</CardTitle>
                <CardDescription>Atividades recentes neste caso</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {caseItem.timeline.slice(0, 3).map((item) => (
                    <div key={item.id} className="flex gap-4">
                      <div className="relative mt-1">
                        <div className="flex h-2 w-2 items-center justify-center rounded-full bg-primary ring-4 ring-background" />
                        {item.id !== caseItem.timeline[0].id && (
                          <div className="absolute top-0 bottom-0 left-1 -translate-x-1/2 w-[2px] bg-muted-foreground/20" />
                        )}
                      </div>
                      <div className="flex-1 space-y-1">
                        <p className="font-medium leading-none">{item.title}</p>
                        <p className="text-sm text-muted-foreground">{item.description}</p>
                        <p className="text-xs text-muted-foreground">
                          {new Date(item.date).toLocaleDateString("pt-BR", {
                            day: "2-digit",
                            month: "2-digit",
                            year: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" size="sm" className="w-full" asChild>
                  <Link href="#timeline" onClick={() => document.querySelector('[data-value="timeline"]')?.click()}>
                    Ver Linha do Tempo Completa
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="messages">
          <Card>
            <CardHeader>
              <CardTitle>Mensagens</CardTitle>
              <CardDescription>Comunicação com seu advogado</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 max-h-[400px] overflow-y-auto p-1">
                {caseItem.messages.map((message) => (
                  <div key={message.id} className={`flex ${message.isLawyer ? "justify-start" : "justify-end"}`}>
                    <div
                      className={`max-w-[80%] rounded-lg p-4 ${
                        message.isLawyer ? "bg-muted" : "bg-primary text-primary-foreground"
                      }`}
                    >
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-medium text-sm">{message.sender}</span>
                        <span className="text-xs opacity-70">
                          {new Date(message.date).toLocaleTimeString("pt-BR", {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </span>
                      </div>
                      <p className="text-sm">{message.content}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <div className="flex w-full gap-2">
                <Textarea
                  placeholder="Digite sua mensagem..."
                  className="min-h-[80px]"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                />
                <div className="flex flex-col gap-2">
                  <Button size="icon" variant="outline" title="Anexar arquivo">
                    <PaperclipIcon className="h-4 w-4" />
                  </Button>
                  <Button size="icon" onClick={handleSendMessage} disabled={isLoading || !newMessage.trim()}>
                    <SendIcon className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="documents">
          <Card>
            <CardHeader>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <CardTitle>Documentos</CardTitle>
                  <CardDescription>Documentos relacionados ao seu caso</CardDescription>
                </div>
                <Button>
                  <UploadIcon className="mr-2 h-4 w-4" />
                  Enviar Documento
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {caseItem.documents.length === 0 ? (
                <div className="text-center py-8">
                  <FileTextIcon className="mx-auto h-12 w-12 text-muted-foreground/50" />
                  <h3 className="mt-4 text-lg font-semibold">Nenhum documento</h3>
                  <p className="text-muted-foreground">Não há documentos associados a este caso.</p>
                </div>
              ) : (
                <div className="space-y-2">
                  {caseItem.documents.map((doc) => (
                    <div key={doc.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <FileTextIcon className="h-5 w-5 text-muted-foreground" />
                        <div>
                          <p className="font-medium">{doc.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {new Date(doc.date).toLocaleDateString("pt-BR", {
                              day: "2-digit",
                              month: "2-digit",
                              year: "numeric",
                            })}
                          </p>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm">
                        Download
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="timeline">
          <Card>
            <CardHeader>
              <CardTitle>Linha do Tempo</CardTitle>
              <CardDescription>Histórico completo do caso</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {caseItem.timeline.map((item, index) => (
                  <div key={item.id} className="flex gap-4">
                    <div className="relative mt-1">
                      <div className="flex h-2 w-2 items-center justify-center rounded-full bg-primary ring-4 ring-background" />
                      {index !== caseItem.timeline.length - 1 && (
                        <div className="absolute top-0 bottom-0 left-1 -translate-x-1/2 w-[2px] h-full bg-muted-foreground/20" />
                      )}
                    </div>
                    <div className="flex-1 space-y-1">
                      <p className="font-medium leading-none">{item.title}</p>
                      <p className="text-sm text-muted-foreground">{item.description}</p>
                      <p className="text-xs text-muted-foreground">
                        {new Date(item.date).toLocaleDateString("pt-BR", {
                          day: "2-digit",
                          month: "2-digit",
                          year: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </DashboardShell>
  )
}
