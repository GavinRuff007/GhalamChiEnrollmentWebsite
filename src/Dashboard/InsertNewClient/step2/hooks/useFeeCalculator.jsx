import { useState, useEffect, useCallback } from "react";
import DateObject from "react-date-object";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import { updateFeeInfo } from "../../../../slices/formSlice";
import { calcClassFee } from "../utils/calcClassFee";


const toEnglishDigits = (str = "") =>
  str.replace(/[۰-۹]/g, (d) => "۰۱۲۳۴۵۶۷۸۹".indexOf(d));

const seasonRanges = {
  SPRING: { endMonth: 3, endDay: 31 },
  SUMMER: { endMonth: 6, endDay: 31 },
  AUTUMN: { endMonth: 9, endDay: 30 },
  WINTER: { endMonth: 12, endDay: 29 },
};


export const useFeeCalculator = (
  reg,
  subjects,
  calculateFees,
  dispatch
) => {
  const [fees, setFees] = useState(null);

  const calcSupportFee = () => {
    if (!reg.specialSupport || !Array.isArray(reg.supportInfoList))
      return 0;

    return reg.supportInfoList.reduce((sum, s) => {
      if (!s.startDate || !s.season || !s.advisorDailyPrice)
        return sum;

      const year = Number(
        toEnglishDigits(s.startDate).split("/")[0]
      );

      const range = seasonRanges[s.season];
      if (!range) return sum;

      const endDate = new DateObject({
        calendar: persian,
        locale: persian_fa,
        year,
        month: range.endMonth,
        day: range.endDay,
      });

      const startDate = new DateObject({
        date: toEnglishDigits(s.startDate),
        calendar: persian,
        locale: persian_fa,
      });

      const days =
        Math.floor(
          (endDate.toDate() - startDate.toDate()) / 86400000
        ) + 1;

      if (days <= 0) return sum;

      return sum + days * Number(s.advisorDailyPrice);
    }, 0);
  };

  const calcExamFee = () => {
    if (!reg.examSeasons) return 0;

    let sum = 0;

    Object.values(reg.examSeasons).forEach((rows) => {
      rows.forEach((row) => {
        if (
          row.status === "registered" &&
          row.price
        ) {
          sum += Number(row.price);
        }
      });
    });

    return sum;
  };

  const calcAll = useCallback(async () => {
    if (!reg || !subjects?.length) return;

    const classSum = calcClassFee(
      reg.classInfo || [],
      subjects
    );

    const supportSum = calcSupportFee();
    const examSum = calcExamFee();

    let resp;
    try {
      resp = await calculateFees({
        typeOption: reg.typeOption,
        discountExam: reg.discountExam,
        discountClass: reg.discountClass,
        classCount: reg.classCount,
        bookVoucher: reg.bookVoucher,
        selectedClassFee: classSum,
        supportFee: supportSum,
        examFee: examSum, 
      }).unwrap();
    } catch {
      return;
    }

    const newFees = {
      ...resp,
      class_fee: classSum,
      exam_fee: examSum,          
      support_fee: supportSum,    
      total_fee:
        classSum +
        examSum +
        (resp.book_fee || 0) +
        supportSum,
    };

    setFees(newFees);

    dispatch(
      updateFeeInfo({
        total_fee: newFees.total_fee,
      })
    );
  }, [reg, subjects, calculateFees, dispatch]);

  useEffect(() => {
    calcAll();
  }, [calcAll]);

  return fees;
};
