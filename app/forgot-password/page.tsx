"use client"

import { useState } from "react"
import Link from "next/link"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { ScaleIcon } from "lucide-react"
import { toast } from "@/components/ui/use-toast"

const formSchema = z.object({
  email: z.string().email({ message: "Email inválido" }),
})

export default function ForgotPasswordPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true)

    try {
      // Simulação de envio - aqui você conectaria com sua API
      console.log(values)

      // Simular um atraso de rede
      await new Promise((resolve) => setTimeout(resolve, 1000))

      setIsSubmitted(true)
    } catch (error) {
      toast({
        title: "Erro ao enviar email",
        description: "Ocorreu um erro ao processar sua solicitação. Tente novamente.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen flex-col">
      <div className="container flex flex-col items-center justify-center min-h-screen py-12 px-4">
        <div className="mx-auto flex w-full flex-col justify-center space-y-8 sm:w-[350px]">
          <div className="flex flex-col space-y-2 text-center">
            <Link href="/" className="flex items-center justify-center gap-2 mb-8">
              <ScaleIcon className="h-6 w-6 text-primary" />
              <span className="text-xl font-bold">JurisConsult</span>
            </Link>
            <h1 className="text-2xl font-semibold tracking-tight">Recuperar senha</h1>
            <p className="text-sm text-muted-foreground">
              Digite seu email para receber um link de recuperação de senha
            </p>
          </div>

          {isSubmitted ? (
            <div className="bg-muted p-8 rounded-lg text-center">
              <h2 className="font-medium mb-4">Email enviado!</h2>
              <p className="text-sm text-muted-foreground mb-6">
                Verifique sua caixa de entrada para instruções sobre como redefinir sua senha.
              </p>
              <Link href="/login">
                <Button variant="link">Voltar para o login</Button>
              </Link>
            </div>
          ) : (
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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

                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? "Enviando..." : "Enviar link de recuperação"}
                </Button>
              </form>
            </Form>
          )}

          <div className="text-center text-sm">
            <Link href="/login" className="underline underline-offset-4 hover:text-primary">
              Voltar para o login
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
