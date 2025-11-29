import DateObject from "react-date-object";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";

export const calcSupportFee = (supporter, start, end) => {
  if (!supporter || !start || !end) return null;

  const daily = supporter.dailyPrice || 0;

  const sd = new DateObject({ date: start, calendar: persian, locale: persian_fa }).toDate();
  const ed = new DateObject({ date: end, calendar: persian, locale: persian_fa }).toDate();

  const diff = Math.floor((ed - sd) / 86400000) + 1;

  return {
    dailyPrice: daily,
    days: diff,
    fee: diff * daily,
  };
};
