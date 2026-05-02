"use client";

import {
  Activity,
  Building2,
  ClipboardList,
  CreditCard,
  DollarSign,
  FileText,
  LayoutDashboard,
  Layers,
  MessageSquare,
  Plug,
  Shield,
  Smartphone,
  Users,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { LucideIcon } from "lucide-react";

import { cn } from "@/lib/utils";

type NavigationItem = {
  title: string;
  href: string;
  icon: LucideIcon;
};

const navigationGroups: Array<{
  title: string;
  items: NavigationItem[];
}> = [
  {
    title: "Operação",
    items: [
      { title: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
      { title: "Demandas", href: "/demands", icon: ClipboardList },
      { title: "Resumos", href: "/summaries", icon: FileText },
      { title: "Tópicos", href: "/topics", icon: Layers },
      { title: "Atividade", href: "/group-activity", icon: Activity },
    ],
  },
  {
    title: "Integrações",
    items: [
      { title: "Números", href: "/whatsapp/numbers", icon: Smartphone },
      { title: "Grupos", href: "/whatsapp/groups", icon: Users },
      { title: "Jira", href: "/jira", icon: Plug },
      { title: "Billing", href: "/billing", icon: CreditCard },
    ],
  },
  {
    title: "Master",
    items: [
      { title: "Admin", href: "/admin", icon: Shield },
      { title: "Empresas", href: "/admin/companies", icon: Building2 },
      { title: "Receita", href: "/admin/revenue", icon: DollarSign },
    ],
  },
];

function isActive(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function SidebarContent() {
  const pathname = usePathname();

  return (
    <div className="flex h-full flex-col">
      <Link
        href="/dashboard"
        className="flex h-16 items-center gap-2 border-b px-5"
      >
        <span className="flex size-8 items-center justify-center rounded-lg bg-emerald-500 text-white shadow-sm shadow-emerald-500/20">
          <MessageSquare className="size-4" />
        </span>
        <span className="text-base font-semibold tracking-normal">
          wpp2task
        </span>
      </Link>

      <nav className="flex-1 space-y-6 overflow-y-auto px-3 py-4">
        {navigationGroups.map((group) => (
          <div key={group.title}>
            <p className="px-2 pb-2 text-xs font-medium text-muted-foreground">
              {group.title}
            </p>
            <div className="space-y-1">
              {group.items.map((item) => {
                const Icon = item.icon;
                const active = isActive(pathname, item.href);

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "flex h-9 items-center gap-2 rounded-lg px-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground",
                      active &&
                        "bg-foreground text-background hover:bg-foreground hover:text-background dark:bg-foreground dark:text-background"
                    )}
                  >
                    <Icon className="size-4" />
                    <span>{item.title}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>
    </div>
  );
}

export function AppSidebar({ className }: { className?: string }) {
  return (
    <aside
      className={cn(
        "border-r bg-sidebar text-sidebar-foreground",
        className
      )}
    >
      <SidebarContent />
    </aside>
  );
}
