const map24: Record<string, string> = {
  '12': '12',
  '01': '13',
  '02': '14',
  '03': '15',
  '04': '16',
  '05': '17',
  '06': '18',
  '07': '19',
  '08': '20',
  '09': '21',
  '10': '22',
  '11': '23',
};

const isValidTime = (timeString: string): boolean => {
  const time = timeString.trim().match(/(\d+)(?::(\d\d))?\s*(a|p)?/i);
  const time24hr = timeString.trim().match(/(\d\d)[:.]?(\d\d)/);
  const num = timeString.replace(/[^0-9]/g, '');

  if (!time && !time24hr) {
    return false;
  }
  if (time && !time[1]) {
    return false;
  }
  if (num.length > 4) {
    return false;
  }
  if (num.length === 2 && parseInt(num, 10) > 12) {
    return false;
  }
  return true;
};

const formatSemi24 = (time: string): string => {
  if (time.length === 1) {
    return `0${time}00`;
  }
  if (time.length === 2) {
    return `${time}00`;
  }
  if (time.length === 3) {
    return `0${time}`;
  }
  return time;
};

const checkHour = (hour: string, meridiem: string): string | null => {
  if (hour > '24') {
    return null;
  }
  if (hour === '12' && meridiem === 'a') {
    return '00';
  }
  if (hour < '12' && meridiem === 'p') {
    return map24[hour];
  }
  return hour;
};

const removeSpacer = (time: string): string => {
  return time.replace(/[:.]/, '');
};

const checkMinute = (minute: string): string | null => {
  if (minute > '59') {
    return null;
  }
  return minute;
};

const convertTo24hrTime = (
  time: string
): { hour: number; minute: number } | null => {
  const timeArray = time.toLowerCase().split(/(p|a)/i);
  const meridiem = timeArray[1];
  const semi24 = formatSemi24(timeArray[0].trim());
  const hour = checkHour(semi24.substring(0, 2), meridiem);
  const minute = checkMinute(semi24.substring(2, 4));

  if (!hour || !minute) {
    return null;
  }
  return {
    hour: parseInt(hour, 10),
    minute: parseInt(minute, 10),
  };
};

const assignToDate = (time: { hour: number; minute: number }): Date => {
  const dateTime = new Date();
  dateTime.setHours(time.hour);
  dateTime.setMinutes(time.minute);
  dateTime.setSeconds(0, 0);
  return dateTime;
};

export const parseTime = (time: string): string | Date => {
  const trimmed = time.toString().trim();
  if (!isValidTime(trimmed)) {
    throw RangeError('Invalid time format');
  }

  const time2 = convertTo24hrTime(removeSpacer(trimmed));

  if (!time2) {
    throw RangeError('invalid time format');
  }
  return assignToDate(time2);
};

export const formatNumber = (
  value: number,
  prependZero: boolean,
  amPm?: boolean
): string => {
  return amPm || prependZero
    ? (value < 10 ? '0' : '') + value
    : value.toString();
};
