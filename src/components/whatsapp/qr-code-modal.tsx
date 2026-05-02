"use client";

import { RefreshCw } from "lucide-react";

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

type QrCodeModalProps = {
  children: React.ReactNode;
};

export function QrCodeModal({ children }: QrCodeModalProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Conectar WhatsApp</DialogTitle>
          <DialogDescription>
            Escaneie o QR code com o WhatsApp do número empresarial.
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col items-center gap-4 rounded-lg border bg-muted/20 p-6">
          <div className="grid size-56 grid-cols-[repeat(13,minmax(0,1fr))] gap-1 rounded-lg bg-white p-3 ring-1 ring-border">
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
          <p className="text-sm text-muted-foreground">
            Código expira em 02:00
          </p>
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
