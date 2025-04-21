import Image from "next/image"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { StarIcon } from "lucide-react"

export function Testimonials() {
  const testimonials = [
    {
      name: "Carlos Oliveira",
      role: "Empresário",
      content:
        "O atendimento digital superou minhas expectativas. Consegui resolver minha questão contratual de forma rápida e eficiente, sem precisar me deslocar até um escritório.",
      avatar: "/images/client1.png",
      rating: 5,
    },
    {
      name: "Mariana Santos",
      role: "Professora",
      content:
        "Excelente experiência! Os advogados são muito atenciosos e me explicaram todo o processo de forma clara. Recomendo para quem precisa de orientação jurídica de qualidade.",
      avatar: "/images/client2.png",
      rating: 5,
    },
    {
      name: "Roberto Almeida",
      role: "Engenheiro",
      content:
        "Prático e eficiente. Consegui acompanhar todo o andamento do meu caso pela plataforma, com atualizações constantes. O resultado foi melhor do que eu esperava.",
      avatar: "/images/client3.png",
      rating: 4,
    },
  ]

  return (
    <section id="depoimentos" className="py-16 md:py-24 bg-muted/50">
      <div className="container px-4 md:px-6 mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight mb-6">O que nossos clientes dizem</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Veja os depoimentos de quem já utilizou nossos serviços jurídicos
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="border-none shadow-md">
              <CardContent className="pt-8 px-6">
                <div className="flex mb-4">
                  {Array(5)
                    .fill(0)
                    .map((_, i) => (
                      <StarIcon
                        key={i}
                        className={`h-5 w-5 ${i < testimonial.rating ? "text-yellow-500 fill-yellow-500" : "text-muted"}`}
                      />
                    ))}
                </div>
                <p className="mt-4 text-muted-foreground">"{testimonial.content}"</p>
              </CardContent>
              <CardFooter className="px-6 pb-6 pt-2">
                <div className="flex items-center gap-4">
                  <Avatar>
                    <AvatarImage src={testimonial.avatar || "/placeholder.svg"} alt={testimonial.name} />
                    <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  </div>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="mt-24 relative h-[300px] rounded-lg overflow-hidden">
          <Image src="/images/courtroom.png" alt="Sala de tribunal" className="object-cover" fill sizes="100vw" />
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <div className="text-center text-white max-w-2xl px-6">
              <h3 className="text-2xl font-bold mb-6">Experiência e Compromisso</h3>
              <p className="mb-8">
                Nossa equipe de advogados combina anos de experiência com um compromisso inabalável com os interesses de
                nossos clientes.
              </p>
              <div className="flex flex-wrap justify-center gap-12">
                <div className="text-center">
                  <p className="text-3xl font-bold mb-2">98%</p>
                  <p className="text-sm">Clientes Satisfeitos</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-bold mb-2">15+</p>
                  <p className="text-sm">Anos de Experiência</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-bold mb-2">500+</p>
                  <p className="text-sm">Casos Resolvidos</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
