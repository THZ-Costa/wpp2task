"use client";

import { ArrowUpDown, Hash } from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";

import { formatDateTime, formatNumber } from "@/lib/format";
import { cn } from "@/lib/utils";
import type { SummaryTopic } from "@/types/summary";
import { TopicTrendPill } from "@/components/topics/topic-trend-pill";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

type SortKey = "frequency" | "demandsCount" | "groupsCount" | "firstAppearance";

type TopicsRankingTableProps = {
  topics: SummaryTopic[];
};

export function TopicsRankingTable({ topics }: TopicsRankingTableProps) {
  const [sortKey, setSortKey] = useState<SortKey>("frequency");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("desc");

  const sorted = useMemo(() => {
    const copy = [...topics];
    copy.sort((a, b) => {
      let av: number | string = a[sortKey];
      let bv: number | string = b[sortKey];
      if (sortKey === "firstAppearance") {
        av = new Date(a.firstAppearance).getTime();
        bv = new Date(b.firstAppearance).getTime();
      }
      if (av < bv) return sortDir === "asc" ? -1 : 1;
      if (av > bv) return sortDir === "asc" ? 1 : -1;
      return 0;
    });
    return copy;
  }, [topics, sortKey, sortDir]);

  function toggleSort(key: SortKey) {
    if (key === sortKey) {
      setSortDir(sortDir === "asc" ? "desc" : "asc");
    } else {
      setSortKey(key);
      setSortDir("desc");
    }
  }

  return (
    <Card className="rounded-lg">
      <CardContent className="px-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="pl-4">#</TableHead>
              <TableHead>Tópico</TableHead>
              <TableHead>
                <SortButton
                  active={sortKey === "frequency"}
                  dir={sortDir}
                  onClick={() => toggleSort("frequency")}
                >
                  Frequência
                </SortButton>
              </TableHead>
              <TableHead>Tendência</TableHead>
              <TableHead>
                <SortButton
                  active={sortKey === "groupsCount"}
                  dir={sortDir}
                  onClick={() => toggleSort("groupsCount")}
                >
                  Grupos
                </SortButton>
              </TableHead>
              <TableHead>
                <SortButton
                  active={sortKey === "firstAppearance"}
                  dir={sortDir}
                  onClick={() => toggleSort("firstAppearance")}
                >
                  1ª aparição
                </SortButton>
              </TableHead>
              <TableHead className="pr-4">
                <SortButton
                  active={sortKey === "demandsCount"}
                  dir={sortDir}
                  onClick={() => toggleSort("demandsCount")}
                >
                  Demandas
                </SortButton>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sorted.map((topic, index) => (
              <TableRow key={topic.id} className="cursor-pointer hover:bg-accent/40">
                <TableCell className="pl-4 text-sm text-muted-foreground">
                  {index + 1}
                </TableCell>
                <TableCell>
                  <Link
                    href={`/topics/${topic.slug}`}
                    className="flex items-center gap-2 font-medium hover:underline"
                  >
                    <span className="flex size-6 items-center justify-center rounded bg-muted text-muted-foreground">
                      <Hash className="size-3.5" />
                    </span>
                    {topic.name}
                  </Link>
                </TableCell>
                <TableCell className="font-medium tabular-nums">
                  {formatNumber(topic.frequency)}
                </TableCell>
                <TableCell>
                  <TopicTrendPill trend={topic.trend} />
                </TableCell>
                <TableCell className="text-sm text-muted-foreground tabular-nums">
                  {topic.groupsCount}
                </TableCell>
                <TableCell className="text-sm text-muted-foreground">
                  {formatDateTime(topic.firstAppearance).slice(0, 10)}
                </TableCell>
                <TableCell className="pr-4 text-sm tabular-nums">
                  {topic.demandsCount}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

function SortButton({
  active,
  dir,
  onClick,
  children,
}: {
  active: boolean;
  dir: "asc" | "desc";
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "inline-flex items-center gap-1 text-xs font-medium transition-colors hover:text-foreground",
        active ? "text-foreground" : "text-muted-foreground"
      )}
    >
      {children}
      <ArrowUpDown
        className={cn(
          "size-3 transition-transform",
          active && dir === "asc" && "rotate-180"
        )}
      />
    </button>
  );
}
