import dayjs from 'dayjs';

export const getHoursToDisplay = (startHour: number, endHour: number) => {
  const dates = [];
  let startDate = dayjs('1970-01-01').hour(startHour);
  dates.push(startDate);
  const endDate = dayjs('1970-01-01').hour(endHour);

  while (startDate.isBefore(endDate)) {
    startDate = startDate.add(1, 'hour');
    dates.push(startDate);
  }

  return dates;
};
