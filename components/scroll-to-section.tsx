"use client"

import { useEffect } from "react"

export function ScrollToSection() {
  useEffect(() => {
    // Função para lidar com cliques em links de âncora
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement

      // Verificar se o elemento clicado é um link de âncora
      if (target.tagName === "A" && target.getAttribute("href")?.startsWith("#")) {
        e.preventDefault()

        const targetId = target.getAttribute("href")?.substring(1)
        const targetElement = document.getElementById(targetId || "")

        if (targetElement) {
          // Rolar suavemente para o elemento
          window.scrollTo({
            top: targetElement.offsetTop - 80, // Ajuste para compensar a altura do header
            behavior: "smooth",
          })

          // Atualizar a URL sem recarregar a página
          history.pushState(null, "", target.getAttribute("href") || "")
        }
      }
    }

    // Adicionar event listener para links de âncora
    document.addEventListener("click", handleAnchorClick)

    // Verificar se há um hash na URL ao carregar a página
    if (window.location.hash) {
      const targetId = window.location.hash.substring(1)
      const targetElement = document.getElementById(targetId)

      if (targetElement) {
        setTimeout(() => {
          window.scrollTo({
            top: targetElement.offsetTop - 80,
            behavior: "smooth",
          })
        }, 100)
      }
    }

    // Limpar event listener ao desmontar o componente
    return () => {
      document.removeEventListener("click", handleAnchorClick)
    }
  }, [])

  return null
}
