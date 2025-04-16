"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DashboardShell } from "@/components/dashboard-shell"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/components/ui/use-toast"
import { SearchIcon, SendIcon, PaperclipIcon, MessageSquareIcon } from "lucide-react"

// Dados de exemplo para demonstração
const mockContacts = [
  {
    id: "1",
    name: "Dr. Carlos Mendes",
    role: "Advogado",
    avatar: "/placeholder.svg?height=40&width=40",
    lastMessage: "Olá João, recebi seu caso e já iniciei a análise do contrato.",
    lastMessageDate: "2023-04-11T14:30:00",
    unread: 1,
    online: true,
  },
  {
    id: "2",
    name: "Dra. Fernanda Lima",
    role: "Advogada",
    avatar: "/placeholder.svg?height=40&width=40",
    lastMessage: "Por favor, envie os contatos deles. Também precisamos dos contracheques.",
    lastMessageDate: "2023-03-27T09:15:00",
    unread: 0,
    online: false,
  },
  {
    id: "3",
    name: "Amanda Costa",
    role: "Assistente Jurídica",
    avatar: "/placeholder.svg?height=40&width=40",
    lastMessage: "Os documentos foram recebidos e encaminhados para análise.",
    lastMessageDate: "2023-04-05T16:45:00",
    unread: 0,
    online: true,
  },
  {
    id: "4",
    name: "Ricardo Souza",
    role: "Advogado",
    avatar: "/placeholder.svg?height=40&width=40",
    lastMessage: "Bom dia, João. Tudo bem? Gostaria de agendar uma reunião para discutir seu caso.",
    lastMessageDate: "2023-04-08T10:20:00",
    unread: 2,
    online: false,
  },
]

const mockMessages = [
  {
    id: "1",
    senderId: "1",
    content:
      "Olá João, recebi seu caso e já iniciei a análise do contrato. Identifiquei algumas cláusulas que podem ser consideradas abusivas. Vou preparar um parecer detalhado.",
    date: "2023-04-11T14:30:00",
    isOwn: false,
  },
  {
    id: "2",
    senderId: "current-user",
    content: "Obrigado, doutor. Aguardo o parecer para entender melhor a situação.",
    date: "2023-04-11T15:45:00",
    isOwn: true,
  },
  {
    id: "3",
    senderId: "1",
    content:
      "João, preciso de mais informações sobre os pagamentos já realizados. Você poderia enviar os comprovantes dos últimos 3 meses?",
    date: "2023-04-12T09:15:00",
    isOwn: false,
  },
  {
    id: "4",
    senderId: "current-user",
    content: "Claro, vou providenciar esses documentos ainda hoje.",
    date: "2023-04-12T10:30:00",
    isOwn: true,
  },
  {
    id: "5",
    senderId: "1",
    content: "Perfeito! Assim que receber, continuarei com a análise.",
    date: "2023-04-12T10:35:00",
    isOwn: false,
  },
]

