"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getApiErrorMessage } from "@/lib/api-errors";
import { resetPassword } from "@/services/auth-service";

const schema = z
  .object({
    password: z.string().min(8, "A senha precisa ter ao menos 8 caracteres"),
    passwordConfirmation: z.string().min(1, "Confirme sua senha"),
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    message: "As senhas não conferem",
    path: ["passwordConfirmation"],
  });

type FormValues = z.infer<typeof schema>;

function ResetPasswordForm() {
  const router = useRouter();
  const params = useSearchParams();
  const token = params.get("token") ?? "";
  const email = params.get("email") ?? "";

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { password: "", passwordConfirmation: "" },
  });

  const missingParams = !token || !email;

  async function onSubmit(values: FormValues) {
    try {
      await resetPassword({
        token,
        email,
        password: values.password,
        passwordConfirmation: values.passwordConfirmation,
      });
      toast.success("Senha redefinida com sucesso. Faça login.");
      router.push("/login");
    } catch (error) {
      toast.error(getApiErrorMessage(error, "Não foi possível redefinir a senha."));
    }
  }

  return (
    <Card className="w-full max-w-sm rounded-lg">
      <CardHeader>
        <CardTitle className="text-xl">Redefinir senha</CardTitle>
      </CardHeader>
      <CardContent>
        {missingParams ? (
          <p className="text-sm text-muted-foreground">
            Link inválido. Solicite uma nova recuperação em{" "}
            <Link href="/forgot-password" className="font-medium text-foreground">
              Esqueci minha senha
            </Link>
            .
          </p>
        ) : (
          <form className="space-y-4" onSubmit={handleSubmit(onSubmit)} noValidate>
            <div className="space-y-1.5">
              <Label>Email</Label>
              <Input value={email} disabled readOnly />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="password">Nova senha</Label>
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
              <Label htmlFor="passwordConfirmation">Confirmar nova senha</Label>
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
              Redefinir senha
            </Button>
          </form>
        )}
        <p className="mt-4 text-center text-sm text-muted-foreground">
          <Link href="/login" className="font-medium text-foreground">
            Voltar para login
          </Link>
        </p>
      </CardContent>
    </Card>
  );
}

export default function ResetPasswordPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-muted/30 px-4 py-10">
      <Suspense fallback={<Card className="w-full max-w-sm rounded-lg"><CardContent className="p-6">Carregando…</CardContent></Card>}>
        <ResetPasswordForm />
      </Suspense>
    </main>
  );
}
