"use client"

import { AdminShell } from "@/components/admin-shell"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { toast } from "@/components/ui/use-toast"
import { useState } from "react"

export default function SettingsPage() {
  const [isLoading, setIsLoading] = useState(false)

  const handleSaveGeneral = () => {
    setIsLoading(true)

    // Simulação de salvamento
    setTimeout(() => {
      setIsLoading(false)
      toast({
        title: "Configurações salvas",
        description: "As configurações gerais foram atualizadas com sucesso.",
      })
    }, 1000)
  }

  const handleSaveNotifications = () => {
    setIsLoading(true)

    // Simulação de salvamento
    setTimeout(() => {
      setIsLoading(false)
      toast({
        title: "Preferências de notificação salvas",
        description: "Suas preferências de notificação foram atualizadas com sucesso.",
      })
    }, 1000)
  }

  const handleSaveTeam = () => {
    setIsLoading(true)

    // Simulação de salvamento
    setTimeout(() => {
      setIsLoading(false)
      toast({
        title: "Configurações de equipe salvas",
        description: "As configurações da equipe foram atualizadas com sucesso.",
      })
    }, 1000)
  }

  return (
    <AdminShell>
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Configurações</h1>
        <p className="text-muted-foreground">Gerencie as configurações da plataforma</p>
      </div>

      <Tabs defaultValue="general" className="mt-6">
        <TabsList className="grid w-full grid-cols-3 lg:w-[400px]">
          <TabsTrigger value="general">Geral</TabsTrigger>
          <TabsTrigger value="notifications">Notificações</TabsTrigger>
          <TabsTrigger value="team">Equipe</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-4 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Informações do Escritório</CardTitle>
              <CardDescription>Atualize as informações básicas do escritório exibidas na plataforma</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="office-name">Nome do Escritório</Label>
                <Input id="office-name" defaultValue="JurisConsult" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="office-email">Email de Contato</Label>
                <Input id="office-email" type="email" defaultValue="contato@jurisconsult.com" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="office-phone">Telefone</Label>
                <Input id="office-phone" defaultValue="(11) 9999-9999" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="office-address">Endereço</Label>
                <Input id="office-address" defaultValue="Av. Paulista, 1000, São Paulo - SP" />
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSaveGeneral} disabled={isLoading}>
                {isLoading ? "Salvando..." : "Salvar Alterações"}
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Aparência</CardTitle>
              <CardDescription>Personalize a aparência da plataforma</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="theme-mode">Modo Escuro</Label>
                  <p className="text-sm text-muted-foreground">Ativar o modo escuro para a plataforma</p>
                </div>
                <Switch id="theme-mode" />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="theme-color">Cor Primária</Label>
                  <p className="text-sm text-muted-foreground">Escolha a cor principal da plataforma</p>
                </div>
                <div className="flex gap-2">
                  <div className="w-6 h-6 rounded-full bg-blue-500 cursor-pointer border-2 border-transparent hover:border-gray-300" />
                  <div className="w-6 h-6 rounded-full bg-green-500 cursor-pointer border-2 border-transparent hover:border-gray-300" />
                  <div className="w-6 h-6 rounded-full bg-purple-500 cursor-pointer border-2 border-transparent hover:border-gray-300" />
                  <div className="w-6 h-6 rounded-full bg-red-500 cursor-pointer border-2 border-transparent hover:border-gray-300" />
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSaveGeneral} disabled={isLoading}>
                {isLoading ? "Salvando..." : "Salvar Alterações"}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-4 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Preferências de Notificação</CardTitle>
              <CardDescription>Configure como e quando deseja receber notificações</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Novos Casos</Label>
                  <p className="text-sm text-muted-foreground">Receber notificações quando novos casos forem abertos</p>
                </div>
                <Switch defaultChecked />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Atualizações de Casos</Label>
                  <p className="text-sm text-muted-foreground">
                    Receber notificações quando houver atualizações em casos
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Novos Clientes</Label>
                  <p className="text-sm text-muted-foreground">
                    Receber notificações quando novos clientes se registrarem
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Lembretes de Agenda</Label>
                  <p className="text-sm text-muted-foreground">Receber lembretes de compromissos agendados</p>
                </div>
                <Switch defaultChecked />
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSaveNotifications} disabled={isLoading}>
                {isLoading ? "Salvando..." : "Salvar Preferências"}
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Canais de Notificação</CardTitle>
              <CardDescription>Escolha como deseja receber suas notificações</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Email</Label>
                  <p className="text-sm text-muted-foreground">Receber notificações por email</p>
                </div>
                <Switch defaultChecked />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Plataforma</Label>
                  <p className="text-sm text-muted-foreground">Receber notificações dentro da plataforma</p>
                </div>
                <Switch defaultChecked />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>SMS</Label>
                  <p className="text-sm text-muted-foreground">Receber notificações por SMS</p>
                </div>
                <Switch />
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSaveNotifications} disabled={isLoading}>
                {isLoading ? "Salvando..." : "Salvar Preferências"}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="team" className="space-y-4 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Membros da Equipe</CardTitle>
              <CardDescription>Gerencie os membros da equipe e suas permissões</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-2 rounded-lg hover:bg-muted">
                  <div className="flex items-center gap-4">
                    <Avatar>
                      <AvatarImage src="/placeholder.svg?height=40&width=40" alt="Carlos Mendes" />
                      <AvatarFallback>CM</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">Carlos Mendes</p>
                      <p className="text-sm text-muted-foreground">carlos.mendes@jurisconsult.com</p>
                    </div>
                  </div>
                  <div className="text-sm font-medium">Administrador</div>
                </div>

                <div className="flex items-center justify-between p-2 rounded-lg hover:bg-muted">
                  <div className="flex items-center gap-4">
                    <Avatar>
                      <AvatarImage src="/placeholder.svg?height=40&width=40" alt="Fernanda Lima" />
                      <AvatarFallback>FL</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">Fernanda Lima</p>
                      <p className="text-sm text-muted-foreground">fernanda.lima@jurisconsult.com</p>
                    </div>
                  </div>
                  <div className="text-sm font-medium">Advogado</div>
                </div>

                <div className="flex items-center justify-between p-2 rounded-lg hover:bg-muted">
                  <div className="flex items-center gap-4">
                    <Avatar>
                      <AvatarImage src="/placeholder.svg?height=40&width=40" alt="Ricardo Souza" />
                      <AvatarFallback>RS</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">Ricardo Souza</p>
                      <p className="text-sm text-muted-foreground">ricardo.souza@jurisconsult.com</p>
                    </div>
                  </div>
                  <div className="text-sm font-medium">Advogado</div>
                </div>

                <div className="flex items-center justify-between p-2 rounded-lg hover:bg-muted">
                  <div className="flex items-center gap-4">
                    <Avatar>
                      <AvatarImage src="/placeholder.svg?height=40&width=40" alt="Amanda Costa" />
                      <AvatarFallback>AC</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">Amanda Costa</p>
                      <p className="text-sm text-muted-foreground">amanda.costa@jurisconsult.com</p>
                    </div>
                  </div>
                  <div className="text-sm font-medium">Assistente</div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="mr-2">
                Convidar Membro
              </Button>
              <Button onClick={handleSaveTeam} disabled={isLoading}>
                {isLoading ? "Salvando..." : "Salvar Alterações"}
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Permissões</CardTitle>
              <CardDescription>Configure as permissões para cada tipo de usuário</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Administrador</Label>
                <p className="text-sm text-muted-foreground">Acesso total a todas as funcionalidades da plataforma</p>
              </div>
              <Separator />
              <div className="space-y-2">
                <Label>Advogado</Label>
                <p className="text-sm text-muted-foreground">
                  Acesso a casos, clientes e agenda. Pode criar e editar casos.
                </p>
              </div>
              <Separator />
              <div className="space-y-2">
                <Label>Assistente</Label>
                <p className="text-sm text-muted-foreground">
                  Acesso limitado a casos e agenda. Não pode editar configurações.
                </p>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSaveTeam} disabled={isLoading}>
                {isLoading ? "Salvando..." : "Salvar Alterações"}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </AdminShell>
  )
}
