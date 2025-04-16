import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { GavelIcon, ScaleIcon, ShieldCheckIcon } from "lucide-react"
import { Testimonials } from "@/components/testimonials"
import { Features } from "@/components/features"
import { HeroSection } from "@/components/hero-section"
import { Footer } from "@/components/footer"
import { TeamSection } from "@/components/team-section"
import { ScrollToSection } from "@/components/scroll-to-section"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <ScrollToSection />
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <ScaleIcon className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">JurisConsult</span>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <a href="#sobre" className="text-sm font-medium hover:text-primary transition-colors">
              Sobre
            </a>
            <a href="#vantagens" className="text-sm font-medium hover:text-primary transition-colors">
              Vantagens
            </a>
            <a href="#equipe" className="text-sm font-medium hover:text-primary transition-colors">
              Equipe
            </a>
            <a href="#depoimentos" className="text-sm font-medium hover:text-primary transition-colors">
              Depoimentos
            </a>
            <a href="#contato" className="text-sm font-medium hover:text-primary transition-colors">
              Contato
            </a>
          </nav>
          <div className="flex items-center gap-4">
            <Link href="/login">
              <Button variant="outline">Entrar</Button>
            </Link>
            <Link href="/register">
              <Button>Registrar Conta</Button>
            </Link>
          </div>
        </div>
      </header>
      <main className="flex-1">
        <HeroSection />

        <section id="sobre" className="py-16 md:py-24 bg-muted/50">
          <div className="container">
            <div className="grid gap-8 md:grid-cols-2 items-center">
              <div>
                <h2 className="text-3xl font-bold tracking-tight mb-4">Sobre o Escritório</h2>
                <p className="text-muted-foreground mb-4">
                  A JurisConsult é um escritório de advocacia moderno, focado em oferecer soluções jurídicas eficientes
                  e acessíveis para nossos clientes.
                </p>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="bg-primary/10 p-2 rounded-full">
                      <GavelIcon className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium">Missão</h3>
                      <p className="text-sm text-muted-foreground">
                        Proporcionar atendimento jurídico de excelência, com foco na resolução eficaz de problemas.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="bg-primary/10 p-2 rounded-full">
                      <ScaleIcon className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium">Visão</h3>
                      <p className="text-sm text-muted-foreground">
                        Ser referência em atendimento jurídico digital, combinando tecnologia e expertise legal.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="bg-primary/10 p-2 rounded-full">
                      <ShieldCheckIcon className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium">Valores</h3>
                      <p className="text-sm text-muted-foreground">
                        Ética, transparência, inovação e compromisso com os resultados dos nossos clientes.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="relative h-[400px] rounded-lg overflow-hidden">
                <Image
                  src="/images/law-team.png"
                  alt="Equipe de advogados"
                  className="object-cover"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority
                />
              </div>
            </div>
          </div>
        </section>

        <Features />

        <TeamSection />

        <Testimonials />

        <section className="py-16 md:py-24 bg-primary text-primary-foreground">
          <div className="container text-center">
            <h2 className="text-3xl font-bold tracking-tight mb-4">Pronto para resolver suas questões jurídicas?</h2>
            <p className="text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
              Agende uma consulta com nossos especialistas e descubra como podemos ajudar você a resolver suas questões
              legais de forma eficiente.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/register">
                <Button size="lg" variant="secondary">
                  Registrar Conta
                </Button>
              </Link>
              <Link href="/login">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-primary-foreground/20 hover:bg-primary-foreground/10"
                >
                  Já tenho uma conta
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
