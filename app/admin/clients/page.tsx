"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { AdminShell } from "@/components/admin-shell"
import { DataTable } from "@/components/data-table"
import { SearchIcon, UserPlusIcon } from "lucide-react"
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
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { toast } from "@/components/ui/use-toast"

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
  {
    id: "5",
    name: "Roberto Almeida",
    email: "roberto.almeida@exemplo.com",
    cpf: "234.567.890-12",
    phone: "(11) 97890-1234",
    cases: 2,
    lastActivity: "2023-04-09T11:20:00",
  },
  {
    id: "6",
    name: "Fernanda Lima",
    email: "fernanda.lima@exemplo.com",
    cpf: "345.678.901-23",
    phone: "(11) 96789-0123",
    cases: 1,
    lastActivity: "2023-04-07T15:40:00",
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
          <a href={`/admin/clients/${client.id}`}>Ver detalhes</a>
        </Button>
      )
    },
  },
]

const formSchema = z.object({
  name: z.string().min(3, { message: "Nome deve ter pelo menos 3 caracteres" }),
  email: z.string().email({ message: "Email inválido" }),
  cpf: z.string().min(11, { message: "CPF inválido" }).max(14),
  phone: z.string().min(10, { message: "Telefone inválido" }),
})

export default function ClientsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      cpf: "",
      phone: "",
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
        title: "Cliente cadastrado com sucesso!",
        description: "O novo cliente foi adicionado à base de dados.",
      })

      // Fechar o diálogo e resetar o formulário
      form.reset()
      setIsDialogOpen(false)
    } catch (error) {
      toast({
        title: "Erro ao cadastrar cliente",
        description: "Ocorreu um erro ao processar o cadastro. Tente novamente.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <AdminShell>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Clientes</h1>
          <p className="text-muted-foreground">Gerencie os clientes cadastrados na plataforma</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative">
            <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Buscar cliente..."
              className="w-[250px] pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <UserPlusIcon className="mr-2 h-4 w-4" />
                Novo Cliente
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>Cadastrar Novo Cliente</DialogTitle>
                <DialogDescription>Preencha os dados do cliente para cadastrá-lo na plataforma.</DialogDescription>
              </DialogHeader>

              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nome completo</FormLabel>
                        <FormControl>
                          <Input placeholder="João da Silva" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input type="email" placeholder="joao@exemplo.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="cpf"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>CPF</FormLabel>
                        <FormControl>
                          <Input placeholder="000.000.000-00" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Telefone</FormLabel>
                        <FormControl>
                          <Input placeholder="(00) 00000-0000" {...field} />
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
                      {isLoading ? "Cadastrando..." : "Cadastrar Cliente"}
                    </Button>
                  </DialogFooter>
                </form>
              </Form>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Lista de Clientes</CardTitle>
          <CardDescription>Visualize e gerencie todos os clientes cadastrados na plataforma</CardDescription>
        </CardHeader>
        <CardContent>
          <DataTable columns={clientColumns} data={mockClients} searchColumn="name" />
        </CardContent>
      </Card>
    </AdminShell>
  )
}
