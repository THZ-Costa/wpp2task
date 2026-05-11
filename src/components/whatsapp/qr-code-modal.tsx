"use client";

import { Loader2, RefreshCw } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";

const fakeQrMatrix = [
  "1111111001011",
  "1000001010100",
  "1011101001110",
  "1011101010001",
  "1011101011010",
  "1000001010111",
  "1111111010101",
  "0000000011000",
  "1110101110111",
  "0011010010100",
  "1010011111001",
  "0111000101110",
  "1101111010011",
];

const steps = [
  "Abra o WhatsApp no celular do número empresarial.",
  "Toque em Configurações › Aparelhos conectados.",
  "Selecione “Conectar um aparelho”.",
  "Aponte a câmera para o QR code ao lado.",
];

type QrCodeModalProps = {
  children: React.ReactNode;
};

export function QrCodeModal({ children }: QrCodeModalProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>Conectar WhatsApp</DialogTitle>
          <DialogDescription>
            Escaneie o QR code com o WhatsApp do número empresarial. Após
            conectar, buscamos seus grupos automaticamente.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 sm:grid-cols-[minmax(0,200px)_minmax(0,1fr)]">
          <div className="flex flex-col items-center gap-3 rounded-lg border bg-muted/20 p-4">
            <div className="grid size-44 grid-cols-[repeat(13,minmax(0,1fr))] gap-1 rounded-lg bg-white p-3 ring-1 ring-border">
              {fakeQrMatrix.flatMap((row, rowIndex) =>
                row.split("").map((cell, columnIndex) => (
                  <span
                    key={`${rowIndex}-${columnIndex}`}
                    className={
                      cell === "1" ? "rounded-[2px] bg-neutral-950" : "bg-white"
                    }
                  />
                ))
              )}
            </div>
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <Loader2 className="size-3 animate-spin" />
              Aguardando conexão · expira em 02:00
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                Passo a passo
              </p>
              <ol className="mt-2 space-y-2 text-sm">
                {steps.map((step, index) => (
                  <li key={step} className="flex gap-2">
                    <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-foreground text-xs font-medium text-background">
                      {index + 1}
                    </span>
                    <span className="leading-5 text-muted-foreground">
                      {step}
                    </span>
                  </li>
                ))}
              </ol>
            </div>

            <Separator />

            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                Após conectar
              </p>
              <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
                <li>• Buscamos seus grupos automaticamente.</li>
                <li>• Você escolhe quais monitorar.</li>
                <li>• A IA começa a analisar em até 15 min.</li>
              </ul>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline">
            <RefreshCw className="size-4" />
            Gerar novo QR
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
