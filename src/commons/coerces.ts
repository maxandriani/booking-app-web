export function coerceString(value: any): string {
  if (typeof value === 'string') return value;
  if (value instanceof Date) return JSON.stringify(value).replaceAll('"', '');
  if (typeof value === 'object') return JSON.stringify(value).replaceAll(/(^\")|(\"$)/, '');
  return value?.toString();
}