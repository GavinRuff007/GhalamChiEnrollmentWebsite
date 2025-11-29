import { useEffect } from "react";
import DateObject from "react-date-object";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import { updateRegistrationInfo } from "../../../../slices/formSlice";

export const useSupportCalculator = (reg, supporters, dispatch) => {
  useEffect(() => {

    if (!reg.specialSupport) return;

    const s = reg.supportInfo;
    if (!s?.supporterId || !s.startDate || !s.endDate) return;

    const supporter = supporters.find((sp) => sp.id == s.supporterId);
    if (!supporter) return;

    const daily = supporter.dailyPrice || 0;

    const sd = new DateObject({
      date: s.startDate,
      calendar: persian,
      locale: persian_fa,
    }).toDate();

    const ed = new DateObject({
      date: s.endDate,
      calendar: persian,
      locale: persian_fa,
    }).toDate();

    const diffDays = Math.floor((ed - sd) / 86400000) + 1;
    const total = diffDays * daily;

    // جلوگیری از لوپ
    if (
      s.fee === total &&
      s.days === diffDays &&
      s.dailyPrice === daily
    ) {
      return;
    }

    const newSupportInfo = {
      ...s,
      dailyPrice: daily,
      days: diffDays,
      fee: total,
    };


    dispatch(
      updateRegistrationInfo({
        supportInfo: newSupportInfo,
      })
    );
  }, [
    reg.specialSupport,
    reg.supportInfo?.supporterId,
    reg.supportInfo?.startDate,
    reg.supportInfo?.endDate,
    supporters,
    dispatch,
  ]);
};
