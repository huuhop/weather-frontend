import dayjs from 'dayjs';

export const formatTimestamp = (timestamp: string | Date): string => {
  return dayjs(timestamp).format('DD MMM YYYY HH:mm:ss');
};