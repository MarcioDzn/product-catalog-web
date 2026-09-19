export function formatRelativeDate(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();

  const diffSeconds = Math.floor(
    (date.getTime() - now.getTime()) / 1000
  );

  const formatter = new Intl.RelativeTimeFormat("pt-BR", {
    numeric: "auto",
  });

  if (Math.abs(diffSeconds) < 60) {
    return formatter.format(diffSeconds, "second");
  }

  const diffMinutes = Math.floor(diffSeconds / 60);

  if (Math.abs(diffMinutes) < 60) {
    return formatter.format(diffMinutes, "minute");
  }

  const diffHours = Math.floor(diffMinutes / 60);

  if (Math.abs(diffHours) < 24) {
    return formatter.format(diffHours, "hour");
  }

  const diffDays = Math.floor(diffHours / 24);

  if (Math.abs(diffDays) < 7) {
    return formatter.format(diffDays, "day");
  }

  const diffWeeks = Math.floor(diffDays / 7);

  if (Math.abs(diffWeeks) < 4) {
    return formatter.format(diffWeeks, "week");
  }

  const diffMonths =
    (date.getFullYear() - now.getFullYear()) * 12 +
    (date.getMonth() - now.getMonth());

  if (Math.abs(diffMonths) < 12) {
    return formatter.format(diffMonths, "month");
  }

  const diffYears = date.getFullYear() - now.getFullYear();

  return formatter.format(diffYears, "year");
}
