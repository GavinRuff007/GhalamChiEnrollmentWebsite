// utils/date.js
import DateObject from "react-date-object";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";

export const toGregorian = (date) =>
  new DateObject({ date, calendar: persian, locale: persian_fa }).toDate();

export const dayDiff = (start, end) =>
  Math.floor((end - start) / 86400000) + 1;
