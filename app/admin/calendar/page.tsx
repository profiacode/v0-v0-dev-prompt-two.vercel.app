"use client"

import { useState } from "react"
import { AdminShell } from "@/components/admin-shell"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { toast } from "@/components/ui/use-toast"
import { PlusIcon, ChevronLeftIcon, ChevronRightIcon } from "lucide-react"

// Dados de exemplo para demonstração
const mockEvents = [
  {
    id: "1",
    title: "Reunião com João Silva",
    date: new Date(2023, 3, 10, 10, 30),
    type: "reuniao",
    description: "Discussão sobre o caso de revisão de contrato",
    client: "João Silva",
  },
  {
    id: "2",
    title: "Audiência - Processo Trabalhista",
    date: new Date(2023, 3, 15, 14, 0),
    type: "audiencia",
    description: "Audiência de conciliação no processo trabalhista",
    client: "Maria Oliveira",
  },
  {
    id: "3",
    title: "Prazo - Entrega de Documentos",
    date: new Date(2023, 3, 20, 18, 0),
    type: "prazo",
    description: "Prazo final para entrega de documentos no processo de cobrança",
    client: "Pedro Santos",
  },
]

const formSchema = z.object({
  title: z.string().min(3, { message: "Título deve ter pelo menos 3 caracteres" }),
  date: z.date({ required_error: "Data é obrigatória" }),
  time: z.string().min(1, { message: "Horário é obrigatório" }),
  type: z.string().min(1, { message: "Tipo de evento é obrigatório" }),
  client: z.string().min(1, { message: "Cliente é obrigatório" }),
  description: z.string().optional(),
})

