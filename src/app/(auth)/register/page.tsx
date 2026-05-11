"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, MessageSquare } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getApiErrorMessage } from "@/lib/api-errors";
import { register as registerUser } from "@/services/auth-service";

const schema = z
  .object({
    name: z.string().min(2, "Informe seu nome"),
    email: z.string().email("Informe um email válido"),
    password: z.string().min(8, "A senha precisa ter ao menos 8 caracteres"),
    passwordConfirmation: z.string().min(1, "Confirme sua senha"),
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    message: "As senhas não conferem",
    path: ["passwordConfirmation"],
  });

type FormValues = z.infer<typeof schema>;

export default function RegisterPage() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { name: "", email: "", password: "", passwordConfirmation: "" },
  });

  async function onSubmit(values: FormValues) {
    try {
      await registerUser(values);
      toast.success("Conta criada com sucesso! Faça login para continuar.");
      router.push("/login");
    } catch (error) {
      toast.error(getApiErrorMessage(error, "Não foi possível criar a conta."));
    }
  }

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
          <form className="space-y-4" onSubmit={handleSubmit(onSubmit)} noValidate>
            <div className="space-y-1.5">
              <Label htmlFor="name">Nome</Label>
              <Input id="name" autoComplete="name" {...register("name")} />
              {errors.name && (
                <p className="text-xs text-destructive">{errors.name.message}</p>
              )}
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" autoComplete="email" {...register("email")} />
              {errors.email && (
                <p className="text-xs text-destructive">{errors.email.message}</p>
              )}
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="password">Senha</Label>
              <Input
                id="password"
                type="password"
                autoComplete="new-password"
                {...register("password")}
              />
              {errors.password && (
                <p className="text-xs text-destructive">{errors.password.message}</p>
              )}
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="passwordConfirmation">Confirmar senha</Label>
              <Input
                id="passwordConfirmation"
                type="password"
                autoComplete="new-password"
                {...register("passwordConfirmation")}
              />
              {errors.passwordConfirmation && (
                <p className="text-xs text-destructive">{errors.passwordConfirmation.message}</p>
              )}
            </div>
            <Button className="w-full" disabled={isSubmitting}>
              {isSubmitting && <Loader2 className="mr-2 size-4 animate-spin" />}
              Cadastrar
            </Button>
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
