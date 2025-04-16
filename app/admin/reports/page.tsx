"use client"

import { AdminShell } from "@/components/admin-shell"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { BarChart, LineChart } from "@/components/charts"
import { DownloadIcon } from "lucide-react"
import { useState } from "react"

export default function ReportsPage() {
  const [period, setPeriod] = useState("6months")
  const [reportType, setReportType] = useState("cases")

  return (
    <AdminShell>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Relatórios</h1>
          <p className="text-muted-foreground">Visualize métricas e estatísticas da plataforma</p>
        </div>
        <div className="flex items-center gap-4">
          <Select value={period} onValueChange={setPeriod}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Período" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="30days">Últimos 30 dias</SelectItem>
              <SelectItem value="3months">Últimos 3 meses</SelectItem>
              <SelectItem value="6months">Últimos 6 meses</SelectItem>
              <SelectItem value="1year">Último ano</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <DownloadIcon className="mr-2 h-4 w-4" />
            Exportar
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mt-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total de Casos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">93</div>
            <p className="text-xs text-muted-foreground">+12% em relação ao período anterior</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Casos Ativos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">67</div>
            <p className="text-xs text-muted-foreground">72% do total de casos</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Novos Clientes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <p className="text-xs text-muted-foreground">+8% em relação ao período anterior</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tempo Médio de Resposta</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1.2 dias</div>
            <p className="text-xs text-muted-foreground">-0.3 dias em relação ao período anterior</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="cases" className="mt-6" value={reportType} onValueChange={setReportType}>
        <TabsList>
          <TabsTrigger value="cases">Casos</TabsTrigger>
          <TabsTrigger value="clients">Clientes</TabsTrigger>
          <TabsTrigger value="performance">Desempenho</TabsTrigger>
        </TabsList>

        <TabsContent value="cases" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
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
          <Card>
            <CardHeader>
              <CardTitle>Casos por Tipo</CardTitle>
              <CardDescription>Distribuição dos casos por tipo de serviço jurídico</CardDescription>
            </CardHeader>
            <CardContent className="h-[300px]">
              <div className="flex items-center justify-center h-full text-muted-foreground">
                Gráfico de distribuição por tipo de caso
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="clients" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Novos Clientes</CardTitle>
                <CardDescription>Número de novos clientes por mês</CardDescription>
              </CardHeader>
              <CardContent>
                <LineChart />
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Retenção de Clientes</CardTitle>
                <CardDescription>Taxa de retenção de clientes ao longo do tempo</CardDescription>
              </CardHeader>
              <CardContent className="h-[300px]">
                <div className="flex items-center justify-center h-full text-muted-foreground">
                  Gráfico de retenção de clientes
                </div>
              </CardContent>
            </Card>
          </div>
          <Card>
            <CardHeader>
              <CardTitle>Clientes por Região</CardTitle>
              <CardDescription>Distribuição geográfica dos clientes</CardDescription>
            </CardHeader>
            <CardContent className="h-[300px]">
              <div className="flex items-center justify-center h-full text-muted-foreground">
                Mapa de distribuição de clientes
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="performance" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Tempo Médio de Resolução</CardTitle>
                <CardDescription>Tempo médio para resolução de casos por tipo</CardDescription>
              </CardHeader>
              <CardContent className="h-[300px]">
                <div className="flex items-center justify-center h-full text-muted-foreground">
                  Gráfico de tempo médio de resolução
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Taxa de Sucesso</CardTitle>
                <CardDescription>Percentual de casos resolvidos com sucesso</CardDescription>
              </CardHeader>
              <CardContent className="h-[300px]">
                <div className="flex items-center justify-center h-full text-muted-foreground">
                  Gráfico de taxa de sucesso
                </div>
              </CardContent>
            </Card>
          </div>
          <Card>
            <CardHeader>
              <CardTitle>Desempenho por Advogado</CardTitle>
              <CardDescription>Métricas de desempenho por membro da equipe</CardDescription>
            </CardHeader>
            <CardContent className="h-[300px]">
              <div className="flex items-center justify-center h-full text-muted-foreground">
                Tabela de desempenho por advogado
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </AdminShell>
  )
}
