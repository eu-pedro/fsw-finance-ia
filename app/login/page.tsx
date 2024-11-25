import Image from "next/image";
import { Button } from "../_components/ui/button";
import { LogInIcon } from "lucide-react";

export default function LoginPage() {
  return (
    <div className="grid grid-cols-2 h-full">
      <div className="flex h-full flex-col justify-center p-8 max-w-[550px] mx-auto">
        <Image src="/logo.svg" width={173} height={39} alt="Finance IA" className="mb-8" />
        <h1 className="text-4xl font-bold mb-3">Bem vindo</h1>
        <p className="text-muted-foreground mb-8">
          A Finance
          AI é uma plataforma de gestão financeira que utiliza IA para monitorar suas movimentações, e oferecer insights personalizados, facilitando o controle do seu orçamento.
        </p>
        <Button variant="outline">
          <LogInIcon className="mr-2" />
          Fazer Login ou criar conta
        </Button>
      </div>
      <div className="relative h-full w-full">
        <Image src="/login.png" alt="Faça login" fill className="object-cover" />

      </div>
    </div>
  )
}