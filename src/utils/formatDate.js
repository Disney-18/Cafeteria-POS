import { format } from 'date-fns';
import { es } from 'date-fns/locale';

export function formatDateTime(date) {
  return format(new Date(date), 'dd/MM/yyyy HH:mm', { locale: es });
}

export function formatTime(date) {
  return format(new Date(date), 'HH:mm:ss', { locale: es });
}

export function formatDateLong(date) {
  return format(new Date(date), "EEEE d 'de' MMMM 'de' yyyy", { locale: es });
}

export function formatDayKey(date = new Date()) {
  return format(new Date(date), 'yyyy-MM-dd');
}
