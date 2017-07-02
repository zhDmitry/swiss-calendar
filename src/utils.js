export const enumerateDaysBetweenDates = (startDate, endDate) => {
  const now = startDate.clone(),
    dates = [];

  while (now.isBefore(endDate) || now.isSame(endDate)) {
    dates.push(now.format("M/D/YYYY"));
    now.add("days", 1);
  }
  return dates;
};
