import dayjs from 'dayjs';

export const formatDate = (date: Date | string, format?: string) => {
  const formatDate = format || 'YYYY-MM-DD';
  return dayjs(date).format(formatDate);
};