export default function CalendarPage() {
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [view, setView] = useState<"day" | "month">("month")

  // Lista de clientes para o select
  const clients = [
    { id: "1", name: "João Silva" },
    { id: "2", name: "Maria Oliveira" },
    { id: "3", name: "Pedro Santos" },
    { id: "4", name: "Ana Costa" },
    { id: "5", name: "Roberto Almeida" },
  ]

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      date: new Date(),
      time: "09:00",
      type: "",
      client: "",
      description: "",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true)

    try {
      // Simulação de cadastro - aqui você conectaria com sua API
      console.log(values)

      // Simular um atraso de rede
      await new Promise((resolve) => setTimeout(resolve, 1000))

      toast({
        title: "Evento agendado com sucesso!",
        description: "O evento foi adicionado à agenda.",
      })

      // Fechar o diálogo e resetar o formulário
      form.reset()
      setIsDialogOpen(false)
    } catch (error) {
      toast({
        title: "Erro ao agendar evento",
        description: "Ocorreu um erro ao processar o agendamento. Tente novamente.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  // Função para renderizar os eventos do dia selecionado
  const renderDayEvents = () => {
    if (!date) return null

    const dayEvents = mockEvents.filter(
      (event) =>
        event.date.getDate() === date.getDate() &&
        event.date.getMonth() === date.getMonth() &&
        event.date.getFullYear() === date.getFullYear(),
    )

    if (dayEvents.length === 0) {
      return <div className="text-center py-8 text-muted-foreground">Nenhum evento agendado para este dia.</div>
    }

    return dayEvents.map((event) => (
      <div key={event.id} className="p-4 border rounded-lg mb-3">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-medium">{event.title}</h3>
            <p className="text-sm text-muted-foreground">
              {event.date.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" })} - Cliente: {event.client}
            </p>
          </div>
          <div
            className={`px-2 py-1 text-xs rounded-full ${
              event.type === "reuniao"
                ? "bg-blue-100 text-blue-800"
                : event.type === "audiencia"
                  ? "bg-purple-100 text-purple-800"
                  : "bg-yellow-100 text-yellow-800"
            }`}
          >
            {event.type === "reuniao" ? "Reunião" : event.type === "audiencia" ? "Audiência" : "Prazo"}
          </div>
        </div>
        {event.description && <p className="text-sm mt-2">{event.description}</p>}
      </div>
    ))
  }

  return (
    <AdminShell>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Agenda</h1>
          <p className="text-muted-foreground">Gerencie compromissos, audiências e prazos</p>
        </div>
        <div className="flex items-center gap-4">
          <Select value={view} onValueChange={(value: "day" | "month") => setView(value)}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Visualização" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="month">Mês</SelectItem>
              <SelectItem value="day">Dia</SelectItem>
            </SelectContent>
          </Select>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <PlusIcon className="mr-2 h-4 w-4" />
                Novo Evento
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>Agendar Novo Evento</DialogTitle>
                <DialogDescription>Preencha os detalhes do evento para adicioná-lo à agenda.</DialogDescription>
              </DialogHeader>

              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Título</FormLabel>
                        <FormControl>
                          <Input placeholder="Ex: Reunião com cliente" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="date"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Data</FormLabel>
                          <FormControl>
                            <Input
                              type="date"
                              {...field}
                              value={field.value ? field.value.toISOString().split("T")[0] : ""}
                              onChange={(e) => field.onChange(new Date(e.target.value))}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="time"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Horário</FormLabel>
                          <FormControl>
                            <Input type="time" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="type"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Tipo de Evento</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Selecione o tipo de evento" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="reuniao">Reunião</SelectItem>
                            <SelectItem value="audiencia">Audiência</SelectItem>
                            <SelectItem value="prazo">Prazo</SelectItem>
                            <SelectItem value="outro">Outro</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="client"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Cliente</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Selecione o cliente" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {clients.map((client) => (
                              <SelectItem key={client.id} value={client.name}>
                                {client.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Descrição (opcional)</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Detalhes adicionais sobre o evento"
                            className="min-h-[100px]"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <DialogFooter>
                    <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                      Cancelar
                    </Button>
                    <Button type="submit" disabled={isLoading}>
                      {isLoading ? "Agendando..." : "Agendar Evento"}
                    </Button>
                  </DialogFooter>
                </form>
              </Form>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="grid gap-6 mt-6 lg:grid-cols-[1fr_300px]">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>
                {view === "month"
                  ? "Calendário"
                  : date
                    ? date.toLocaleDateString("pt-BR", { day: "numeric", month: "long", year: "numeric" })
                    : ""}
              </CardTitle>
              {view === "day" && (
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => {
                      if (date) {
                        const newDate = new Date(date)
                        newDate.setDate(newDate.getDate() - 1)
                        setDate(newDate)
                      }
                    }}
                  >
                    <ChevronLeftIcon className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => {
                      if (date) {
                        const newDate = new Date(date)
                        newDate.setDate(newDate.getDate() + 1)
                        setDate(newDate)
                      }
                    }}
                  >
                    <ChevronRightIcon className="h-4 w-4" />
                  </Button>
                </div>
              )}
            </div>
          </CardHeader>
          <CardContent>
            {view === "month" ? (
              <Calendar mode="single" selected={date} onSelect={setDate} className="rounded-md border" />
            ) : (
              <div className="space-y-2">{renderDayEvents()}</div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Próximos Eventos</CardTitle>
            <CardDescription>Eventos agendados para os próximos dias</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockEvents
                .filter((event) => event.date >= new Date())
                .sort((a, b) => a.date.getTime() - b.date.getTime())
                .slice(0, 5)
                .map((event) => (
                  <div key={event.id} className="flex items-start gap-3 border-b pb-3 last:border-0">
                    <div
                      className={`w-3 h-3 rounded-full mt-1 ${
                        event.type === "reuniao"
                          ? "bg-blue-500"
                          : event.type === "audiencia"
                            ? "bg-purple-500"
                            : "bg-yellow-500"
                      }`}
                    />
                    <div>
                      <p className="font-medium">{event.title}</p>
                      <p className="text-xs text-muted-foreground">
                        {event.date.toLocaleDateString("pt-BR")} às{" "}
                        {event.date.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" })}
                      </p>
                      <p className="text-xs text-muted-foreground">Cliente: {event.client}</p>
                    </div>
                  </div>
                ))}

              {mockEvents.filter((event) => event.date >= new Date()).length === 0 && (
                <div className="text-center py-4 text-muted-foreground">
                  Nenhum evento agendado para os próximos dias.
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminShell>
  )
}
