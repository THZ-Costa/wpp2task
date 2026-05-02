"use client";

import { CheckCircle2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import type { Demand } from "@/types/demand";
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

type ApproveDemandModalProps = {
  demand: Demand;
};

export function ApproveDemandModal({ demand }: ApproveDemandModalProps) {
  const [open, setOpen] = useState(false);

  function handleApprove() {
    toast.success("Demanda aprovada", {
      description: "O card Jira será criado quando a API estiver conectada.",
    });
    setOpen(false);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <CheckCircle2 className="size-4" />
          Aprovar
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>Preview do card Jira</DialogTitle>
          <DialogDescription>
            Este conteúdo será enviado para o Jira após a aprovação.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 rounded-lg border bg-muted/20 p-4">
          <div>
            <p className="text-xs font-medium uppercase text-muted-foreground">
              Summary
            </p>
            <p className="mt-1 font-medium">{demand.title}</p>
          </div>
          <Separator />
          <div>
            <p className="text-xs font-medium uppercase text-muted-foreground">
              Description
            </p>
            <p className="mt-1 text-sm leading-6 text-muted-foreground">
              {demand.description}
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-3">
            <div>
              <p className="text-xs font-medium uppercase text-muted-foreground">
                Grupo
              </p>
              <p className="mt-1 text-sm">{demand.groupName}</p>
            </div>
            <div>
              <p className="text-xs font-medium uppercase text-muted-foreground">
                Tipo
              </p>
              <p className="mt-1 text-sm">{demand.type}</p>
            </div>
            <div>
              <p className="text-xs font-medium uppercase text-muted-foreground">
                Prioridade
              </p>
              <p className="mt-1 text-sm">{demand.priority}</p>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancelar
          </Button>
          <Button onClick={handleApprove}>Criar card no Jira</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
