import { MessageSquare } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export default function RegisterPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-muted/30 px-4 py-10">
      <Card className="w-full max-w-md rounded-lg">
        <CardHeader className="text-center">
          <div className="mx-auto flex size-10 items-center justify-center rounded-lg bg-emerald-500 text-white">
            <MessageSquare className="size-5" />
          </div>
          <CardTitle className="text-xl">Criar conta</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="space-y-4">
            <Input placeholder="Nome" />
            <Input placeholder="Empresa" />
            <Input type="email" placeholder="Email" />
            <Input type="password" placeholder="Senha" />
            <Button className="w-full">Cadastrar</Button>
          </form>
          <p className="mt-4 text-center text-sm text-muted-foreground">
            Já tem conta?{" "}
            <Link href="/login" className="font-medium text-foreground">
              Entrar
            </Link>
          </p>
        </CardContent>
      </Card>
    </main>
  );
}
