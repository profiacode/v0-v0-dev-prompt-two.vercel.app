import Image from "next/image"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { GavelIcon, ShieldIcon, ClockIcon, AppleIcon as DevicesIcon } from "lucide-react"

export function Features() {
  const features = [
    {
      icon: GavelIcon,
      title: "Expertise Jurídica",
      description:
        "Equipe de advogados especializados em diversas áreas do direito, prontos para atender suas necessidades.",
    },
    {
      icon: DevicesIcon,
      title: "Atendimento Digital",
      description:
        "Acesse nossos serviços de qualquer lugar, através de qualquer dispositivo, com a mesma qualidade do atendimento presencial.",
    },
    {
      icon: ClockIcon,
      title: "Agilidade",
      description:
        "Respostas rápidas e processos otimizados para resolver suas questões jurídicas no menor tempo possível.",
    },
    {
      icon: ShieldIcon,
      title: "Segurança",
      description: "Seus dados e informações são tratados com total confidencialidade e seguindo as normas da LGPD.",
    },
  ]

  return (
    <section id="vantagens" className="py-16 md:py-24">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight mb-4">Vantagens do Atendimento Digital</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Conheça os benefícios de utilizar nossa plataforma para resolver suas questões jurídicas
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <Card key={index} className="border-none shadow-md">
              <CardHeader>
                <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">{feature.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-2 items-center">
          <div className="relative h-[300px] md:h-[400px] rounded-lg overflow-hidden">
            <Image
              src="/images/law-books.png"
              alt="Livros jurídicos"
              className="object-cover"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
          <div>
            <h3 className="text-2xl font-bold tracking-tight mb-4">Atendimento Personalizado</h3>
            <p className="text-muted-foreground mb-6">
              Nossa equipe de advogados especializados está pronta para oferecer soluções jurídicas personalizadas para
              cada cliente, combinando expertise legal com tecnologia de ponta.
            </p>
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="h-1.5 w-1.5 rounded-full bg-primary"></div>
                <p className="text-sm">Consultas online com advogados especializados</p>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-1.5 w-1.5 rounded-full bg-primary"></div>
                <p className="text-sm">Acompanhamento em tempo real do andamento do seu caso</p>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-1.5 w-1.5 rounded-full bg-primary"></div>
                <p className="text-sm">Documentos digitais com assinatura eletrônica</p>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-1.5 w-1.5 rounded-full bg-primary"></div>
                <p className="text-sm">Atendimento humanizado com suporte técnico</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
