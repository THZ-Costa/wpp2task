import type { SummaryTopic } from "@/types/summary";
import { Badge } from "@/components/ui/badge";

type TopicBadgeListProps = {
  topics: SummaryTopic[];
};

export function TopicBadgeList({ topics }: TopicBadgeListProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {topics.map((topic) => (
        <Badge key={topic.id} variant="secondary">
          {topic.name}
        </Badge>
      ))}
    </div>
  );
}
