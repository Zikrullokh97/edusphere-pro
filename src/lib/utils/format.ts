/**
 * SSR-safe formatting utilities
 * Prevents hydration mismatches between server and client
 */

/**
 * Format number with spaces as thousand separators (SSR-safe)
 * Server: "45 800 000"
 * Client: "45,800,000" → "45 800 000"
 */
export function formatNumber(value: number | string | undefined | null): string {
  if (value === undefined || value === null) return '0';
  
  const num = typeof value === 'string' ? parseFloat(value.replace(/\s/g, '').replace(/,/g, '')) : value;
  
  if (isNaN(num)) return '0';
  
  // Use spaces as thousand separators (Uzbek locale standard)
  return num.toLocaleString('ru-RU').replace(/\u00A0/g, ' ');
}

/**
 * Format currency in Uzbek Som
 */
export function formatCurrency(amount: number | string | undefined | null): string {
  if (amount === undefined || amount === null) return '0 so\'m';
  
  const num = typeof amount === 'string' ? parseFloat(amount.replace(/\s/g, '').replace(/,/g, '')) : amount;
  
  if (isNaN(num)) return '0 so\'m';
  
  const formatted = formatNumber(num);
  return `${formatted} so'm`;
}

/**
 * Format date consistently (SSR-safe)
 */
export function formatDate(date: Date | string | undefined | null, format: 'short' | 'long' | 'time' = 'short'): string {
  if (!date) return '-';
  
  const d = typeof date === 'string' ? new Date(date) : date;
  
  if (isNaN(d.getTime())) return '-';
  
  // Use fixed locale to prevent hydration mismatches
  const locale = 'ru-RU';
  
  switch (format) {
    case 'short':
      return d.toLocaleDateString(locale, {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
      });
    case 'long':
      return d.toLocaleDateString(locale, {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
      });
    case 'time':
      return d.toLocaleTimeString(locale, {
        hour: '2-digit',
        minute: '2-digit',
      });
    default:
      return d.toLocaleDateString(locale);
  }
}

/**
 * Format date range
 */
export function formatDateRange(start: Date | string, end: Date | string): string {
  const startDate = typeof start === 'string' ? new Date(start) : start;
  const endDate = typeof end === 'string' ? new Date(end) : end;
  
  return `${formatDate(startDate, 'short')} - ${formatDate(endDate, 'short')}`;
}

/**
 * Format phone number
 */
export function formatPhone(phone: string | undefined | null): string {
  if (!phone) return '-';
  
  // Remove all non-digit characters
  const digits = phone.replace(/\D/g, '');
  
  // Format as +998 XX XXX XX XX
  if (digits.length === 9) {
    return `+998 ${digits.slice(0, 2)} ${digits.slice(2, 5)} ${digits.slice(5, 7)} ${digits.slice(7)}`;
  }
  
  return phone;
}

/**
 * Format percentage
 */
export function formatPercentage(value: number | string | undefined | null, decimals: number = 1): string {
  if (value === undefined || value === null) return '0%';
  
  const num = typeof value === 'string' ? parseFloat(value) : value;
  
  if (isNaN(num)) return '0%';
  
  return `${num.toFixed(decimals)}%`;
}

/**
 * Truncate text
 */
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return `${text.slice(0, maxLength)}...`;
}

/**
 * Format file size
 */
export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
}