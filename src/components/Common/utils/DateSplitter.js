const getDateCompletor = day => {
  if (day >= 4 && day < 21) {
    return 'th';
  }
  switch (day % 10) {
    case 1:
      return 'st';
    case 2:
      return 'nd';
    case 3:
      return 'rd';
    default:
      return 'th';
  }
};

export const deriveDateDetails = (passedDate, requiredType) => {
  const date = new Date(passedDate);
  const monthValue = date.getMonth();
  const year = date.getFullYear();
  const day = date.getDate();
  const dateCompletor = getDateCompletor(day);
  const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ];
  const month = monthNames[monthValue];
  let hours = date.getHours().toString();
  if (hours && hours.length == 1) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes().toString();
  if (minutes && minutes.length == 1) {
    minutes = `0${minutes}`;
  }
  switch (requiredType) {
    case 'DATE':
      return day;
    case 'YEAR':
      return year;
    case 'MONTH':
      return month ? month.substr(0, 3) : '';
    case 'COMPLETOR':
      return dateCompletor;
    case 'TIME':
      return `${hours}:${minutes}`;
    default:
      return date;
  }
};