export default function MessagesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedContact, setSelectedContact] = useState(mockContacts[0])
  const [newMessage, setNewMessage] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  // Filtrar contatos com base na busca
  const filteredContacts = mockContacts.filter(
    (contact) =>
      contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.role.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleSendMessage = async () => {
    if (!newMessage.trim()) return

    setIsLoading(true)

    try {
      // Simulação de envio - aqui você conectaria com sua API
      console.log({ contactId: selectedContact.id, message: newMessage })

      // Simular um atraso de rede
      await new Promise((resolve) => setTimeout(resolve, 1000))

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
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Mensagens</h1>
        <p className="text-muted-foreground">Comunique-se com sua equipe jurídica</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] gap-6 mt-6 h-[calc(100vh-220px)] min-h-[500px]">
        <Card className="h-full flex flex-col">
          <CardHeader className="p-4">
            <div className="relative">
              <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Buscar contato..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </CardHeader>
          <CardContent className="flex-1 overflow-auto p-0">
            <Tabs defaultValue="all" className="h-full flex flex-col">
              <TabsList className="mx-4 mb-2 justify-start">
                <TabsTrigger value="all" className="flex-1">
                  Todos
                </TabsTrigger>
                <TabsTrigger value="unread" className="flex-1">
                  Não lidos
                </TabsTrigger>
              </TabsList>

              <TabsContent value="all" className="flex-1 overflow-auto p-0 m-0">
                <div className="space-y-1 p-2">
                  {filteredContacts.length === 0 ? (
                    <div className="text-center py-8">
                      <MessageSquareIcon className="mx-auto h-12 w-12 text-muted-foreground/50" />
                      <h3 className="mt-4 text-lg font-semibold">Nenhum contato encontrado</h3>
                      <p className="text-muted-foreground">Tente uma busca diferente.</p>
                    </div>
                  ) : (
                    filteredContacts.map((contact) => (
                      <div
                        key={contact.id}
                        className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer hover:bg-muted ${
                          selectedContact.id === contact.id ? "bg-muted" : ""
                        }`}
                        onClick={() => setSelectedContact(contact)}
                      >
                        <div className="relative">
                          <Avatar>
                            <AvatarImage src={contact.avatar} alt={contact.name} />
                            <AvatarFallback>{contact.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          {contact.online && (
                            <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 border-2 border-background"></span>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <p className="font-medium truncate">{contact.name}</p>
                            <p className="text-xs text-muted-foreground">
                              {new Date(contact.lastMessageDate).toLocaleDateString("pt-BR", {
                                day: "2-digit",
                                month: "2-digit",
                              })}
                            </p>
                          </div>
                          <div className="flex items-center justify-between">
                            <p className="text-sm text-muted-foreground truncate">{contact.lastMessage}</p>
                            {contact.unread > 0 && (
                              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] font-medium text-primary-foreground">
                                {contact.unread}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </TabsContent>

              <TabsContent value="unread" className="flex-1 overflow-auto p-0 m-0">
                <div className="space-y-1 p-2">
                  {filteredContacts.filter((c) => c.unread > 0).length === 0 ? (
                    <div className="text-center py-8">
                      <MessageSquareIcon className="mx-auto h-12 w-12 text-muted-foreground/50" />
                      <h3 className="mt-4 text-lg font-semibold">Nenhuma mensagem não lida</h3>
                      <p className="text-muted-foreground">Você está em dia com suas mensagens.</p>
                    </div>
                  ) : (
                    filteredContacts
                      .filter((c) => c.unread > 0)
                      .map((contact) => (
                        <div
                          key={contact.id}
                          className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer hover:bg-muted ${
                            selectedContact.id === contact.id ? "bg-muted" : ""
                          }`}
                          onClick={() => setSelectedContact(contact)}
                        >
                          <div className="relative">
                            <Avatar>
                              <AvatarImage src={contact.avatar} alt={contact.name} />
                              <AvatarFallback>{contact.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            {contact.online && (
                              <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 border-2 border-background"></span>
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between">
                              <p className="font-medium truncate">{contact.name}</p>
                              <p className="text-xs text-muted-foreground">
                                {new Date(contact.lastMessageDate).toLocaleDateString("pt-BR", {
                                  day: "2-digit",
                                  month: "2-digit",
                                })}
                              </p>
                            </div>
                            <div className="flex items-center justify-between">
                              <p className="text-sm text-muted-foreground truncate">{contact.lastMessage}</p>
                              {contact.unread > 0 && (
                                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] font-medium text-primary-foreground">
                                  {contact.unread}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      ))
                  )}
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        <Card className="h-full flex flex-col">
          <CardHeader className="p-4 border-b">
            <div className="flex items-center gap-3">
              <Avatar>
                <AvatarImage src={selectedContact.avatar} alt={selectedContact.name} />
                <AvatarFallback>{selectedContact.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <CardTitle className="text-lg">{selectedContact.name}</CardTitle>
                <CardDescription>
                  {selectedContact.role} • {selectedContact.online ? "Online" : "Offline"}
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="flex-1 overflow-auto p-4">
            <div className="space-y-4">
              {mockMessages.map((message) => (
                <div key={message.id} className={`flex ${message.isOwn ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-[80%] rounded-lg p-4 ${
                      message.isOwn ? "bg-primary text-primary-foreground" : "bg-muted"
                    }`}
                  >
                    <p className="text-sm">{message.content}</p>
                    <p
                      className={`text-xs mt-1 ${
                        message.isOwn ? "text-primary-foreground/70" : "text-muted-foreground"
                      }`}
                    >
                      {new Date(message.date).toLocaleTimeString("pt-BR", {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
          <div className="p-4 border-t">
            <div className="flex gap-2">
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
          </div>
        </Card>
      </div>
    </DashboardShell>
  )
}
