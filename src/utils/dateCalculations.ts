import { addDays, differenceInDays, format } from 'date-fns';

export function calculateDueDate(lmp: Date): Date {
  return addDays(lmp, 280);
}

export function calculateCurrentWeek(lmp: Date): number {
  const days = differenceInDays(new Date(), lmp);
  if (days < 0) return 0;
  return Math.floor(days / 7) + 1;
}

export function calculateCurrentDay(lmp: Date): number {
  const days = differenceInDays(new Date(), lmp);
  if (days < 0) return 0;
  return days % 7;
}

export function getDaysUntilDueDate(dueDate: Date): number {
  return differenceInDays(dueDate, new Date());
}

export function getTrimester(week: number): 1 | 2 | 3 {
  if (week <= 13) return 1;
  if (week <= 27) return 2;
  return 3;
}

export function formatDate(date: Date, _locale: string = 'en'): string {
  return format(date, 'dd/MM/yyyy');
}

export function getLMPFromDueDate(dueDate: Date): Date {
  return addDays(dueDate, -280);
}

export function getLMPFromIVF(transferDate: Date, embryoAgeDays: number): Date {
  // IVF: LMP = transfer date - (embryo age + 14 days)
  return addDays(transferDate, -(embryoAgeDays + 14));
}
