import Image from "next/image"
import { Card, CardContent, CardFooter } from "@/components/ui/card"

export function TeamSection() {
  const team = [
    {
      name: "Dra. Amanda Oliveira",
      role: "Direito Civil e Empresarial",
      description: "Especialista em contratos e direito empresarial com mais de 10 anos de experiência.",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/freepik__the-style-is-candid-image-photography-with-natural__90587-I2SYQmLVB0xbro7K92Kbd6FsJAcIUV.jpeg",
    },
    {
      name: "Dr. Carlos Mendes",
      role: "Direito Trabalhista",
      description: "Especializado em causas trabalhistas complexas e negociações coletivas.",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/freepik__the-style-is-candid-image-photography-with-natural__90588-eYFwHjmXhkHBnz7qQcVK5JRpAjgEqr.jpeg",
    },
    {
      name: "Equipe JurisConsult",
      role: "Nosso Time",
      description: "Uma equipe multidisciplinar pronta para atender todas as suas necessidades jurídicas.",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/freepik__the-style-is-candid-image-photography-with-natural__90589-qIIgTJGFfFDqsTAcgZUThLEHfLDgsL.jpeg",
    },
  ]

  return (
    <section id="equipe" className="py-16 md:py-24">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight mb-4">Nossa Equipe</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Conheça os profissionais dedicados a resolver suas questões jurídicas com excelência e compromisso
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {team.map((member, index) => (
            <Card key={index} className="overflow-hidden border-none shadow-lg">
              <div className="relative h-[300px]">
                <Image
                  src={member.image || "/placeholder.svg"}
                  alt={member.name}
                  className="object-cover"
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
              <CardContent className="pt-6">
                <h3 className="text-xl font-bold">{member.name}</h3>
                <p className="text-sm text-primary font-medium">{member.role}</p>
              </CardContent>
              <CardFooter>
                <p className="text-sm text-muted-foreground">{member.description}</p>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
