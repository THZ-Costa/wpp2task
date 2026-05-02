import { MessageSquare } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export default function LoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-muted/30 px-4 py-10">
      <Card className="w-full max-w-sm rounded-lg">
        <CardHeader className="text-center">
          <div className="mx-auto flex size-10 items-center justify-center rounded-lg bg-emerald-500 text-white">
            <MessageSquare className="size-5" />
          </div>
          <CardTitle className="text-xl">Entrar no wpp2task</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="space-y-4">
            <Input type="email" placeholder="Email" />
            <Input type="password" placeholder="Senha" />
            <Button className="w-full">Entrar</Button>
          </form>
          <div className="mt-4 flex items-center justify-between text-sm">
            <Link href="/forgot-password" className="text-muted-foreground">
              Esqueci minha senha
            </Link>
            <Link href="/register" className="font-medium">
              Criar conta
            </Link>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
