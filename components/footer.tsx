import { ScaleIcon } from "lucide-react"
import { FacebookIcon, InstagramIcon, LinkedinIcon, TwitterIcon } from "lucide-react"

export function Footer() {
  return (
    <footer id="contato" className="border-t bg-background">
      <div className="container py-12 md:py-16">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <ScaleIcon className="h-6 w-6 text-primary" />
              <span className="text-xl font-bold">JurisConsult</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Soluções jurídicas eficientes e acessíveis para pessoas e empresas.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-muted-foreground hover:text-foreground">
                <FacebookIcon className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground">
                <InstagramIcon className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground">
                <TwitterIcon className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground">
                <LinkedinIcon className="h-5 w-5" />
                <span className="sr-only">LinkedIn</span>
              </a>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Áreas de Atuação</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="text-muted-foreground hover:text-foreground">
                  Direito Civil
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-foreground">
                  Direito Trabalhista
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-foreground">
                  Direito Empresarial
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-foreground">
                  Direito Tributário
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-foreground">
                  Direito do Consumidor
                </a>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Links Úteis</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#sobre" className="text-muted-foreground hover:text-foreground">
                  Sobre Nós
                </a>
              </li>
              <li>
                <a href="#vantagens" className="text-muted-foreground hover:text-foreground">
                  Vantagens
                </a>
              </li>
              <li>
                <a href="#depoimentos" className="text-muted-foreground hover:text-foreground">
                  Depoimentos
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-foreground">
                  Blog Jurídico
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-foreground">
                  Política de Privacidade
                </a>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Contato</h3>
            <ul className="space-y-2 text-sm">
              <li className="text-muted-foreground">Av. Paulista, 1000, São Paulo - SP</li>
              <li>
                <a href="tel:+551199999999" className="text-muted-foreground hover:text-foreground">
                  +55 (11) 9999-9999
                </a>
              </li>
              <li>
                <a href="mailto:contato@jurisconsult.com" className="text-muted-foreground hover:text-foreground">
                  contato@jurisconsult.com
                </a>
              </li>
              <li className="text-muted-foreground">Segunda a Sexta: 9h às 18h</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t pt-6 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} JurisConsult. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  )
}
