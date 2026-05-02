import type { DashboardMetrics, MessageVolumePoint } from "@/types/dashboard";

export async function getDashboardMetrics(): Promise<DashboardMetrics> {
  return {
    activeNumbers: 4,
    monitoredGroups: 18,
    messagesToday: 1248,
    messagesThisWeek: 8426,
    pendingDemands: 3,
    approvalRate: 72,
  };
}

export async function getMessageVolume(): Promise<MessageVolumePoint[]> {
  const baseDate = new Date("2026-05-02T12:00:00.000Z");

  return Array.from({ length: 30 }, (_, index) => {
    const date = new Date(baseDate);
    date.setDate(baseDate.getDate() - (29 - index));
    const day = date.getDate();
    const messages = 560 + ((index * 137) % 520) + (index % 5) * 72;

    return {
      date: date.toISOString(),
      label: `${String(day).padStart(2, "0")}/04`,
      messages,
      demands: Math.max(1, Math.round(messages / 260)),
    };
  }).map((point) => {
    const date = new Date(point.date);

    return {
      ...point,
      label: `${String(date.getDate()).padStart(2, "0")}/${String(
        date.getMonth() + 1
      ).padStart(2, "0")}`,
    };
  });
}
