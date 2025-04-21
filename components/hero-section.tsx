import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { GavelIcon } from "lucide-react"

export function HeroSection() {
  return (
    <section className="w-full py-16 md:py-24 lg:py-32 xl:py-40">
      <div className="container px-4 md:px-6 mx-auto">
        <div className="grid gap-8 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px] items-center">
          <div className="flex flex-col justify-center space-y-6">
            <div className="space-y-4">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                Soluções Jurídicas Eficientes e Acessíveis
              </h1>
              <p className="max-w-[600px] text-muted-foreground md:text-xl">
                Atendimento jurídico digital com a qualidade e segurança que você merece. Resolva suas questões legais
                sem sair de casa.
              </p>
            </div>
            <div className="flex flex-col gap-4 min-[400px]:flex-row">
              <Link href="/register">
                <Button size="lg" className="gap-1">
                  <GavelIcon className="h-4 w-4" />
                  Agendar Consulta
                </Button>
              </Link>
              <a href="#sobre">
                <Button size="lg" variant="outline">
                  Conhecer o Escritório
                </Button>
              </a>
            </div>
          </div>
          <div className="relative h-[300px] md:h-[400px] lg:h-full rounded-xl overflow-hidden">
            <Image
              src="/images/hero-law-office.png"
              alt="Escritório de advocacia moderno"
              className="object-cover"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  )
}
