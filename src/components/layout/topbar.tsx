"use client";

import { Bell, Menu, Moon, Search, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

import { AppSidebar } from "@/components/layout/app-sidebar";
import { CompanySwitcher } from "@/components/layout/company-switcher";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export function Topbar() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = mounted && resolvedTheme === "dark";

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center border-b bg-background/90 px-4 backdrop-blur supports-backdrop-filter:bg-background/75 sm:px-6">
      <div className="flex w-full items-center gap-3">
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="md:hidden"
              aria-label="Abrir menu"
            >
              <Menu className="size-4" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-72 p-0">
            <AppSidebar className="h-full border-r-0" />
          </SheetContent>
        </Sheet>

        <div className="hidden md:block">
          <CompanySwitcher />
        </div>

        <div className="relative min-w-0 flex-1 md:max-w-md">
          <Search className="pointer-events-none absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            aria-label="Buscar"
            placeholder="Buscar demandas, grupos ou tópicos"
            className="h-8 bg-muted/40 pl-8"
          />
        </div>

        <div className="hidden sm:block md:hidden">
          <CompanySwitcher />
        </div>

        <Button variant="ghost" size="icon" aria-label="Notificações">
          <Bell className="size-4" />
        </Button>

        <Button
          variant="ghost"
          size="icon"
          aria-label="Alternar tema"
          onClick={() => setTheme(isDark ? "light" : "dark")}
        >
          {isDark ? <Sun className="size-4" /> : <Moon className="size-4" />}
        </Button>
      </div>
    </header>
  );
}
