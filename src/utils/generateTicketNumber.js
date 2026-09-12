import { format } from 'date-fns';

export function generateTicketNumber() {
  const now = new Date();
  const stamp = format(now, 'yyyyMMdd-HHmmss');
  const random = Math.floor(Math.random() * 900 + 100);
  return `T-${stamp}-${random}`;
}
